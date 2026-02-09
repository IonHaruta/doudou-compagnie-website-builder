# Deployment Information pentru DevOps

## Ce s-a făcut

### ✅ Dockerfile Backend
- **Locație:** `backend/Dockerfile`
- **Base Image:** `python:3.11-slim`
- **Port:** `8000`
- **Server:** Gunicorn (4 workers, timeout 120s)
- **Dependențe:** PostgreSQL client, gcc, libpq-dev

### ✅ Environment Variables
- **Documentație:** `backend/ENV_VARIABLES.md`
- **Variabile obligatorii:** `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`
- **Database:** `DATABASE_URL` sau variabile separate (`DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`)

### ✅ PostgreSQL
- **Versiune recomandată:** PostgreSQL 14+
- **Versiuni testate:** 14.x, 15.x, 18.x
- **Driver:** `psycopg2-binary==2.9.9`

### ✅ Folder .github șters
- Folderul `.github/` a fost eliminat (folosim GitLab CI)

## Structura Proiectului

```
doudou-compagnie-website-builder/
├── backend/
│   ├── Dockerfile              # ✅ Dockerfile pentru backend
│   ├── ENV_VARIABLES.md        # ✅ Documentație environment variables
│   ├── requirements.txt         # ✅ Dependențe Python (actualizat)
│   ├── Procfile                # Pentru Railway/Heroku (opțional)
│   ├── manage.py
│   └── config/
│       └── settings.py          # Configurare Django
└── frontend/
    ├── Dockerfile              # ⚠️ Trebuie verificat dacă există
    ├── package.json
    └── vite.config.ts
```

## Build Backend

```bash
cd backend
docker build -t doudou-backend .
```

## Run Backend (exemplu)

```bash
docker run -p 8000:8000 \
  -e SECRET_KEY=your-secret-key \
  -e DEBUG=False \
  -e ALLOWED_HOSTS=backend.example.com \
  -e DATABASE_URL=postgresql://postgres:password@postgres:5432/doudou_db \
  doudou-backend
```

## Migrații Django

După primul deploy, rulează migrațiile:

```bash
docker exec -it <container_id> python manage.py migrate
docker exec -it <container_id> python manage.py createsuperuser
```

## Notă Importantă

- Frontend-ul folosește Vite/React și generează build static în `frontend/dist/`
- Backend-ul servește API-ul Django REST Framework pe portul 8000
- Frontend-ul poate fi servit static (nginx, etc.) sau poate avea propriul Dockerfile
