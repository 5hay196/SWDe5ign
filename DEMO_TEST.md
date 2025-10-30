# SWDe5ign - Demo Testing Checklist

## 🎯 Pre-Demo Setup

- [ ] Navigate to project directory: `cd /home/swdev/Documents/SWDe5ign`
- [ ] Run demo server: `./serve.sh`
- [ ] Open browser to: http://localhost:8000

## ✅ Main Landing Page Tests

### Visual Check
- [ ] Page loads correctly
- [ ] Logo "SWDe5ign" displays
- [ ] Navigation bar is visible and styled
- [ ] Hero section with gradient background shows
- [ ] All 5 project cards display:
  - [ ] Wellness Hub
  - [ ] Family Portal
  - [ ] Business Platform
  - [ ] Portfolio
  - [ ] Documentation
- [ ] Footer displays correctly
- [ ] Cards animate on scroll

### Navigation Tests
- [ ] Click "Home" in nav → stays on landing page
- [ ] Click "Wellness" → goes to patchwork/index.html
- [ ] Click "Family" → goes to family/index.html
- [ ] Click "Business Platform" → goes to business/index.html
- [ ] Click "Portfolio" → goes to portfolio/index.html
- [ ] Click "Documentation" → goes to docs/index.html

### Responsive Test
- [ ] Resize browser to mobile width (< 768px)
- [ ] Navigation adapts to mobile
- [ ] Cards stack vertically
- [ ] Text is readable on mobile

## 📋 Project-Specific Tests

### 1. Wellness Hub (Patchwork)
**URL**: `projects/patchwork/index.html`

- [ ] Page loads with correct styling
- [ ] Navigation links work
- [ ] Test resource links:
  - [ ] Home Workouts → `resources/home-workouts.html`
  - [ ] Morning Meditation → `resources/morning-meditation.html`
  - [ ] Nutrition Guide → `resources/nutrition-guide.html`
  - [ ] Sleep Optimization → `resources/sleep-optimization.html`
  - [ ] Smart Goals → `resources/smart-goals-worksheet.html`
- [ ] Wellness Trends page loads → `wellness-trends.html`
- [ ] Sitemap page loads → `sitemap.html`

### 2. Family Portal
**URL**: `projects/family/index.html`

- [ ] Page loads correctly
- [ ] Styles apply (styles.css)
- [ ] JavaScript functionality works (script.js)
- [ ] Interactive elements respond
- [ ] Images load (if any)

### 3. Business Platform
**URL**: `projects/business/index.html`

- [ ] Main page loads
- [ ] Standalone version accessible → `standalone.html`
- [ ] Public assets load (images, fonts, favicon)
- [ ] Navigation between pages works
- [ ] Business tools/features display correctly

### 4. Documentation Hub
**URL**: `projects/docs/index.html`

- [ ] Page loads with documentation interface
- [ ] Styles apply (style.css)
- [ ] JavaScript works (script.js)
- [ ] Content is readable
- [ ] Any interactive features work

### 5. Portfolio/CV
**URL**: `projects/portfolio/SWCV.html`

- [ ] SWCV.html loads correctly
- [ ] Test alternative CV versions:
  - [ ] CV 2025.html
  - [ ] CV 2025_2.html
  - [ ] CV 2025_div .html
- [ ] All CVs display professional formatting
- [ ] Content is readable and well-structured

## 🔍 Cross-Page Navigation Tests

### Back to Home
From each project page, test returning to main landing:
- [ ] From Wellness Hub
- [ ] From Family Portal
- [ ] From Business Platform
- [ ] From Documentation
- [ ] From Portfolio

### Between Projects
Test navigating between different projects:
- [ ] Wellness → Family
- [ ] Family → Business
- [ ] Business → Documentation
- [ ] Documentation → Portfolio
- [ ] Portfolio → Wellness

## 🎨 Visual Consistency Tests

- [ ] All pages have consistent styling
- [ ] Color scheme is uniform
- [ ] Fonts are consistent
- [ ] Spacing and layout feel cohesive
- [ ] No broken images
- [ ] No missing CSS files
- [ ] No JavaScript errors (check browser console)

## 🚀 Performance Tests

- [ ] Pages load quickly (< 3 seconds)
- [ ] No 404 errors in browser console
- [ ] No broken links
- [ ] Smooth scrolling/animations
- [ ] No layout shifts during load

## 📱 Mobile/Responsive Tests

Test on different viewport sizes:
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

## 🐛 Known Issues to Check

List any issues found during testing:

1. ___________________________
2. ___________________________
3. ___________________________

## ✨ Enhancement Opportunities

Ideas for improvement:
1. ___________________________
2. ___________________________
3. ___________________________

## 📝 Demo Notes

Date: __________
Tester: __________
Browser: __________
OS: EndeavourOS Linux

Overall Status: ⬜ Pass / ⬜ Fail / ⬜ Needs Work

---

**Testing Complete**: Ready for deployment? Yes / No
