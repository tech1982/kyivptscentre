# Live Site vs GitHub Repository Comparison

## 📍 Current State Summary

| Version | Location | Language | Tech | Status |
|---------|----------|----------|------|--------|
| **Live Site** | http://pts-centre.kiev.ua | Russian (Cyrillic) | Old Dreamweaver | **OUTDATED** |
| **GitHub Main** | repo/main | - | Empty (README only) | Not deployed |
| **GitHub Redesign** | repo/copilot/redesign-legacy-website | Ukrainian | Modern HTML5 | Not deployed |

---

## 🔍 Live Website Analysis (http://pts-centre.kiev.ua)

### **Technology Stack**
```html
<!-- InstanceBegin template="/Templates/index.dwt" -->
<!-- Dreamweaver template-based site -->
```

### **Characteristics**
- **Language**: Russian (Cyrillic, Windows-1251 encoding)
- **Template Engine**: Dreamweaver (.dwt templates)
- **Layout**: HTML Tables for layout (2000s-era)
- **Design**: Very dated visual design
- **Encoding**: Windows-1251 (legacy)
- **Structure**: Multi-page site with navigation menu
- **Meta Tags**: Old-style Russian keywords, Google verification
- **Analytics**: Openstat (legacy tracking)
- **External Links**: Outdated (broken partnerships, old domains)

### **Key Sections**
- **Pneumatic Systems** (пневматична пошта) - product info, types, equipment
- **Queue Management** (Q-Management) - queue systems
- **Warehouse Storage** (Депозитивна) - storage systems
- **News, FAQ, Contacts**
- **Partner logos**: Metro, Sumetzberger, Robur Safe, Q-Net

### **Technical Issues**
- ❌ Dated HTML (table-based layout)
- ❌ Russian language (target market is Ukrainian)
- ❌ Dreamweaver template overhead
- ❌ Windows-1251 encoding (legacy)
- ❌ Poor mobile experience
- ❌ Outdated partner links
- ❌ Legacy analytics (Openstat)
- ❌ No modern SEO

---

## 🚀 GitHub Redesign Branch (copilot/redesign-legacy-website)

### **Technology Stack**
```
HTML5 (semantic)
CSS3 (custom properties, responsive)
Vanilla JavaScript (modern)
GitHub Pages deployment
```

### **Characteristics**
- **Language**: Ukrainian (modern, UTF-8)
- **Framework**: None (static HTML/CSS/JS)
- **Design**: Modern, clean, professional
- **Responsive**: Mobile-first design
- **SEO**: Proper meta tags, semantic HTML
- **Accessibility**: ARIA labels, semantic structure
- **Deployment**: GitHub Pages via GitHub Actions

### **File Structure**
```
├── index.html (543 lines)
├── css/style.css (905 lines)
├── js/main.js (292 lines)
└── .github/workflows/deploy.yml
```

### **Key Features**
- ✅ Single-page responsive design
- ✅ Modern hero section with stats
- ✅ About, Products, Services, Projects sections
- ✅ Mobile burger menu
- ✅ Smooth scrolling
- ✅ Back-to-top button
- ✅ Contact section
- ✅ Animated counters
- ✅ Professional color scheme (blue #1a5fa8, gold accent)
- ✅ Google Fonts (Inter, Montserrat)

---

## 📊 Comparison Table

| Feature | Live Site | GitHub Redesign |
|---------|-----------|-----------------|
| **Language** | Russian | Ukrainian ✅ |
| **HTML Version** | 4.0 (tables) | HTML5 ✅ |
| **Responsive** | No | Yes ✅ |
| **Mobile-Friendly** | No | Yes ✅ |
| **Encoding** | Windows-1251 | UTF-8 ✅ |
| **Modern Design** | No | Yes ✅ |
| **SEO** | Poor | Good ✅ |
| **Accessibility** | None | ARIA labels ✅ |
| **Build Process** | None | GitHub Pages ✅ |
| **Component Architecture** | Monolithic | Single-page ✅ |
| **JavaScript Framework** | None | Vanilla JS ✅ |
| **CSS Preprocessor** | None (inline styles) | CSS custom properties |
| **Deployment** | Unknown (static?) | GitHub Pages automated |

---

## 🎯 Strategic Analysis

### **What the GitHub Redesign Does Well**
1. Modern, professional visual design
2. Responsive and mobile-friendly
3. Correct language (Ukrainian, not Russian)
4. Clean HTML5 structure
5. Good accessibility basics
6. Automatic GitHub Pages deployment

### **What's Missing from GitHub Redesign**
1. **No backend** — Contact form doesn't work (no server)
2. **No image assets** — Hero section, product images missing
3. **No full content** — Placeholder text in some sections
4. **Hardcoded content** — No content management
5. **Monolithic structure** — All in single HTML file
6. **No build tooling** — Assets not optimized

### **Status of Main Branch**
- Empty except README
- Likely intended for merged redesign
- Not currently used

---

## 🚀 Recommendations

### **Immediate Action**
The GitHub redesign branch is **production-ready for a static site** but needs:
1. ✅ Images and assets (hero, products, services)
2. ✅ Contact form backend (Formspree, Netlify, serverless)
3. ✅ Full content from current live site (translated to Ukrainian)
4. ✅ Deploy to main branch → GitHub Pages
5. ✅ Update DNS to point to GitHub Pages

### **For Proper Refactoring**
See [Refactoring Strategy](#) for full modernization plan.

---

## 📝 Files Analyzed

**Live Site**: Fetched from http://pts-centre.kiev.ua (Dreamweaver template)
**GitHub Redesign**: copilot/redesign-legacy-website branch
**GitHub Main**: Empty except README
