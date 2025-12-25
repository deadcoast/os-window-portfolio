import { useTheme } from '../contexts/ThemeContext';
import { themes } from '../types/theme';
import { Palette } from 'lucide-react';

export function ThemeSwitcher() {
  const { themeName, setTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <div className="theme-switcher-header">
        <Palette size={18} />
        Theme
      </div>
      <div className="theme-grid">
        {Object.values(themes).map((theme) => (
          <button
            key={theme.name}
            onClick={() => setTheme(theme.name)}
            className={`theme-option ${themeName === theme.name ? 'active' : ''}`}
          >
            <div className="theme-preview">
              <div
                className="theme-preview-color"
                style={{ background: theme.colors.accentPrimary }}
              />
              <div
                className="theme-preview-color"
                style={{ background: theme.colors.accentSecondary }}
              />
              <div
                className="theme-preview-color"
                style={{ background: theme.colors.accentTertiary }}
              />
            </div>
            <span className="theme-name">{theme.displayName}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
