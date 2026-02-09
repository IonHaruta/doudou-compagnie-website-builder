#!/bin/bash
# Build script for production deployment
python manage.py collectstatic --noinput
python manage.py migrate
