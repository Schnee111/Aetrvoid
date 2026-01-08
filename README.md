# ✨ AetrVoid

A stunning, modern portfolio website built with Next.js 16, featuring immersive 3D backgrounds, smooth animations, and interactive particle effects. AetrVoid showcases a perfect blend of cutting-edge web technologies to create an engaging user experience.

## 🌟 Features

- **🎨 Dynamic 3D Backgrounds**: Multiple switchable 3D scenes including blackhole, moon, red moon, nebula, and custom variations powered by Three.js
- **⚡ Interactive Particles**: Engaging particle system with mouse interaction
- **🎭 Smooth Animations**: Fluid animations using Framer Motion and GSAP
- **📱 Responsive Design**: Fully responsive layout optimized for all devices
- **🚀 Performance Optimized**: Lazy-loaded components and optimized images
- **🎯 Smooth Scrolling**: Enhanced scroll experience with Lenis
- **📊 Interactive Sections**: 
  - Hero section with dynamic backgrounds
  - Tech stack showcase
  - Project portfolio with parallax effects
  - Experience timeline
  - Stats radar visualization
- **🎨 Modern UI**: Built with Tailwind CSS for a sleek, modern interface

## 🛠️ Tech Stack

### Core
- **[Next.js 16](https://nextjs.org/)** - React framework for production
- **[React 19](https://react.dev/)** - Latest React version
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### 3D & Animation
- **[Three.js](https://threejs.org/)** - 3D graphics library
- **[@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/)** - React renderer for Three.js
- **[@react-three/drei](https://github.com/pmndrs/drei)** - Useful helpers for React Three Fiber
- **[@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing)** - Post-processing effects
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[GSAP](https://greensock.com/gsap/)** - Professional-grade animation

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Simple Icons](https://simpleicons.org/)** - SVG icons for popular brands
- **[clsx](https://github.com/lukeed/clsx)** - Utility for constructing className strings
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind CSS classes

### Other
- **[Lenis](https://lenis.studiofreight.com/)** - Smooth scroll library

## 📁 Project Structure

```
lumina-web/
├── public/
│   ├── fonts/          # Custom fonts (Google Sans Flex)
│   ├── images/         # Static images
│   │   ├── projects/   # Project screenshots
│   │   └── waifus/     # Avatar/character images
│   └── videos/         # Video assets
├── src/
│   ├── app/
│   │   ├── globals.css # Global styles
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Home page
│   ├── components/
│   │   ├── canvas/     # 3D canvas components
│   │   │   ├── InteractiveParticles.tsx
│   │   │   └── Scene.tsx
│   │   ├── dom/        # DOM components
│   │   │   ├── Background3D-*.tsx  # 3D background variants
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── providers/  # Context providers
│   │   │   └── SmoothScroll.tsx
│   │   ├── sections/   # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── TechStack.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Experience.tsx
│   │   │   └── StatsRadar.tsx
│   │   └── ui/         # Reusable UI components
│   │       └── Badge.tsx
│   ├── data/           # Static data
│   │   ├── projects.ts
│   │   └── waifus.ts
│   └── hooks/          # Custom React hooks
│       └── use-mobile.ts
├── eslint.config.mjs   # ESLint configuration
├── next.config.ts      # Next.js configuration
├── tailwind.config.ts  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lumina-web
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Adding New 3D Backgrounds

1. Create a new component in `src/components/dom/`
2. Add it to the `backgroundMap` in `src/app/page.tsx`
3. The background will be available for dynamic switching

### Modifying Content

- **Projects**: Edit `src/data/projects.ts`
- **Tech Stack**: Update in `src/components/sections/TechStack.tsx`
- **Experience**: Modify `src/components/sections/Experience.tsx`
- **Styles**: Global styles in `src/app/globals.css`

### Tailwind Configuration

Customize colors, fonts, and other design tokens in `tailwind.config.ts`.

## 📦 Build & Deploy

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` directory.

### Deployment Options

#### Vercel (Recommended)
The easiest way to deploy is using [Vercel](https://vercel.com/):

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and deploy

#### Other Platforms
- **Netlify**: Use the Next.js plugin
- **AWS Amplify**: Follow Next.js deployment guide
- **Docker**: Create a Dockerfile for containerization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/) for the amazing framework
- [Pmndrs](https://github.com/pmndrs) for React Three Fiber ecosystem
- [Vercel](https://vercel.com/) for hosting and deployment
- All open-source contributors

## 📞 Contact

For questions or feedback, please reach out through:
- GitHub Issues
- Project website

---

Built with ❤️ using Next.js and Three.js
