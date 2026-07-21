## 🚀 Key Features & Highlights

- **Ultra-Smooth Scrolling**: Powered by [Lenis](https://github.com/darkroomengineering/lenis) and synchronized with GSAP's render loop for zero-lag animations.
- **Liquid Morphism Effects**: Dynamic animated blob backgrounds utilizing CSS blur filters and an SVG-based gooey/liquid filter (`#liquid-goo`).
- **Interactive Floating Dock**: A custom navigation dock displaying gooey morphing backdrop transitions that align with the active/hovered section.
- **Tailwind CSS v4 Engine**: Built on the native CSS-first Tailwind v4 engine using `@tailwindcss/vite` for faster builds and seamless CSS variable integration.
- **Responsive Layout**: Fluid layouts that scale down beautifully for tablets and mobile devices.
- **Modern Typography & Themes**: Support for system light/dark mode preference via standard media queries (`prefers-color-scheme`).

---

## 🛠️ Technology Stack

| Technology | Purpose | Key Benefit |
| :--- | :--- | :--- |
| **React 19** | Core UI Library | Modern component model, optimal rendering |
| **TypeScript** | Static Typing | Code reliability and self-documenting APIs |
| **Vite 8** | Dev Server & Bundler | Near-instant HMR and fast production builds |
| **Tailwind CSS v4** | CSS-First Styling | Modern utility-first framework using native CSS variables |
| **GSAP & ScrollTrigger** | High-Performance Animations | Industrial-grade animation sequencing and scroll hooks |
| **Lenis** | Smooth Scroll Engine | Custom scrolling mechanics integrated with requestAnimationFrame |
| **Lucide React** | Icon Suite | Crisp SVG icons matching the developer theme |

---

## 📂 Core Architecture & Directory Layout

```text
web-portfolio/
├── src/
│   ├── components/
│   │   └── SmoothScroll.tsx      # Lenis smooth-scroll wrapper, context & ticker link
│   ├── hooks/
│   │   └── useScrollReveal.ts    # GSAP ScrollTrigger custom React hook
│   ├── assets/                   # Images, SVG logos, and local resources
│   ├── App.tsx                   # Main page layout, sections & interaction logic
│   ├── App.css                   # Component-specific complex keyframes & overrides
│   ├── index.css                 # Global theme variables, fonts, and Tailwind imports
│   └── main.tsx                  # React DOM mount point with SmoothScroll wrapper
├── package.json                  # Dependencies & scripts
└── vite.config.ts                # Vite plugins and build configurations
```

---

## ⚙️ Core Components & APIs

### 1. Smooth Scroll Pipeline (`src/components/SmoothScroll.tsx`)

This component wraps the application and binds Lenis smooth scrolling with GSAP's rendering lifecycle (`gsap.ticker`). This ensures that animations triggered by scrolling align perfectly without frame lag or visual jitter.

* **Usage**: Wrapped automatically in `main.tsx`. Access the Lenis instance inside any component using the `useLenis` hook:
  ```tsx
  import { useLenis } from './components/SmoothScroll';
  
  const MyComponent = () => {
    const lenis = useLenis();
    
    const handleClick = () => {
      // Smooth scroll to a target section
      lenis?.scrollTo('#contact');
    };
  
    return <button onClick={handleClick}>Get in touch</button>;
  };
  ```

### 2. Declarative Scroll Animations (`src/hooks/useScrollReveal.ts`)

A custom hook utilizing GSAP context mapping for clean mounting and unmounting of scroll-triggered animations. It prevents memory leaks by calling `ctx.revert()` when components unmount.

* **Usage**:
  ```tsx
  import { useScrollReveal } from '../hooks/useScrollReveal';
  
  const MyComponent = () => {
    const revealRef = useScrollReveal<HTMLDivElement>({
      animation: { opacity: 0, y: 50, scale: 0.95, duration: 1.0 },
      triggerHook: 'top 85%',
      once: true
    });
  
    return <div ref={revealRef}>Reveal Content on Scroll</div>;
  };
  ```

---

## 🎨 Styling & Design System

The application styling follows a CSS-first paradigm matching Tailwind v4 specifications:

- **Tailwind v4 Integration**: Pre-compiled with Vite's official Tailwind plugin `@tailwindcss/vite` in `vite.config.ts`.
- **Theme Variables**: Core theme variables (text, background, border, accents) are declared inside `:root` block in `src/index.css`.
- **System Dark Mode**: Automatic dark mode styling based on system-level configuration:
  ```css
  @media (prefers-color-scheme: dark) {
    :root {
      --text: #9ca3af;
      --bg: #16171d;
      --border: #2e303a;
      /* Dark accents and shadows */
    }
  }
  ```
- **SVG Gooey Filter**: The floating dock uses a CSS `filter: url(#liquid-goo)` coupled with a SVG `<feColorMatrix>` definition in `App.tsx` to merge background elements fluidly on hover.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18+) installed.

### Setup and Installation

1. Navigate to the `web-portfolio` directory:
   ```bash
   cd web-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Command Reference

| Command | Action |
| :--- | :--- |
| `npm run dev` | Launch the local development server with Hot Module Replacement (HMR) |
| `npm run build` | Compile TypeScript and build the optimized production assets inside `/dist` |
| `npm run preview` | Spin up a local server to preview the built production site |
| `npm run lint` | Run ESLint to check for code quality and style errors |
