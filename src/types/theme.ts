export type ThemeName = 'dark' | 'ocean' | 'forest' | 'sunset' | 'monochrome' | 'y2k' | 'brutalist';

export interface Theme {
  name: ThemeName;
  displayName: string;
  colors: {
    bgPrimary: string;
    bgSecondary: string;
    bgTertiary: string;
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    accentPrimary: string;
    accentSecondary: string;
    accentTertiary: string;
    borderPrimary: string;
    borderSecondary: string;
  };
}

export const themes: Record<ThemeName, Theme> = {
  dark: {
    name: 'dark',
    displayName: 'Dark',
    colors: {
      bgPrimary: '#0a0e27',
      bgSecondary: '#111827',
      bgTertiary: '#1a1f3a',
      textPrimary: '#e5e7eb',
      textSecondary: '#9ca3af',
      textTertiary: '#6b7280',
      accentPrimary: '#3b82f6',
      accentSecondary: '#8b5cf6',
      accentTertiary: '#06b6d4',
      borderPrimary: '#1f2937',
      borderSecondary: '#374151',
    },
  },
  ocean: {
    name: 'ocean',
    displayName: 'Ocean',
    colors: {
      bgPrimary: '#0a1929',
      bgSecondary: '#0d2137',
      bgTertiary: '#1a2942',
      textPrimary: '#e3f2fd',
      textSecondary: '#90caf9',
      textTertiary: '#64b5f6',
      accentPrimary: '#00b4d8',
      accentSecondary: '#0096c7',
      accentTertiary: '#48cae4',
      borderPrimary: '#1e3a5f',
      borderSecondary: '#2c5282',
    },
  },
  forest: {
    name: 'forest',
    displayName: 'Forest',
    colors: {
      bgPrimary: '#0a1409',
      bgSecondary: '#0f1e0d',
      bgTertiary: '#1a2818',
      textPrimary: '#e8f5e9',
      textSecondary: '#a5d6a7',
      textTertiary: '#81c784',
      accentPrimary: '#4caf50',
      accentSecondary: '#66bb6a',
      accentTertiary: '#81c784',
      borderPrimary: '#1b5e20',
      borderSecondary: '#2e7d32',
    },
  },
  sunset: {
    name: 'sunset',
    displayName: 'Sunset',
    colors: {
      bgPrimary: '#1a0f0a',
      bgSecondary: '#2d1810',
      bgTertiary: '#3d2418',
      textPrimary: '#fff3e0',
      textSecondary: '#ffccbc',
      textTertiary: '#ffab91',
      accentPrimary: '#ff6f00',
      accentSecondary: '#ff9100',
      accentTertiary: '#ff6d00',
      borderPrimary: '#4e342e',
      borderSecondary: '#5d4037',
    },
  },
  monochrome: {
    name: 'monochrome',
    displayName: 'Monochrome',
    colors: {
      bgPrimary: '#0a0a0a',
      bgSecondary: '#141414',
      bgTertiary: '#1f1f1f',
      textPrimary: '#fafafa',
      textSecondary: '#a3a3a3',
      textTertiary: '#737373',
      accentPrimary: '#e5e5e5',
      accentSecondary: '#d4d4d4',
      accentTertiary: '#a3a3a3',
      borderPrimary: '#262626',
      borderSecondary: '#404040',
    },
  },
  y2k: {
    name: 'y2k',
    displayName: 'Y2K',
    colors: {
      bgPrimary: '#000000',
      bgSecondary: '#0d0018',
      bgTertiary: '#1a0030',
      textPrimary: '#ffffff',
      textSecondary: '#ff00ff',
      textTertiary: '#00ffff',
      accentPrimary: '#ff00ff',
      accentSecondary: '#00ffff',
      accentTertiary: '#ff0099',
      borderPrimary: '#ff00ff',
      borderSecondary: '#00ffff',
    },
  },
  brutalist: {
    name: 'brutalist',
    displayName: 'Brutalist',
    colors: {
      bgPrimary: '#ffffff',
      bgSecondary: '#f5f5f5',
      bgTertiary: '#e0e0e0',
      textPrimary: '#000000',
      textSecondary: '#333333',
      textTertiary: '#666666',
      accentPrimary: '#ff0000',
      accentSecondary: '#0000ff',
      accentTertiary: '#ffff00',
      borderPrimary: '#000000',
      borderSecondary: '#333333',
    },
  },
};
