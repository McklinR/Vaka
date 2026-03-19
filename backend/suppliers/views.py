"""Suppliers views."""
from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import SupplierListing, MaterialCategory, SupplierProfile
from .serializers import SupplierListingSerializer, MaterialCategorySerializer, SupplierProfileSerializer


class ListingListCreateView(generics.ListCreateAPIView):
    serializer_class = SupplierListingSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["category", "is_available", "is_resale", "location"]
    search_fields = ["name", "description", "location"]
    ordering_fields = ["price_usd", "created_at"]

    def get_queryset(self):
        return SupplierListing.objects.select_related("supplier", "category").filter(is_available=True)

    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class ListingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SupplierListing.objects.select_related("supplier", "category")
    serializer_class = SupplierListingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ResaleListView(generics.ListAPIView):
    """GET /api/suppliers/resale/ — resale/excess material listings."""
    serializer_class = SupplierListingSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return SupplierListing.objects.filter(is_resale=True, is_available=True).select_related("supplier", "category")


class CategoryListView(generics.ListAPIView):
    queryset = MaterialCategory.objects.all()
    serializer_class = MaterialCategorySerializer
    permission_classes = [permissions.AllowAny]


class SupplierProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = SupplierProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        profile, _ = SupplierProfile.objects.get_or_create(
            user=self.request.user,
            defaults={"company_name": self.request.user.get_full_name() or self.request.user.username, "address": ""},
        )
        return profile
