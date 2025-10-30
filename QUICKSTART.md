# SWDe5ign - Quick Start Guide

## 🚀 Running the Demo Locally

### Option 1: Using the Serve Script (Recommended)
```bash
./serve.sh
```
Then open your browser to: **http://localhost:8000**

### Option 2: Using Python Directly
```bash
python3 -m http.server 8000
```

### Option 3: Using Node.js (if installed)
```bash
npx http-server -p 8000
```

## 📁 Project Structure

```
SWDe5ign/
├── index.html              # Main landing page - START HERE
├── serve.sh                # Quick demo server script
│
├── assets/                 # Shared global assets
│   ├── css/main.css        # Global styles
│   ├── js/main.js          # Global JavaScript
│   └── images/             # Shared images
│
├── projects/               # All integrated projects
│   ├── patchwork/          # Wellness Hub
│   │   ├── index.html      # Wellness home
│   │   ├── resources/      # Workout, meditation, nutrition guides
│   │   ├── css/styles.css
│   │   └── js/app.js
│   │
│   ├── family/             # Family Portal
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── script.js
│   │
│   ├── business/           # Business/ISMS Platform
│   │   ├── index.html
│   │   ├── standalone.html
│   │   └── public/
│   │
│   ├── docs/               # Documentation Hub
│   │   ├── index.html
│   │   ├── script.js
│   │   └── style.css
│   │
│   └── portfolio/          # Professional Portfolio & CV
│       ├── SWCV.html
│       ├── CV 2025.html
│       ├── CV 2025_2.html
│       └── CV 2025_div .html
│
└── shared/                 # Shared components (future use)
    └── components/
```

## 🔗 Navigation Map

### Main Landing Page
- **URL**: `index.html`
- **Links to**: All 5 project sections

### Project Pages
1. **Wellness Hub** → `projects/patchwork/index.html`
   - Home Workouts → `projects/patchwork/resources/home-workouts.html`
   - Morning Meditation → `projects/patchwork/resources/morning-meditation.html`
   - Nutrition Guide → `projects/patchwork/resources/nutrition-guide.html`
   - Sleep Optimization → `projects/patchwork/resources/sleep-optimization.html`
   - Smart Goals → `projects/patchwork/resources/smart-goals-worksheet.html`
   - Wellness Trends → `projects/patchwork/wellness-trends.html`

2. **Family Portal** → `projects/family/index.html`

3. **Business Platform** → `projects/business/index.html`
   - Standalone Version → `projects/business/standalone.html`

4. **Documentation** → `projects/docs/index.html`

5. **Portfolio/CV** → `projects/portfolio/SWCV.html`
   - Alternative CV versions available

## 🛠️ Development Commands

### View Project Status
```bash
git status
```

### Commit Changes
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### View Project on GitHub
```bash
xdg-open https://github.com/5hay196/SWDe5ign
# Or manually visit: https://github.com/5hay196/SWDe5ign
```

## 🎨 Customization

### Update Global Styles
Edit: `assets/css/main.css`

### Update Global JavaScript
Edit: `assets/js/main.js`

### Update Main Landing Page
Edit: `index.html`

## 📝 Next Steps

1. **Test all pages** - Click through each section
2. **Update navigation** - Ensure all links work correctly
3. **Optimize images** - Compress any large images
4. **Test responsiveness** - Check on mobile/tablet sizes
5. **Deploy** - Push to GitHub Pages, Netlify, or Vercel

## 🌐 Deployment Options

### GitHub Pages (Free)
```bash
# Enable in repo settings → Pages → Source: main branch
```

### Netlify (Free)
1. Connect GitHub repo
2. Build command: (none)
3. Publish directory: `/`

### Vercel (Free)
1. Import GitHub repo
2. Framework: Other
3. Deploy

## 📞 Support

- **GitHub**: https://github.com/5hay196/SWDe5ign
- **Issues**: https://github.com/5hay196/SWDe5ign/issues

---

**Last Updated**: 2025-10-30
