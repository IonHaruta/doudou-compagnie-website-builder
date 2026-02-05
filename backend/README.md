# Doudou & Compagnie - Backend API

Django REST API backend for e-commerce MVP.

## Tech Stack

- Django 4.2+
- Django REST Framework
- PostgreSQL
- Python 3.9+

## Project Structure

```
backend/
├── config/          # Django project settings
├── accounts/        # Custom User model
├── catalog/         # Products, Categories, Images
├── orders/          # Orders and OrderItems
├── discounts/       # Coupons (MVP placeholder)
└── manage.py
```

## Setup Instructions

### 1. Prerequisites

- Python 3.9+ installed
- PostgreSQL installed and running
- Virtual environment (recommended)

### 2. Create Virtual Environment

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Database

Create a PostgreSQL database:

```sql
CREATE DATABASE doudou_ecommerce;
```

### 5. Environment Variables

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials and secret key.

### 6. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 7. Create Superuser (Admin)

```bash
python manage.py createsuperuser
```

Follow prompts to create an admin user.

### 8. Run Development Server

```bash
python manage.py runserver
```

Backend will be available at `http://localhost:8000`

## API Endpoints

### Public Endpoints (Read-Only)

- `GET /api/catalog/products/` - List all active products
- `GET /api/catalog/products/{id}/` - Product detail
- `GET /api/catalog/categories/` - List all active categories

### Public Endpoints (Write)

- `POST /api/orders/` - Create order (guest checkout)

### Admin Endpoints (Requires Authentication)

- `GET /api/orders/` - List all orders (admin only)
- `GET /api/orders/{id}/` - Order detail (admin only)
- `PUT/PATCH /api/orders/{id}/` - Update order (admin only)

## Django Admin

Access admin panel at: `http://localhost:8000/admin/`

Login with superuser credentials created in step 7.

### Admin Features

- **Catalog**: Manage categories, products, product images
- **Orders**: View and manage orders, update status
- **Discounts**: Manage coupons (MVP placeholder)
- **Users**: Manage user accounts

### Bulk Actions

- Products: Activate/Deactivate, Mark as New
- Orders: Mark as Processing/Completed/Cancelled
- Coupons: Activate/Deactivate

## Models Overview

### Accounts
- **User**: Custom user model with email as username, role field (ADMIN/CUSTOMER)

### Catalog
- **Category**: Product categories with slug, ordering
- **Product**: Products with pricing, stock, status, promo support
- **ProductImage**: Product images with ordering

### Orders
- **Order**: Orders with user (nullable for guest), status, total
- **OrderItem**: Order line items with product, quantity, price at purchase

### Discounts
- **Coupon**: Coupon codes with discount percentage, validity period (MVP placeholder)

## Development Notes

### Stock Management
- Stock is automatically decremented when an order is created
- Stock validation happens at order creation

### Order Total Calculation
- Total is automatically calculated from order items
- Uses `price_at_purchase` to preserve historical pricing

### Guest Checkout
- Orders can be created without user authentication
- Guest information stored in `guest_email` and `guest_name` fields

## Next Steps (Future)

- Customer registration/login API
- Order history for authenticated users
- Coupon validation and application logic
- Payment integration
- Email notifications
- Order tracking

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check `.env` database credentials
- Verify database exists

### Migration Errors
- Run `python manage.py makemigrations` first
- Then `python manage.py migrate`

### CORS Issues
- Check `CORS_ALLOWED_ORIGINS` in `settings.py`
- Add your frontend URL if different from defaults
