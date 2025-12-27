```
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║                   PORTFOLIO OS v1.0.0                          ║
║                                                                ║
║            A Retro Desktop Operating System Interface          ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

![Portfolio OS Screenshot](./assets/images/website_screenshot.png)

## 📋 SYSTEM REQUIREMENTS

```
┌─────────────────────────────────────────────┐
│ OS:        Any modern web browser           │
│ RAM:       512MB minimum                    │
│ Storage:   10MB free space                  │
│ Display:   1024x768 or higher               │
└─────────────────────────────────────────────┘
```

## 🎨 ABOUT

Portfolio OS is a fully functional desktop operating system interface built for the web. Experience the nostalgia of classic computing with modern web technologies. No CRT effects, no neon green - just authentic retro UI design.

**Features:**
- Draggable, resizable windows with minimize/maximize controls
- Functional taskbar with Start menu and system tray
- Desktop icons with double-click functionality
- Right-click context menus
- Multiple applications (Terminal, File Explorer, Calculator, Notepad, Gallery)
- Authentic beveled borders and 3D button effects
- Teal desktop with silver-gray interface elements

## 🔧 INSTALLATION

```bash
# Clone the repository
$ git clone <repository-url>
$ cd portfolio-os

# Install dependencies
$ npm install

# Start development server
$ npm run dev

# Build for production
$ npm run build
```

## 📦 TECH STACK

```
┌────────────────────────────────────┐
│ Frontend:  React 18.3.1            │
│ Language:  TypeScript              │
│ Styling:   Tailwind CSS            │
│ Build:     Vite                    │
│ Icons:     Lucide React            │
│ Animation: Framer Motion           │
└────────────────────────────────────┘
```

## 🖥️ APPLICATIONS

### Terminal.exe
Interactive command-line interface with functional commands:
- `help` - Display available commands
- `about` - System information
- `skills` - Technical skills
- `projects` - Project showcase
- `contact` - Contact information
- `clear` - Clear terminal

### File Explorer
Navigate through project structure with a classic file browser interface.

### Calculator
Fully functional calculator with standard operations.

### Notepad
Simple text editor for quick notes and documentation.

### Gallery
3D carousel showcase for project images and artwork.

## 🎯 PROJECT STRUCTURE

```
portfolio-os/
├── src/
│   ├── components/
│   │   ├── Carousel3D.tsx      # 3D image carousel
│   │   ├── Portfolio.tsx       # Main OS interface
│   │   ├── RetroLoader.tsx     # Loading animation
│   │   ├── SplashScreen.tsx    # Boot screen
│   │   ├── Terminal.tsx        # Command terminal
│   │   └── ThemeSwitcher.tsx   # Theme selection
│   ├── contexts/
│   │   └── ThemeContext.tsx    # Theme state management
│   ├── types/
│   │   └── theme.ts            # Theme type definitions
│   ├── App.tsx                 # Root component
│   └── index.css               # Global styles
├── assets/
│   └── images/                 # Project screenshots
└── public/                     # Static assets
```

## 🎨 DESIGN PHILOSOPHY

This project embraces **authentic retro aesthetics** without relying on overused tropes:

❌ **Avoided:**
- CRT scanlines and screen flicker
- Phosphor glow effects
- Neon green terminal text
- Matrix-style falling code

✅ **Implemented:**
- Classic teal (#008080) desktop background
- Silver-gray (#C0C0C0) window chrome
- Navy blue (#000080) title bars
- Beveled 3D borders (light/shadow technique)
- Authentic button press states
- System-appropriate typography

## 🚀 DEVELOPMENT

```bash
# Run development server
$ npm run dev

# Run type checking
$ npm run typecheck

# Run linting
$ npm run lint

# Build for production
$ npm run build

# Preview production build
$ npm run preview
```

## 📝 LICENSE

```
┌──────────────────────────────────────────────┐
│                                              │
│  This software is provided "as is" without   │
│  warranty of any kind.                       │
│                                              │
│  Feel free to use, modify, and distribute.   │
│                                              │
└──────────────────────────────────────────────┘
```

## 🤝 CONTRIBUTING

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Share feedback

## 📞 CONTACT

```
═══════════════════════════════════════════
  Thank you for using Portfolio OS!
═══════════════════════════════════════════
```

---

<div align="center">

**Made with nostalgia and modern web technologies**

`[Start]` • `[Applications]` • `[System Settings]` • `[About]`

</div>
