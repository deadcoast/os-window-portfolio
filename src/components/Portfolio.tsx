import { Terminal, Minus, X, Maximize2, Clock, Calculator, FileText, Settings, Image, Folder, Info, User, Mail, Github, Linkedin } from 'lucide-react';
import { RetroLoader } from './RetroLoader';
import { Carousel3D } from './Carousel3D';
import { useState, useEffect, useRef } from 'react';

interface WindowData {
  id: string;
  title: string;
  icon: JSX.Element;
  content: JSX.Element;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  zIndex: number;
}

interface DraggableWindowProps {
  window: WindowData;
  onDragStart: (id: string) => void;
  onDragMove: (id: string, x: number, y: number) => void;
  onMinimize: (id: string) => void;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  onRecenter: (id: string) => void;
}

const ICON_ZONE = 120;
const TASKBAR_HEIGHT = 40;

function DraggableWindow({ window, onDragStart, onDragMove, onMinimize, onClose, onFocus, onRecenter }: DraggableWindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        let newX = e.clientX - dragOffset.x;
        let newY = e.clientY - dragOffset.y;

        newX = Math.max(ICON_ZONE, Math.min(newX, window.innerWidth - window.width - 10));
        newY = Math.max(0, Math.min(newY, window.innerHeight - TASKBAR_HEIGHT - 30));

        onDragMove(window.id, newX, newY);
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, window.id, window.width, onDragMove]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;

    onDragStart(window.id);
    setIsDragging(true);

    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    if ((e.target as HTMLElement).closest('.window-content')) return;

    e.stopPropagation();
    onRecenter(window.id);
  };

  if (window.minimized) return null;

  return (
    <div
      ref={windowRef}
      className="os-window"
      style={{
        left: `${window.x}px`,
        top: `${window.y}px`,
        width: `${window.width}px`,
        height: `${window.height}px`,
        zIndex: window.zIndex,
      }}
      onClick={() => onFocus(window.id)}
    >
      <div
        className="window-titlebar"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <div className="window-title">
          {window.icon}
          <span>{window.title}</span>
        </div>
        <div className="window-controls">
          <button onClick={() => onMinimize(window.id)} className="window-btn window-btn-minimize" title="Minimize">
            <Minus size={14} />
          </button>
          <button className="window-btn window-btn-maximize" title="Maximize">
            <Maximize2 size={14} />
          </button>
          <button onClick={() => onClose(window.id)} className="window-btn window-btn-close" title="Close">
            <X size={14} />
          </button>
        </div>
      </div>
      <div className="window-content">
        {window.content}
      </div>
    </div>
  );
}

interface DesktopIcon {
  id: string;
  title: string;
  icon: JSX.Element;
  x: number;
  y: number;
}

