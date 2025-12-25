import { useState, useEffect } from 'react';

interface RetroLoaderProps {
  type?: 'progress' | 'spinner' | 'dots';
  size?: 'sm' | 'md' | 'lg';
}

export function RetroLoader({ type = 'progress', size = 'md' }: RetroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    if (type === 'progress') {
      const interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 5));
      }, 100);
      return () => clearInterval(interval);
    }

    if (type === 'dots') {
      const interval = setInterval(() => {
        setDotCount(prev => (prev >= 3 ? 0 : prev + 1));
      }, 400);
      return () => clearInterval(interval);
    }
  }, [type]);

  if (type === 'progress') {
    return (
      <div className={`retro-loader retro-loader-${size}`}>
        <div className="retro-progress-bar">
          <div className="retro-progress-fill" style={{ width: `${progress}%` }} />
          <div className="retro-progress-segments">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`retro-segment ${i < progress / 5 ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
        <div className="retro-progress-text">{progress}%</div>
      </div>
    );
  }

  if (type === 'spinner') {
    return (
      <div className={`retro-loader retro-loader-${size}`}>
        <div className="retro-spinner">
          <div className="retro-spinner-box" />
          <div className="retro-spinner-box" />
          <div className="retro-spinner-box" />
          <div className="retro-spinner-box" />
        </div>
      </div>
    );
  }

  if (type === 'dots') {
    return (
      <div className={`retro-loader retro-loader-${size}`}>
        <div className="retro-dots">
          Loading
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className={`retro-dot ${i < dotCount ? 'active' : ''}`}>
              .
            </span>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
