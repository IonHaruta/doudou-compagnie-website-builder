# Cum să testezi Dockerfile-ul Backend

## Opțiunea 1: Test Rapid (fără PostgreSQL)

Testează doar dacă Dockerfile-ul se construiește corect:

```bash
cd backend
docker build -t doudou-backend-test .
```

**Dacă primești eroare "requirements.txt not found":**

### Soluția A: Dezactivează BuildKit temporar

```bash
cd backend
DOCKER_BUILDKIT=0 docker build -t doudou-backend-test .
```

### Soluția B: Curăță cache-ul complet

```bash
# Restart Docker Desktop complet
# Apoi:
cd backend
docker build --no-cache -t doudou-backend-test .
```

### Soluția C: Verifică context-ul

```bash
cd backend
# Verifică că ești în directorul corect
pwd  # Ar trebui să fie: .../backend
ls requirements.txt  # Ar trebui să existe
docker build -t doudou-backend-test .
```

**Important:** Nu apăsa Ctrl+C! Primul build poate dura **2–5 minute** (descarcă imaginea Python, instalează pachete etc.). Așteaptă până vedezi "Successfully built" sau o eroare clară.

## Opțiunea 2: Test Complet (cu PostgreSQL)

### Pasul 1: Construiește imaginea

```bash
cd backend
docker build -t doudou-backend-test .
```

### Pasul 2: Rulează cu docker-compose (recomandat)

```bash
cd backend
docker-compose -f docker-compose.test.yml up --build
```

Aceasta va:
- Construi imaginea backend
- Porni PostgreSQL în container
- Rula migrațiile Django
- Porni serverul Django pe `http://localhost:8000`

### Pasul 3: Testează

Deschide în browser:
- `http://localhost:8000/admin/` - Django Admin
- `http://localhost:8000/api/` - API endpoints

### Pasul 4: Oprește containerele

```bash
docker-compose -f docker-compose.test.yml down
```

## Opțiunea 3: Test Manual (fără docker-compose)

### Pasul 1: Pornește PostgreSQL (dacă nu ai deja)

```bash
docker run -d \
  --name postgres-test \
  -e POSTGRES_DB=doudou_test \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=test123 \
  -p 5433:5432 \
  postgres:15-alpine
```

### Pasul 2: Construiește backend-ul

```bash
cd backend
docker build -t doudou-backend-test .
```

### Pasul 3: Rulează backend-ul

```bash
docker run -it --rm \
  -p 8000:8000 \
  -e SECRET_KEY=test-secret-key \
  -e DEBUG=True \
  -e ALLOWED_HOSTS=localhost,127.0.0.1 \
  -e DATABASE_URL=postgresql://postgres:test123@host.docker.internal:5433/doudou_test \
  --name doudou-backend-test \
  doudou-backend-test \
  sh -c "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"
```

**Notă:** `host.docker.internal` permite containerului să acceseze PostgreSQL de pe host.

### Pasul 4: Testează

- `http://localhost:8000/admin/`
- `http://localhost:8000/api/`

### Pasul 5: Oprește containerele

```bash
docker stop postgres-test
docker rm postgres-test
```

## Verificare Rapidă

Dacă vrei doar să vezi dacă build-ul funcționează:

```bash
cd backend
docker build -t doudou-backend-test . && echo "✅ Build successful!"
```

## Troubleshooting

### Eroare: "Cannot connect to database"
- Verifică că PostgreSQL rulează
- Verifică că `DATABASE_URL` este corect
- Pentru Docker, folosește numele serviciului (ex: `postgres`) ca host, nu `localhost`

### Eroare: "Port already in use"
- Schimbă portul: `-p 8001:8000` în loc de `-p 8000:8000`
- Sau oprește procesul care folosește portul 8000

### Eroare: "Module not found"
- Verifică că `requirements.txt` conține toate dependențele
- Reconstruiește imaginea: `docker build --no-cache -t doudou-backend-test .`
