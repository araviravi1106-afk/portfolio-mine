# 🚀 Aravindh S — Portfolio Website

**Live 3D Portfolio** for a Computer Science Engineering Student  
Built with Three.js, Vanilla JS, HTML5, CSS3 — Zero frameworks, Zero build tools.

---

## 🔗 Links to Update Before Deploying

Open `index.html` and search for `YOUR_` — replace every placeholder:

| Placeholder | What to put |
|---|---|
| `YOUR_RESUME_LINK_HERE` | Google Drive PDF link of your resume |
| `YOUR_LUMINA_CRAFT_LIVE_LINK_HERE` | Lumina Craft Vercel live URL |
| `YOUR_LUMINA_CRAFT_GITHUB_LINK_HERE` | Lumina Craft GitHub repo URL |
| `YOUR_AI_CHATBOT_LIVE_LINK_HERE` | AI Chatbot Streamlit live URL |
| `YOUR_AI_CHATBOT_GITHUB_LINK_HERE` | AI Chatbot GitHub repo URL |
| `YOUR_PRODUCTIVITY_APP_GITHUB_LINK_HERE` | Productivity App GitHub repo URL |
| `YOUR_ATM_SIMULATION_GITHUB_LINK_HERE` | ATM Simulation GitHub repo URL |
| `YOUR_PORTFOLIO_LIVE_LINK_HERE` | This portfolio's GitHub Pages URL |
| `YOUR_PORTFOLIO_GITHUB_LINK_HERE` | This portfolio's GitHub repo URL |
| `YOUR_GITHUB_PROFILE_LINK_HERE` | Your GitHub profile URL |
| `YOUR_LINKEDIN_PROFILE_LINK_HERE` | Your LinkedIn profile URL |
| `YOUR_GITHUB_USERNAME` | Your GitHub username (in contact section) |
| `YOUR_PROFILE` | Your LinkedIn profile slug |

---

## 📁 File Structure

```
aravindh-portfolio/
├── index.html                   ← Main portfolio page
├── style.css                    ← All styling & animations
├── main.js                      ← Three.js 3D + interactions
├── .github/
│   └── workflows/
│       └── deploy.yml           ← Auto GitHub Pages deployment
└── README.md
```

---

## 🛠️ Deploy to GitHub Pages (Step-by-Step)

### Step 1 — Create GitHub Repository

1. Go to [github.com](https://github.com) → Click **New Repository**
2. Name it: **`araviravi1106.github.io`** *(for user site, use your exact username)*
   - OR any name like `portfolio` for a project site
3. Set visibility: **Public**
4. Click **Create Repository** (don't add README)

### Step 2 — Upload Files

**Option A — GitHub Web UI (easiest):**
1. Open your repo → Click **Add file → Upload files**
2. Drag ALL files including the `.github` folder
3. Commit message: `Initial portfolio`
4. Click **Commit changes**

> ⚠️ The `.github` folder may be hidden on your computer.  
> On Mac: Press `Cmd + Shift + .` to show hidden files  
> On Windows: Enable "Show hidden items" in File Explorer

**Option B — Git CLI:**
```bash
cd aravindh-portfolio
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages** (left sidebar)
2. Under **Source** → select **GitHub Actions**
3. The workflow auto-deploys on every push to `main`

### Step 4 — Your Live URL

| Repo Name | Your Live URL |
|---|---|
| `username.github.io` | `https://username.github.io` |
| `portfolio` | `https://username.github.io/portfolio` |

> ⏱️ First deploy takes ~2 minutes. Check the **Actions** tab to see progress.

---

## ✨ Features

| Feature | Technology |
|---|---|
| 3D particle constellation (3000 pts) | Three.js r128 |
| Floating wireframe geometry | IcosahedronGeometry, OctahedronGeometry |
| Double helix DNA animation | SphereGeometry + custom math |
| Mouse parallax on hero | mousemove event |
| Typing effect | Vanilla JS |
| Scroll-triggered animations | IntersectionObserver API |
| 3D card tilt on hover | CSS transforms + mousemove |
| Custom cursor + follower | rAF loop |
| Auto GitHub Pages deploy | GitHub Actions |
| Fully responsive | CSS Grid + media queries |

---

## 📞 Contact

**Aravindh S**  
📧 araviravi1106@gmail.com  
📍 Auroville, Puducherry  
🎓 B.E CSE · Mailam Engineering College · 2022–2026 · CGPA: 8.36
