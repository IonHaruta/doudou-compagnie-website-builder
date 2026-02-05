# Doudou & Compagnie - E-commerce Website

E-commerce website for Doudou & Compagnie - premium baby toys and doudous.

## Project Structure

```
.
├── frontend/     # React + TypeScript + Vite frontend
└── backend/      # Django REST API backend
```

## Frontend (React)

Built with:
- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- React Router
- Framer Motion

### Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:8080` (or port shown in terminal)

## Backend (Django)

Built with:
- Django 4.2+
- Django REST Framework
- PostgreSQL
- Python 3.9+

### Setup Backend

See [backend/README.md](backend/README.md) for detailed instructions.

Quick setup:

```bash
cd backend
./setup.sh  # or follow manual steps in backend/README.md
```

Backend runs on `http://localhost:8000`

### API Endpoints

- `GET /api/catalog/products/` - List products (public)
- `GET /api/catalog/categories/` - List categories (public)
- `POST /api/orders/` - Create order (public, guest checkout)

Admin panel: `http://localhost:8000/admin/`

## Development Workflow

1. **Start Backend**: `cd backend && python manage.py runserver`
2. **Start Frontend**: `cd frontend && npm run dev`
3. **Access**: Frontend at `http://localhost:8080`, Backend at `http://localhost:8000`

## Features

### Frontend
- Multi-language support (RO/RU/EN)
- Dark/Light theme
- Product catalog with filters
- Shopping cart
- Guest checkout
- Responsive design

### Backend
- Django Admin for content management
- REST API for frontend
- Product catalog management
- Order management
- Guest checkout support
- Stock management

## Next Steps

- Connect frontend to backend API
- Add customer authentication
- Implement payment integration
- Add order tracking
- Email notifications
