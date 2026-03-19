#!/bin/bash

echo "Building the project..."
python3.12 -m pip install -r requirements.txt

echo "Making migrations..."
python3.12 manage.py makemigrations --noinput
python3.12 manage.py migrate --noinput

echo "Collecting static files..."
python3.12 manage.py collectstatic --noinput --clear