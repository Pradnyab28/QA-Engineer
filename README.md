# Pradnya Bapte — Professional QA Engineer Portfolio

A complete, production-ready personal portfolio website for **Pradnya Bapte**, QA Engineer | Software Test Engineer with 3+ years of experience across Manual Testing, Automation (Selenium WebDriver, Java, TestNG), API Testing, and Mobile Testing.

---

## 🚀 Live Vercel Deployment Guide

This website is a pure, high-performance static web application (HTML5, Vanilla CSS3, Modern ES6 JavaScript) pre-configured with `vercel.json` for **1-click deployment on Vercel**.

### Method 1: Deploy via GitHub (Recommended for Automated Updates)

1. **Create a GitHub Repository**:
   - Go to [github.com/new](https://github.com/new) and log in.
   - Enter Repository Name: `pradnya-bapte-portfolio`.
   - Set visibility to **Public** (or **Private**).
   - Click **Create repository**.

2. **Upload Your Portfolio Files**:
   - On the new repository page, click **"uploading an existing file"** (or use Git if installed).
   - Drag and drop all files from this folder (`c:\Users\prasa\OneDrive\Desktop\portfolio`):
     - `index.html`
     - `css/` folder
     - `js/` folder
     - `assets/` folder
     - `Pradnya_Bapte_Resume.pdf`
     - `vercel.json`
     - `package.json`
   - Click **Commit changes**.

3. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
   - Click **"Add New..."** → **"Project"**.
   - Under **"Import Git Repository"**, select `pradnya-bapte-portfolio`.
   - In **Project Settings**:
     - **Framework Preset**: Select **"Other"** (or leave as Auto-Detected).
     - **Root Directory**: `./` (default).
     - **Build Command**: Leave default or empty.
     - **Output Directory**: Leave default (`.`).
   - Click **Deploy**.

4. **Your Live URL**:
   - In approximately 15 seconds, Vercel will deploy your site and provide a live public URL:
     ```text
     https://pradnya-bapte-portfolio.vercel.app
     ```
   - Any future code commits to GitHub will automatically redeploy the website!

---

### Method 2: Deploy via Vercel CLI

If you have Node.js / npm installed:
```bash
npm install -g vercel
vercel
```
Follow the prompts to link your Vercel account and deploy in seconds.

---

## 🎨 Design System & Color Palette

- **Primary Background**: `#08111F`
- **Secondary Background**: `#0C1727`
- **Card Surfaces**: `#101E2F`
- **Primary Accent**: `#5EE7D1` (Electric Teal / Mint Cyan)
- **Main Text**: `#EDF4F8`
- **Secondary Text**: `#AEBCCD`
- **Borders & Dividers**: `#1E3247`
- **Typography**: `Inter` (Body & Headings) + `JetBrains Mono` (Code & Badges)

---

## 📁 Project Structure

```
portfolio/
├── index.html                   # Production-ready semantic HTML5
├── vercel.json                  # Vercel caching, headers & routing configuration
├── .gitignore                   # Clean Git ignore rules
├── Pradnya_Bapte_Resume.pdf     # Verified 1-click downloadable resume PDF
├── package.json                 # Standard npm build & dev scripts
├── run-portfolio.bat            # 1-click local launch shortcut for Windows
├── server.ps1                   # Native zero-dependency local dev server
├── css/
│   ├── variables.css            # Color tokens, typography, shadows, elevation
│   ├── base.css                 # Base layout, resets, accessibility
│   ├── components.css           # Navigation, Hero, Cards, Timeline, Workflow, Modal, Toast
│   └── responsive.css           # Tablet and mobile responsive rules
├── js/
│   ├── app.js                   # Navigation drawer, scroll spy, clipboard, modal
│   └── qa-visual.js             # Interactive Test Automation console & test suite filter
└── assets/
    └── favicon.svg              # Custom "PB" monogram QA icon
```

---

## 💻 Local Testing & Preview

- **1-Click Launch**: Double-click `run-portfolio.bat` in this folder.
- **Local Dev URL**: `http://localhost:5173`
- **Direct Browser File**: Double-click `index.html` to open in Chrome, Edge, Firefox, or Safari.

---

## ✅ Production Verification Completed

- [x] All routes, styles, scripts, and SVG assets tested with HTTP 200 OK.
- [x] `Pradnya_Bapte_Resume.pdf` generated, verified, and linked to all download CTAs.
- [x] Click-to-call (`tel:`), direct email (`mailto:`), and 1-click clipboard copy with toast feedback verified.
- [x] Security headers and static asset caching configured in `vercel.json`.
- [x] Responsive layout tested for desktop, tablet, and mobile devices.
