# I'm Game Movie – Official Information Website

A premium, SEO-focused movie information website for **I'm Game (2026)** — the Malayalam action thriller starring Dulquer Salmaan, directed by Nahas Hidhayath, produced by Wayfarer Films.

---

## 📁 Files

| File | Purpose |
|------|---------|
| `index.html` | Main movie information page |
| `style.css` | All styles – cinematic dark theme |
| `script.js` | JavaScript – lightbox, FAQ, sharing, scroll effects |
| `robots.txt` | Search engine crawl directives |
| `sitemap.xml` | XML sitemap for Google Search Console |
| `404.html` | Custom 404 error page |
| `assets/` | Movie posters (poster-1.jpg, poster-2.jpg, poster-3.jpg) |

---

## 🚀 GitHub Pages Deployment

### Step 1: Create Repository
1. Go to [github.com](https://github.com) and create a new repository.
2. Name it whatever you like (e.g., `imgame-movie`).
3. Make it **Public**.

### Step 2: Upload Files
Upload all files maintaining this structure:
```
/
├── index.html
├── style.css
├── script.js
├── robots.txt
├── sitemap.xml
├── 404.html
├── README.md
└── assets/
    ├── poster-1.jpg
    ├── poster-2.jpg
    └── poster-3.jpg
```

### Step 3: Enable GitHub Pages
1. Go to your repository → **Settings** → **Pages**
2. Under **Source**, select `main` branch and `/ (root)` folder
3. Click **Save**
4. Your site will be live at: `https://USERNAME.github.io/REPOSITORY/`

---

## 🔧 Configuration After Deployment

### Update Canonical URL & Sitemap
Replace `USERNAME` and `REPOSITORY` in these files with your actual GitHub username and repository name:

**Files to update:**
- `index.html` — `<link rel="canonical" ...>`, OG tags, structured data
- `sitemap.xml` — all `<loc>` URLs
- `robots.txt` — sitemap URL

### Update Movie Links (IMPORTANT)
Open `script.js` and find this configuration object at the top:

```javascript
const MOVIE_LINKS = {
  watchNow:    "OFFICIAL_WATCH_URL",    // Replace with official watch link
  watch1080:   "OFFICIAL_1080P_URL",    // Replace with official 1080p link
  watch720:    "OFFICIAL_720P_URL",     // Replace with official 720p link
  download:    "OFFICIAL_DOWNLOAD_URL", // Replace with official download link
  newReleases: "OFFICIAL_NEW_RELEASES_URL" // Replace with official new releases link
};
```

**Replace each placeholder with a legitimate, authorized URL.**

All buttons on the website will automatically update. No need to change anything else.

> ⚠️ Only link to **authorized** streaming/download sources. Linking to piracy sites is illegal.

---

## 📊 Google Search Console Setup

Follow these steps to get the site indexed by Google:

### 1. Add Property
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **Add property**
3. Enter your exact GitHub Pages URL: `https://USERNAME.github.io/REPOSITORY/`
4. Click **Continue**

### 2. Verify Ownership
Choose one of these methods:
- **HTML file upload** – Download the verification file and upload it to your repository root
- **HTML tag** – Add the `<meta name="google-site-verification">` tag to `index.html` `<head>`
- **DNS record** (for custom domains)

### 3. Submit Sitemap
1. In Search Console, go to **Sitemaps** in the left sidebar
2. Enter your sitemap URL: `https://USERNAME.github.io/REPOSITORY/sitemap.xml`
3. Click **Submit**

### 4. Request Indexing
1. In Search Console, go to **URL Inspection**
2. Enter your homepage URL
3. Click **Request Indexing**

> ⚠️ **Note:** Indexing and ranking in Google Search are not guaranteed. Google's crawling schedule and ranking decisions are independent. Results may take days to weeks.

---

## 🎬 Adding Another Movie

To create a page for another movie:

1. **Duplicate** `index.html` and rename it (e.g., `movie-title.html`)
2. Update all text content, meta tags, and structured data for the new movie
3. Update the `<link rel="canonical">` to the new page URL
4. Add the new page to `sitemap.xml`
5. Link to it from the "You May Also Like" section of `index.html`

---

## 🖼️ Updating Movie Images

Replace files in the `assets/` folder:
- `assets/poster-1.jpg` — First look / character poster (portrait)
- `assets/poster-2.jpg` — Main promotional poster (portrait) — used as OG image
- `assets/poster-3.jpg` — Ensemble / action poster — used as hero background

**Image recommendations:**
- Use JPEG format for photographs
- Compress images before uploading (aim for under 300KB each)
- Maintain descriptive filenames

---

## 📝 Updating Metadata

### Change Page Title
In `index.html`, line 11:
```html
<title>Your New Title Here</title>
```

### Change Meta Description
In `index.html`, line 12:
```html
<meta name="description" content="Your new description here (150–160 characters)" />
```

### Change OG Image
In `index.html`:
```html
<meta property="og:image" content="https://USERNAME.github.io/REPOSITORY/assets/your-image.jpg" />
```

---

## 🔒 Copyright & Legal

- This website only links to **legitimate, authorized** viewing sources
- Movie posters and information belong to their respective rights holders (Wayfarer Films)
- This is an informational website; not affiliated with Wayfarer Films
- Do not link to or promote piracy under any circumstances

---

## 📱 Performance Notes

- All images use `loading="lazy"` except the hero (which uses `fetchpriority="high"`)
- No external JavaScript libraries — pure vanilla JS
- Google Fonts loaded with `preconnect` for performance
- CSS animations respect `prefers-reduced-motion`
- Fully responsive from 320px to 1920px

---

*Built for I'm Game (2026) – A Wayfarer Films Production. Releasing 20 August 2026.*
