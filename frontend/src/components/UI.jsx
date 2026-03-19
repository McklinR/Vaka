import { Star, ShieldCheck, MapPin, Briefcase, Package, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'

/* ── StarRating ─────────────────────────────────────────────────────────── */
export function StarRating({ value = 0, max = 5, size = 14 }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < Math.round(value) ? 'star-filled fill-orange' : 'star-empty fill-gray-200'}
        />
      ))}
    </span>
  )
}

/* ── ArtisanCard ────────────────────────────────────────────────────────── */
export function ArtisanCard({ artisan }) {
  const name  = artisan.user?.full_name || 'Artisan'
  const trade = artisan.primary_trade_display || artisan.primary_trade
  const areas = artisan.service_areas || 'Zimbabwe'
  const img   = artisan.profile_image || null

  return (
    <div className="card-bordered hover:shadow-lg transition-shadow duration-200 flex gap-4">
      {/* Avatar */}
      <div className="shrink-0">
        {img ? (
          <img src={img} alt={name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-bgray" />
        ) : (
          <div className="w-14 h-14 rounded-full bg-maroon/15 flex items-center justify-center">
            <span className="text-maroon font-bold text-xl">
              {name[0]?.toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div>
            <h3 className="font-semibold text-navy text-sm leading-tight">{name}</h3>
            <span className="badge-trade mt-0.5">{trade}</span>
          </div>
          {artisan.user?.is_verified && (
            <span className="badge-verified shrink-0">
              <ShieldCheck size={10} /> Verified
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 mt-2 flex-wrap">
          <div className="flex items-center gap-1">
            <StarRating value={artisan.average_rating} size={12} />
            <span className="text-xs text-gray-500 ml-0.5">
              ({artisan.review_count || 0})
            </span>
          </div>
          {artisan.years_experience > 0 && (
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Briefcase size={11} className="text-orange" />
              {artisan.years_experience} yrs
            </span>
          )}
          {artisan.completed_jobs > 0 && (
            <span className="text-xs text-gray-500">
              {artisan.completed_jobs} jobs
            </span>
          )}
        </div>

        <p className="flex items-center gap-1 text-xs text-gray-400 mt-1.5">
          <MapPin size={11} className="text-green shrink-0" />
          <span className="truncate">{areas}</span>
        </p>

        {artisan.is_museyamwa && (
          <span className="mt-1.5 inline-block text-xs bg-orange/10 text-orange font-semibold
                           px-2 py-0.5 rounded-full">
            Museyamwa
          </span>
        )}
      </div>
    </div>
  )
}

/* ── ListingCard ────────────────────────────────────────────────────────── */
export function ListingCard({ listing }) {
  const supplier = listing.supplier?.full_name || 'Supplier'

  return (
    <div className="card-bordered hover:shadow-lg transition-shadow duration-200">
      {listing.image ? (
        <img src={listing.image} alt={listing.name}
          className="w-full h-36 object-cover rounded-md mb-3 -mx-0 -mt-1" />
      ) : (
        <div className="w-full h-36 bg-bgray rounded-md mb-3 flex items-center justify-center">
          <Package size={32} className="text-gray-300" />
        </div>
      )}

      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-navy text-sm leading-snug">{listing.name}</h3>
        {listing.is_resale && (
          <span className="shrink-0 flex items-center gap-1 text-xs bg-green/10 text-green
                           font-semibold px-2 py-0.5 rounded-full">
            <Tag size={10} /> Resale
          </span>
        )}
      </div>

      {listing.category && (
        <p className="text-xs text-gray-400 mt-0.5">{listing.category.name}</p>
      )}

      <div className="flex items-center justify-between mt-3">
        <div>
          <span className="text-lg font-bold text-navy">
            ${Number(listing.price_usd).toFixed(2)}
          </span>
          <span className="text-xs text-gray-400 ml-1">/{listing.unit_display || listing.unit}</span>
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
          ${listing.stock_quantity > 0
            ? 'bg-green/10 text-green'
            : 'bg-red-100 text-red-600'}`}>
          {listing.stock_quantity > 0 ? `${listing.stock_quantity} in stock` : 'Out of stock'}
        </span>
      </div>

      <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
        <MapPin size={11} className="text-green shrink-0" />
        {listing.location || 'Zimbabwe'}
      </p>

      <p className="text-xs text-gray-400 mt-0.5">
        by <span className="text-maroon font-medium">{supplier}</span>
      </p>
    </div>
  )
}

/* ── SectionHeader ──────────────────────────────────────────────────────── */
export function SectionHeader({ eyebrow, title, subtitle, centered = false }) {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className="text-maroon font-semibold text-sm uppercase tracking-widest mb-2">
          {eyebrow}
        </p>
      )}
      <h2>{title}</h2>
      {subtitle && (
        <p className="mt-3 text-gray-500 text-base max-w-2xl leading-relaxed
                      ${centered ? 'mx-auto' : ''}">
          {subtitle}
        </p>
      )}
    </div>
  )
}

/* ── Spinner ────────────────────────────────────────────────────────────── */
export function Spinner({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className="w-10 h-10 border-4 border-bgray border-t-orange rounded-full animate-spin" />
      <p className="text-sm text-gray-400 font-medium">{label}</p>
    </div>
  )
}

/* ── EmptyState ─────────────────────────────────────────────────────────── */
export function EmptyState({ icon: Icon, title, message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
      {Icon && <Icon size={40} className="text-gray-300" />}
      <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
      {message && <p className="text-sm text-gray-400 max-w-xs">{message}</p>}
    </div>
  )
}
