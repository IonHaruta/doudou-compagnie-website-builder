# Deploy Instructions - Doudou & Compagnie

## Overview

This project has **two parts** that need separate deployment:

1. **Frontend** (React/Vite) → GitHub Pages (already configured)
2. **Backend** (Django) → Railway, Render, or similar hosting

---

## Step 1: Deploy Backend (Django)

### Option A: Railway (Recommended - Free tier available)

1. **Sign up**: Go to [railway.app](https://railway.app) and sign up with GitHub

2. **Create new project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `doudou-compagnie-website-builder`
   - Select the `backend` folder as root directory

3. **Add PostgreSQL database**:
   - In Railway dashboard, click "New" → "Database" → "PostgreSQL"
   - Railway will automatically provide `DATABASE_URL` env var

4. **Set environment variables**:
   - Go to your backend service → Variables
   - Add:
     ```
     SECRET_KEY=generate-a-random-secret-key-here
     DEBUG=False
     ALLOWED_HOSTS=your-app-name.railway.app
     ```
   - Railway automatically provides `DATABASE_URL` (no need to set manually)

5. **Deploy**:
   - Railway will auto-deploy when you push to GitHub
   - Or click "Deploy" manually
   - Wait for deployment to finish

6. **Run migrations**:
   - In Railway dashboard → your backend service → "Deploy Logs"
   - Click "Shell" or use Railway CLI:
     ```bash
     railway run python manage.py migrate
     railway run python manage.py createsuperuser
     ```

7. **Get your backend URL**:
   - Railway will give you a URL like: `https://your-app-name.railway.app`
   - **Save this URL** - you'll need it for Step 2!

---

### Option B: Render (Alternative)

1. **Sign up**: [render.com](https://render.com) with GitHub

2. **Create Web Service**:
   - "New" → "Web Service"
   - Connect GitHub repo
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt && python manage.py collectstatic --noinput`
   - Start Command: `gunicorn config.wsgi:application`

3. **Add PostgreSQL**:
   - "New" → "PostgreSQL"
   - Copy the `DATABASE_URL` provided

4. **Set environment variables**:
   - In your web service → Environment:
     ```
     SECRET_KEY=your-secret-key
     DEBUG=False
     ALLOWED_HOSTS=your-app-name.onrender.com
     DATABASE_URL=<provided-by-render>
     ```

5. **Deploy and migrate**:
   - Render will auto-deploy
   - Run migrations in "Shell" or via CLI

---

## Step 2: Connect Frontend to Production Backend

1. **Get your backend URL** from Step 1 (e.g., `https://your-app-name.railway.app`)

2. **Set GitHub Secret**:
   - Go to your GitHub repo → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-url.railway.app/api` (add `/api` at the end)
   - Click "Add secret"

3. **Redeploy frontend**:
   - Push any commit to `main` branch, OR
   - Go to Actions tab → "Deploy to GitHub Pages" → "Run workflow"

4. **Verify**:
   - Visit `https://ionharuta.github.io/doudou-compagnie-website-builder/`
   - Open browser console → check network requests go to your backend URL

---

## Step 3: Admin Panel Access

The admin login is already configured at:

**URL**: `https://ionharuta.github.io/doudou-compagnie-website-builder/admin/login`

**To create admin user**:
1. SSH into your backend (Railway Shell or Render Shell)
2. Run:
   ```bash
   python manage.py createsuperuser
   ```
3. Enter email, username, password
4. Make sure user has `is_staff=True` (superuser has this automatically)

**Login credentials**:
- Use the email/password you created with `createsuperuser`

---

## Troubleshooting

### Frontend shows "Network error" or can't connect to backend
- Check `VITE_API_URL` secret is set correctly (should end with `/api`)
- Check backend is running (visit backend URL directly)
- Check CORS settings in `backend/config/settings.py` includes GitHub Pages domain

### Backend deployment fails
- Check `requirements.txt` has all dependencies
- Check `Procfile` exists and is correct
- Check logs in Railway/Render dashboard

### Admin login doesn't work
- Make sure user is created with `createsuperuser`
- Check user has `is_staff=True` in Django admin
- Check backend logs for authentication errors

---

## Quick Checklist

- [ ] Backend deployed (Railway/Render)
- [ ] PostgreSQL database connected
- [ ] Migrations run (`python manage.py migrate`)
- [ ] Superuser created (`python manage.py createsuperuser`)
- [ ] Backend URL saved (e.g., `https://xxx.railway.app`)
- [ ] GitHub secret `VITE_API_URL` set to `https://xxx.railway.app/api`
- [ ] Frontend redeployed (push to main or manual workflow run)
- [ ] Test: Visit site → should load products from backend
- [ ] Test: Visit `/admin/login` → should be able to log in

---

## Local Development

For local development, keep using `.env.development`:
```
VITE_API_URL=http://127.0.0.1:8000/api
```

This only affects local builds. Production uses the GitHub secret.
