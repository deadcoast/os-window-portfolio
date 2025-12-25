import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Terminal } from './components/Terminal';
import { Portfolio } from './components/Portfolio';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { TerminalSquare, User, Palette } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'terminal'>('portfolio');
  const [showThemes, setShowThemes] = useState(false);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-bracket">{'<'}</span>
            dev.portfolio
            <span className="logo-bracket">{'/>'}</span>
          </div>
          <nav className="nav-tabs">
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`nav-tab ${activeTab === 'portfolio' ? 'active' : ''}`}
            >
              <User size={16} />
              Portfolio
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className={`nav-tab ${activeTab === 'terminal' ? 'active' : ''}`}
            >
              <TerminalSquare size={16} />
              Terminal
            </button>
            <button
              onClick={() => setShowThemes(!showThemes)}
              className={`nav-tab ${showThemes ? 'active' : ''}`}
            >
              <Palette size={16} />
              Themes
            </button>
          </nav>
        </div>
      </header>

      <main className="app-main">
        {showThemes && <ThemeSwitcher />}

        {activeTab === 'portfolio' && <Portfolio />}
        {activeTab === 'terminal' && (
          <div className="terminal-wrapper">
            <Terminal />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <span className="retro-accent">{'<dev/>'}</span> © 2024 • Built with React + TypeScript
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