export function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [time, setTime] = useState(new Date());
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [nextZIndex, setNextZIndex] = useState(1);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const desktopIcons: DesktopIcon[] = [
    { id: 'about', title: 'About.exe', icon: <User size={32} />, x: 20, y: 20 },
    { id: 'gallery', title: 'Gallery.exe', icon: <Image size={32} />, x: 20, y: 130 },
    { id: 'terminal', title: 'Terminal.exe', icon: <Terminal size={32} />, x: 20, y: 240 },
    { id: 'files', title: 'Files.exe', icon: <Folder size={32} />, x: 20, y: 350 },
    { id: 'calculator', title: 'Calc.exe', icon: <Calculator size={32} />, x: 20, y: 460 },
    { id: 'notepad', title: 'Notes.exe', icon: <FileText size={32} />, x: 20, y: 570 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const clockTimer = setInterval(() => setTime(new Date()), 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(clockTimer);
    };
  }, []);

  const toggleWindow = (iconId: string) => {
    const existingWindow = windows.find(w => w.id === iconId);

    if (existingWindow) {
      handleClose(iconId);
      return;
    }

    openWindow(iconId);
  };

  const openWindow = (iconId: string) => {
    if (windows.some(w => w.id === iconId)) {
      handleFocus(iconId);
      return;
    }

    const windowConfig = {
      terminal: { title: 'Terminal', icon: <Terminal size={16} />, width: 600, height: 400 },
      about: { title: 'About Me', icon: <User size={16} />, width: 700, height: 500 },
      gallery: { title: '3D Art Gallery', icon: <Image size={16} />, width: 600, height: 450 },
      files: { title: 'File Explorer', icon: <Folder size={16} />, width: 650, height: 450 },
      calculator: { title: 'Calculator', icon: <Calculator size={16} />, width: 320, height: 480 },
      notepad: { title: 'Notepad', icon: <FileText size={16} />, width: 600, height: 400 },
      settings: { title: 'System Settings', icon: <Settings size={16} />, width: 550, height: 500 },
    }[iconId] || { title: 'Window', icon: <Terminal size={16} />, width: 600, height: 400 };

    const newWindow: WindowData = {
      id: iconId,
      title: windowConfig.title,
      icon: windowConfig.icon,
      content: getWindowContent(iconId),
      x: 100 + windows.length * 30,
      y: 80 + windows.length * 30,
      width: windowConfig.width,
      height: windowConfig.height,
      minimized: false,
      zIndex: nextZIndex,
    };

    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  };

  const getWindowContent = (id: string) => {
    switch (id) {
      case 'gallery':
        return (
          <div className="window-carousel">
            <h3>Art Gallery</h3>
            <Carousel3D />
          </div>
        );
      case 'terminal':
        return (
          <div className="window-terminal">
            <p>$ OS/Portfolio v1.0.0</p>
            <p>$ System initialized successfully</p>
            <p>$ Type 'help' for available commands</p>
            <p>&nbsp;</p>
            <p>$ Available commands:</p>
            <p>  - about     : Display system information</p>
            <p>  - projects  : List all projects</p>
            <p>  - skills    : Show technical skills</p>
            <p>  - clear     : Clear terminal</p>
            <p>&nbsp;</p>
            <p className="terminal-cursor">$_</p>
          </div>
        );
      case 'about':
        return (
          <div className="window-about">
            <div className="about-header">
              <div className="about-avatar">
                <User size={64} />
              </div>
              <div className="about-info">
                <h2>Developer Portfolio</h2>
                <p className="about-tagline">Full Stack Developer & UI/UX Enthusiast</p>
              </div>
            </div>
            <div className="about-section">
              <h3>About This Project</h3>
              <p>A retro-styled desktop operating system interface built with modern web technologies. This interactive portfolio showcases projects and skills in a unique, nostalgic way.</p>
            </div>
            <div className="about-section">
              <h3>Tech Stack</h3>
              <div className="tech-tags">
                <span className="tech-tag">React</span>
                <span className="tech-tag">TypeScript</span>
                <span className="tech-tag">Vite</span>
                <span className="tech-tag">Tailwind CSS</span>
              </div>
            </div>
            <div className="about-section">
              <h3>Connect</h3>
              <div className="social-links">
                <button className="social-btn"><Github size={16} /> GitHub</button>
                <button className="social-btn"><Linkedin size={16} /> LinkedIn</button>
                <button className="social-btn"><Mail size={16} /> Email</button>
              </div>
            </div>
          </div>
        );
      case 'files':
        return (
          <div className="window-files">
            <div className="file-toolbar">
              <div className="file-path">C:\Portfolio\Projects</div>
            </div>
            <div className="file-explorer">
              <div className="file-item">
                <Folder size={16} />
                <span>Web Applications</span>
              </div>
              <div className="file-item">
                <Folder size={16} />
                <span>Mobile Apps</span>
              </div>
              <div className="file-item">
                <Folder size={16} />
                <span>Open Source</span>
              </div>
              <div className="file-item">
                <FileText size={16} />
                <span>README.md</span>
              </div>
              <div className="file-item">
                <FileText size={16} />
                <span>resume.pdf</span>
              </div>
            </div>
          </div>
        );
      case 'calculator':
        return (
          <div className="window-calculator">
            <div className="calc-display">0</div>
            <div className="calc-buttons">
              <button className="calc-btn calc-btn-func">C</button>
              <button className="calc-btn calc-btn-func">±</button>
              <button className="calc-btn calc-btn-func">%</button>
              <button className="calc-btn calc-btn-op">÷</button>
              <button className="calc-btn">7</button>
              <button className="calc-btn">8</button>
              <button className="calc-btn">9</button>
              <button className="calc-btn calc-btn-op">×</button>
              <button className="calc-btn">4</button>
              <button className="calc-btn">5</button>
              <button className="calc-btn">6</button>
              <button className="calc-btn calc-btn-op">−</button>
              <button className="calc-btn">1</button>
              <button className="calc-btn">2</button>
              <button className="calc-btn">3</button>
              <button className="calc-btn calc-btn-op">+</button>
              <button className="calc-btn calc-btn-zero">0</button>
              <button className="calc-btn">.</button>
              <button className="calc-btn calc-btn-equals">=</button>
            </div>
          </div>
        );
      case 'notepad':
        return (
          <div className="window-notepad">
            <div className="notepad-toolbar">
              <button className="notepad-btn">File</button>
              <button className="notepad-btn">Edit</button>
              <button className="notepad-btn">View</button>
            </div>
            <textarea
              className="notepad-textarea"
              placeholder="Start typing..."
              defaultValue="Welcome to Notepad!\n\nThis is a simple text editor within the Portfolio OS.\n\nFeel free to explore other applications from the Start menu or desktop icons."
            />
            <div className="notepad-status">Line 1, Col 1</div>
          </div>
        );
      case 'settings':
        return (
          <div className="window-settings">
            <div className="settings-sidebar">
              <div className="settings-nav-item active">
                <Settings size={16} />
                <span>System</span>
              </div>
              <div className="settings-nav-item">
                <User size={16} />
                <span>Profile</span>
              </div>
              <div className="settings-nav-item">
                <Image size={16} />
                <span>Appearance</span>
              </div>
              <div className="settings-nav-item">
                <Info size={16} />
                <span>About</span>
              </div>
            </div>
            <div className="settings-content">
              <h2>System Information</h2>
              <div className="settings-item">
                <label>OS Name</label>
                <span>Portfolio OS</span>
              </div>
              <div className="settings-item">
                <label>Version</label>
                <span>1.0.0</span>
              </div>
              <div className="settings-item">
                <label>Build</label>
                <span>2024.12.25</span>
              </div>
              <div className="settings-item">
                <label>Runtime</label>
                <span>React 18.3.1</span>
              </div>
              <div className="settings-divider"></div>
              <h3>Performance</h3>
              <div className="settings-item">
                <label>Active Windows</label>
                <span>{windows.length}</span>
              </div>
              <div className="settings-item">
                <label>Memory Usage</label>
                <span>Optimized</span>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Window content</div>;
    }
  };

  const handleDragStart = (id: string) => {
    const maxZ = windows.length > 0 ? Math.max(...windows.map(w => w.zIndex)) : 0;
    setWindows(prev =>
      prev.map(w =>
        w.id === id ? { ...w, zIndex: maxZ + 1 } : w
      )
    );
    setNextZIndex(maxZ + 2);
  };

  const handleDragMove = (id: string, x: number, y: number) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, x, y } : w))
    );
  };

  const handleMinimize = (id: string) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, minimized: true } : w))
    );
  };

  const handleClose = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const handleRestore = (id: string) => {
    setWindows(prev =>
      prev.map(w =>
        w.id === id
          ? { ...w, minimized: false, zIndex: Math.max(...prev.map(win => win.zIndex)) + 1 }
          : w
      )
    );
  };

  const handleFocus = (id: string) => {
    const maxZ = windows.length > 0 ? Math.max(...windows.map(w => w.zIndex)) : 0;
    setWindows(prev =>
      prev.map(w =>
        w.id === id ? { ...w, zIndex: maxZ + 1, minimized: false } : w
      )
    );
    setNextZIndex(maxZ + 2);
  };

  const handleRecenter = (id: string) => {
    const centerX = (window.innerWidth - 500) / 2;
    const centerY = (window.innerHeight - TASKBAR_HEIGHT - 400) / 2;

    setWindows(prev =>
      prev.map(w =>
        w.id === id ? { ...w, x: Math.max(ICON_ZONE, centerX), y: Math.max(0, centerY) } : w
      )
    );
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <h2 className="loading-title">Loading Portfolio OS...</h2>
          <RetroLoader type="progress" size="lg" />
          <p className="loading-text">Initializing windows...</p>
        </div>
      </div>
    );
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
    setShowStartMenu(false);
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  return (
    <div className="portfolio-os-desktop">
      <div
        className="os-desktop"
        onClick={() => { setShowStartMenu(false); closeContextMenu(); }}
        onContextMenu={handleContextMenu}
      >
        {desktopIcons.map(icon => (
          <div
            key={icon.id}
            className="desktop-icon"
            style={{ left: `${icon.x}px`, top: `${icon.y}px` }}
            onClick={() => toggleWindow(icon.id)}
          >
            {icon.icon}
            <span>{icon.title}</span>
          </div>
        ))}

        {windows.map(window => (
          <DraggableWindow
            key={window.id}
            window={window}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onMinimize={handleMinimize}
            onClose={handleClose}
            onFocus={handleFocus}
            onRecenter={handleRecenter}
          />
        ))}
      </div>

      {contextMenu && (
        <div
          className="context-menu"
          style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="context-menu-item" onClick={() => { openWindow('about'); closeContextMenu(); }}>
            <User size={14} />
            <span>Open About</span>
          </button>
          <button className="context-menu-item" onClick={() => { openWindow('terminal'); closeContextMenu(); }}>
            <Terminal size={14} />
            <span>Open Terminal</span>
          </button>
          <div className="context-menu-divider"></div>
          <button className="context-menu-item" onClick={() => { openWindow('settings'); closeContextMenu(); }}>
            <Settings size={14} />
            <span>Settings</span>
          </button>
          <button className="context-menu-item" onClick={closeContextMenu}>
            <X size={14} />
            <span>Close Menu</span>
          </button>
        </div>
      )}

      {showStartMenu && (
        <div className="start-menu">
          <div className="start-menu-header">
            <Terminal size={18} />
            <span>Portfolio OS</span>
          </div>
          <div className="start-menu-section">
            <div className="start-menu-section-title">Applications</div>
            <button className="start-menu-item" onClick={() => { openWindow('about'); setShowStartMenu(false); }}>
              <User size={16} />
              <span>About Me</span>
            </button>
            <button className="start-menu-item" onClick={() => { openWindow('gallery'); setShowStartMenu(false); }}>
              <Image size={16} />
              <span>3D Gallery</span>
            </button>
            <button className="start-menu-item" onClick={() => { openWindow('terminal'); setShowStartMenu(false); }}>
              <Terminal size={16} />
              <span>Terminal</span>
            </button>
            <button className="start-menu-item" onClick={() => { openWindow('files'); setShowStartMenu(false); }}>
              <Folder size={16} />
              <span>File Explorer</span>
            </button>
          </div>
          <div className="start-menu-section">
            <div className="start-menu-section-title">Utilities</div>
            <button className="start-menu-item" onClick={() => { openWindow('calculator'); setShowStartMenu(false); }}>
              <Calculator size={16} />
              <span>Calculator</span>
            </button>
            <button className="start-menu-item" onClick={() => { openWindow('notepad'); setShowStartMenu(false); }}>
              <FileText size={16} />
              <span>Notepad</span>
            </button>
          </div>
          <div className="start-menu-section">
            <div className="start-menu-section-title">System</div>
            <button className="start-menu-item" onClick={() => { openWindow('settings'); setShowStartMenu(false); }}>
              <Settings size={16} />
              <span>Settings</span>
            </button>
          </div>
        </div>
      )}

      <div className="os-taskbar">
        <div className="taskbar-start">
          <button
            className="taskbar-btn start-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowStartMenu(!showStartMenu);
            }}
          >
            <Terminal size={16} />
            Start
          </button>
        </div>
        <div className="taskbar-windows">
          {windows.map(window => (
            <button
              key={window.id}
              className={`taskbar-window-btn ${window.minimized ? 'minimized' : ''}`}
              onClick={() => handleRestore(window.id)}
            >
              {window.icon}
              <span>{window.title}</span>
            </button>
          ))}
        </div>
        <div className="taskbar-tray">
          <div className="taskbar-clock">
            <Clock size={14} />
            {time.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
