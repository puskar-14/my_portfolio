# Puskar.dev — "Every Door Opens a Different Story"

> An interactive 3D developer portfolio styled as an illustrated pastel storybook hallway.

---

## 🎨 Creative Concept & Art Direction

- **Core Metaphor**: The visitor travels through a cozy, pastel-coloured hallway inside an artistic home, accompanying a young developer character with a backpack.
- **Visual Aesthetic**: Hand-drawn colored-pencil sketch textures, warm ivory and cream walls, soft pastel hues (blue, purple, peach, mint, pink, gold), natural sunlight beams, and subtle imperfections bringing a storybook to life.
- **Doors of Identity**:
  1. 🚪 **Door 01 — Education (Pastel Blue)**: *The Scholar's Courtyard* — B.Tech in Computer Science & Engineering at College of Engineering & Management, Kolaghat (CEMK), academic milestones, and certifications.
  2. 🚪 **Door 02 — Skills (Pastel Purple)**: *The Hacker's Atelier* — Java, Python, C, React, FastAPI, PostgreSQL, SQL, Git & GitHub with live code snippets.
  3. 🚪 **Door 03 — Projects (Pastel Peach / Orange - Centerpiece)**: *The Invention Workshop* — Featuring **ShopSense** (Customer Insight & Product Analytics Platform), **AI Finance Health Coach**, Algorithmic Vault, and CEMK Campus Hub with interactive blueprints and full dossiers.
  4. 🚪 **Door 04 — Achievements (Pastel Mint Green)**: *The Milestone Summit* — 250+ LeetCode, 90+ CodeChef, hackathons, trophy case, and interactive confetti celebration.
  5. 🚪 **Door 05 — Contact (Pastel Pink)**: *The Cozy Mailroom* — Email copy, LinkedIn, GitHub, resume download, and letter desk message box.
  6. 🚪 **Final Door — The Next Chapter (Warm Mysterious Gold)**: *The Starlit Observatory* — Future goals, AI agent architectures, distributed systems, and open source vision.

---

## 🕹️ Controls & Interactions

- **Keyboard Navigation**:
  - `W` / `Up Arrow`: Walk forward down the corridor
  - `S` / `Down Arrow`: Walk backward
  - `A` / `D` or `Left` / `Right`: Turn and step
  - `E`: Open / Enter approaching door
  - `ESC`: Exit room back to the hallway
- **Mouse & Touch**:
  - Click directly on any 3D door in the hallway to glide smoothly to it
  - Bottom corridor scrubber & door dock: Jump to any room with a single tap
  - Mouse wheel: Walk smoothly down the corridor
- **Audio & Ambiance**:
  - Self-contained Web Audio API synthesizer for gentle footsteps, wooden door creaks, soft windchimes, and trophy celebration chimes
  - Ambient Lofi Button: Generates cozy pentatonic background pad chords
- **Accessible Storybook Mode**:
  - Toggle between the 3D Walking Hallway and an Illustrated Storybook Reader view for low-spec devices or fast browsing

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Styling**: Tailwind CSS v4, custom pastel design tokens, sketchy borders, and Google Fonts (`Plus Jakarta Sans`, `Patrick Hand`, `Caveat`)
- **Animations & Effects**: Canvas Confetti, Web Audio API Sound Synthesizer, custom toon shaders and SVG noise grain filters

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build
```
