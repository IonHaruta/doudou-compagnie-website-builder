#!/bin/bash

# Quick setup script for Django backend

echo "🚀 Setting up Django backend..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your database credentials!"
fi

# Run migrations
echo "🗄️  Running migrations..."
python manage.py makemigrations
python manage.py migrate

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env with your database credentials"
echo "2. Create superuser: python manage.py createsuperuser"
echo "3. Run server: python manage.py runserver"
echo "4. Access admin: http://localhost:8000/admin/"
