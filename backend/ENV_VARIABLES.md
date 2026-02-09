# Environment Variables - Backend Django

## Variabile Obligatorii

| Variabilă | Descriere | Exemplu | Notă |
|-----------|-----------|---------|------|
| `SECRET_KEY` | Cheie secretă Django pentru criptare | `django-insecure-your-secret-key-here` | Trebuie să fie unică și secretă în producție |
| `DEBUG` | Modul de debug Django | `False` | Trebuie să fie `False` în producție |
| `ALLOWED_HOSTS` | Lista de host-uri permise (comma-separated) | `backend.example.com,api.example.com` | Include domeniul backend-ului |

## Configurare Baza de Date

### Opțiunea 1: DATABASE_URL (Recomandat)

```bash
DATABASE_URL=postgresql://user:password@host:port/dbname
```

**Exemplu:**
```bash
DATABASE_URL=postgresql://postgres:password@postgres:5432/doudou_db
```

### Opțiunea 2: Variabile Separate

| Variabilă | Descriere | Exemplu | Default |
|-----------|-----------|---------|---------|
| `DB_NAME` | Numele bazei de date | `doudou_db` | - |
| `DB_USER` | Utilizator PostgreSQL | `postgres` | - |
| `DB_PASSWORD` | Parola PostgreSQL | `your-secure-password` | - |
| `DB_HOST` | Host PostgreSQL | `postgres` (Docker) sau `localhost` (local) | - |
| `DB_PORT` | Port PostgreSQL | `5432` | `5432` |

**Notă:** Dacă `DATABASE_URL` este setat, va suprascrie variabilele `DB_*`.

## Versiunea PostgreSQL

- **Recomandat:** PostgreSQL 14+
- **Testat:** PostgreSQL 14.x, 15.x, 18.x
- **Suportat:** PostgreSQL 9.5+ (prin `psycopg2-binary==2.9.9`)

## Exemple de Configurare

### Development (Local)

```bash
SECRET_KEY=dev-secret-key-1234567890
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=postgresql://postgres:password@localhost:5432/doudou_db
```

### Production (Docker)

```bash
SECRET_KEY=your-production-secret-key-change-this
DEBUG=False
ALLOWED_HOSTS=backend.example.com,api.example.com
DATABASE_URL=postgresql://postgres:${DB_PASSWORD}@postgres:5432/doudou_db
```

### Docker Compose

```yaml
services:
  backend:
    environment:
      - SECRET_KEY=${SECRET_KEY}
      - DEBUG=False
      - ALLOWED_HOSTS=backend.example.com
      - DATABASE_URL=postgresql://postgres:${DB_PASSWORD}@postgres:5432/${DB_NAME}
    # sau folosind fișier .env:
    env_file:
      - .env
```
