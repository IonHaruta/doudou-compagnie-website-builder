# Cum să forțezi refresh-ul cache-ului pentru preview-uri de link-uri

## Problema
Platformele de social media (WhatsApp, Facebook, Twitter, etc.) cache-uiesc meta tag-urile și nu le actualizează automat. Chiar dacă ai actualizat meta tag-urile în cod, preview-urile vechi pot apărea în continuare.

## Soluție: Folosește link-urile cu `?v=2`

**Link-uri corecte pentru partajare:**
- `https://ionharuta.github.io/doudou-compagnie-website-builder/?v=2`
- `https://ionharuta.github.io/doudou-compagnie-website-builder/admin/login?v=2`
- `https://ionharuta.github.io/doudou-compagnie-website-builder/admin?v=2`

## Forțează refresh-ul cache-ului manual

### 1. Facebook / WhatsApp / Instagram
1. Mergi la: https://developers.facebook.com/tools/debug/
2. Lipește URL-ul **FĂRĂ** `?v=2`:
   - `https://ionharuta.github.io/doudou-compagnie-website-builder/`
3. Click pe **"Scrape Again"** sau **"Debug"**
4. Repetă pentru fiecare URL

### 2. Twitter / X
1. Mergi la: https://cards-dev.twitter.com/validator
2. Lipește URL-ul **FĂRĂ** `?v=2`
3. Click pe **"Preview card"**
4. Dacă apare cache vechi, click pe **"Refresh"**

### 3. LinkedIn
1. Mergi la: https://www.linkedin.com/post-inspector/
2. Lipește URL-ul **FĂRĂ** `?v=2`
3. Click pe **"Inspect"**
4. Click pe **"Refresh"** dacă apare cache vechi

## Soluție permanentă

**Folosește întotdeauna link-urile cu `?v=2` când partajezi!**

Scriptul din site detectează automat crawler-ele de social media și le redirectează la versiunea cu `?v=2`, dar pentru a fi sigur, folosește manual link-urile cu `?v=2`.

## Verificare

După ce faci refresh în tool-urile de mai sus, verifică că:
- ✅ Titlul este "Doudou Compagnie" (nu "Lovable App")
- ✅ Descrierea este "Doudou Compagnie — product catalog, collections and gift ideas."
- ✅ Nu apare logo-ul "Lovable"
