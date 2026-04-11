# Київ-PTS-Центр — Website

Modern bilingual (Ukrainian / English) website for **ТОВ «Київ-PTS-Центр»** — supplier of pneumatic tube systems, queue management systems, and banking equipment in Ukraine.

> **Legacy site:** http://pts-centre.kiev.ua (to be replaced)

---

## 🎯 Refactoring Goals

1. **Migrate from hacked 2005-era Dreamweaver site** to modern, secure stack
2. **Drop Russian, add Ukrainian + English** (UA primary, EN secondary)
3. **Host on Cloudflare Pages** (free, global CDN, automatic SSL)
4. **Allow non-technical editing** via Sveltia CMS admin panel
5. **Preserve existing content** (22 pages, 36 images) from legacy site
6. **Add SEO, accessibility, and mobile-first design**

---

## 🏗️ Architecture

### Tech Stack
| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | [Astro 5](https://astro.build/) | Zero-JS by default, built-in i18n, content collections, static output |
| **Language** | TypeScript (strict) | Type safety across content schemas |
| **Styling** | SCSS + CSS custom properties | Modular, themeable, no runtime overhead |
| **Content** | Markdown + JSON (git-based) | Editable via CMS, version-controlled |
| **CMS** | [Sveltia CMS](https://github.com/sveltia/sveltia-cms) | Free, git-based, no backend needed (PKCE OAuth with GitHub) |
| **Forms** | Cloudflare Pages Functions | Serverless backend, free tier |
| **Hosting** | Cloudflare Pages | Free, unlimited bandwidth, global CDN, auto SSL |
| **Deployment** | GitHub → auto-deploy | Push to main → live in ~1 min |

### Project Structure
```
kyivptscentre/
├── src/
│   ├── pages/                  # Astro routes
│   │   ├── index.astro         # UA homepage (/)
│   │   ├── about.astro         # UA about (/about)
│   │   ├── products.astro      # UA products (/products)
│   │   ├── contact.astro       # UA contact (/contact)
│   │   └── en/                 # EN mirror (/en/*)
│   │       ├── index.astro
│   │       ├── about.astro
│   │       └── ...
│   ├── layouts/
│   │   └── BaseLayout.astro    # Shared HTML shell
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── ProductCard.astro
│   │   ├── ContactForm.astro
│   │   └── LanguageSwitcher.astro
│   ├── content/                # ← Editable via CMS
│   │   ├── settings/           # Site-wide settings
│   │   ├── pages/              # Page content (UA + EN)
│   │   ├── products/           # Product catalog
│   │   ├── services/           # Services list
│   │   ├── projects/           # Portfolio
│   │   └── news/               # News/blog
│   ├── styles/
│   │   └── global.scss
│   └── i18n/
│       └── ui.ts               # Static UI strings
├── public/
│   ├── admin/                  # Sveltia CMS admin panel
│   │   ├── index.html
│   │   └── config.yml
│   └── images/                 # Static assets
├── functions/                  # Cloudflare Pages Functions
│   └── api/
│       └── contact.ts          # Contact form handler
├── legacy-site/                # Downloaded legacy site (for content migration)
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

### i18n Strategy
- **Default locale:** `uk` (Ukrainian) — served at `/`
- **Secondary locale:** `en` (English) — served at `/en/`
- **URL examples:**
  - `pts-centre.kiev.ua/` → Ukrainian homepage
  - `pts-centre.kiev.ua/en/` → English homepage
  - `pts-centre.kiev.ua/products` → UA products
  - `pts-centre.kiev.ua/en/products` → EN products
- **Static UI strings** (nav, buttons) in `src/i18n/ui.ts`
- **Content** (hero text, descriptions) in `src/content/` with `.uk.md` / `.en.md` file pairs — editable via CMS

---

## 🔐 Content Editing (for non-technical users)

### How your dad edits the site:
1. Open `https://pts-centre.kiev.ua/admin`
2. Click "Login with GitHub"
3. Edit pages, products, news in a friendly WYSIWYG editor
4. Click "Publish"
5. ✨ Live on the site in ~1 minute (Cloudflare auto-rebuilds)

### What can be edited:
- ✅ All page text (hero, about, contact info)
- ✅ Products catalog (add/remove/reorder)
- ✅ Services list
- ✅ News posts (with drafts)
- ✅ Images (upload directly in editor)
- ✅ Both languages (UA and EN)

### What requires a developer:
- Design changes (colors, layout)
- New page types or sections
- Component structure changes

---

## 🚀 Development

### Prerequisites
- Node.js 20+
- npm 10+

### Setup
```bash
npm install
npm run dev              # Start dev server at http://localhost:4321
npm run build            # Build production site to dist/
npm run preview          # Preview production build locally
```

### Scripts
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Astro dev server with HMR |
| `npm run build` | Build static site to `dist/` |
| `npm run preview` | Preview built site |
| `npm run check` | TypeScript + Astro diagnostics |
| `npm run deploy` | Deploy to Cloudflare Pages (wrangler) |

---

## 🌐 Deployment

### Live URLs
| Environment | URL |
|-------------|-----|
| Production | https://kyivptscentre.pages.dev |
| CMS admin | https://kyivptscentre.pages.dev/admin |
| Custom domain (pending NS transfer) | https://pts-centre.kiev.ua |

### Continuous Deployment
- Push to `main` branch → Cloudflare Pages auto-builds and deploys (~1 min)
- Preview deploys created automatically for pull requests
- Rollback to any previous deploy in one click in the Cloudflare dashboard

### Environment Variables / Secrets
Set via `npx wrangler pages secret put <NAME> --project-name kyivptscentre`:

| Secret | Purpose |
|--------|---------|
| `RESEND_API_KEY` | Resend API key for contact form email delivery |
| `CONTACT_EMAIL` | Recipient address for contact form submissions |

### Cloudflare Workers
| Worker | URL | Purpose |
|--------|-----|---------|
| `kyivptscentre-cms-auth` | `kyivptscentre-cms-auth.stanjackdaw.workers.dev` | GitHub OAuth handler for Sveltia CMS |

Worker secrets set via `npx wrangler secret put <NAME> --name kyivptscentre-cms-auth`:

| Secret | Purpose |
|--------|---------|
| `GITHUB_CLIENT_ID` | GitHub OAuth App client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth App client secret |

---

## 📧 Contact Form — Resend Integration

The contact form at `/contact/` is handled by `functions/api/contact.ts` (Cloudflare Pages Function).

### How it works
1. Visitor fills in name / email / message and submits
2. The function validates the input and calls the **Resend API**
3. An email is delivered to `office@pts-centre.kiev.ua`
4. Visitor sees a success message inline (no page reload)

### Resend account details
- **Provider:** [resend.com](https://resend.com) — free tier: 3,000 emails/month, 100/day
- **API key:** stored as `RESEND_API_KEY` Cloudflare Pages secret
- **From address:** currently Resend's shared domain (`onboarding@resend.dev`)

### Upgrade to a custom sending domain (recommended)
To send from `noreply@pts-centre.kiev.ua` instead of Resend's shared domain:

1. Log in at **resend.com** → **Domains** → **Add domain** → enter `pts-centre.kiev.ua`
2. Resend will show 3 DNS records (TXT + MX) — add them in the Cloudflare DNS panel
3. Once verified, update `functions/api/contact.ts` line `from:`:
   ```ts
   from: 'Київ-PTS-Центр <noreply@pts-centre.kiev.ua>',
   ```
4. Commit and push — Cloudflare rebuilds automatically

### Fallback behaviour
If `RESEND_API_KEY` is not set (e.g. local dev), the function logs the submission to the console instead of sending an email. The form still returns `{ ok: true }` so the UI works normally.

---

## 📊 Migration Status

### Source Materials
- [x] Legacy site downloaded to [legacy-site/](legacy-site/) — 22 pages, 36 images, ~1.4 MB
- [x] Existing redesign reviewed ([copilot/redesign-legacy-website](https://github.com/tech1982/kyivptscentre/tree/copilot/redesign-legacy-website) branch)
- [x] Comparison document: [COMPARISON.md](COMPARISON.md)

### Content Migration Plan
- **Ukrainian:** Port from legacy site (currently Russian → translate) + existing redesign content
- **English:** Translate from Ukrainian version
- **Images:** Migrate from `legacy-site/`, optimize for web (WebP + fallbacks)

### ⚠️ Security Note
The legacy live site at `pts-centre.kiev.ua` has **injected spam/malware links** (classic pharma hack on the old IIS 10 server). Migration to Cloudflare Pages will eliminate this.

---

## ✅ Refactor Progress

- [x] Download legacy site for content extraction
- [x] Initialize Astro project with TypeScript
- [x] Set up bilingual content collections schema
- [x] Set up i18n routing (UK default, EN secondary)
- [x] Create base layout + components
- [x] Port design from redesign branch
- [x] Migrate content from legacy site (UA + EN, 44 pages, zero build errors)
- [x] Build contact form with Cloudflare Functions (Resend API)
- [x] Install + configure Sveltia CMS admin (public/admin/)
- [x] SEO: sitemap, robots.txt, OpenGraph meta (og-cover.png 1200×630)
- [x] Migrate images from legacy site (partner logos, product photos, map)
- [x] Set up GitHub OAuth app for CMS (`kyivptscentre-cms-auth` Cloudflare Worker)
- [x] Configure Cloudflare Pages deployment → https://kyivptscentre.pages.dev
- [x] Create OG cover image (og-cover.png, 1200×630)

---

## 🔧 Remaining Steps

### 1. Add dad as repo collaborator (for CMS editing)

1. Go to **github.com/tech1982/kyivptscentre/settings/access**
2. Click **Add people** → enter his GitHub username
3. Set access level to **Write**

Once added, he logs in at https://kyivptscentre.pages.dev/admin with his GitHub account.

### 2. Custom domain `pts-centre.kiev.ua`

When NS transfer to Cloudflare is possible:

1. In Cloudflare dashboard → **Workers & Pages** → `kyivptscentre` → **Custom domains**
2. Click **Set up a custom domain** → enter `pts-centre.kiev.ua`
3. Cloudflare issues a free SSL certificate automatically (~1 min)
4. Update `public/admin/config.yml` — change the `repo` comment URL if needed

No code changes required — the site works on any domain out of the box.

### 3. Resend domain verification (optional but recommended)

By default Resend sends from its shared domain. To send from `pts-centre.kiev.ua`:

1. Log in at **resend.com** → **Domains** → **Add domain**
2. Add the DNS TXT records Resend provides (in Cloudflare DNS panel)
3. Update `CONTACT_EMAIL` worker secret if the sending address changes

---

## 📝 License & Credits

Private project. All content © ТОВ «Київ-PTS-Центр».
