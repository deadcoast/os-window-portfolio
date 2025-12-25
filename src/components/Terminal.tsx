import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

const commands: Record<string, (args: string[]) => string> = {
  help: () => `Available commands:
  help       - Show this help message
  about      - Learn about me
  skills     - Display technical skills
  projects   - List featured projects
  contact    - Get contact information
  experience - View work experience
  clear      - Clear terminal
  theme      - List available themes`,

  about: () => `Full-Stack Developer specializing in React, TypeScript, and modern web technologies.
Passionate about creating elegant solutions to complex problems with a focus on
performance and user experience.`,

  skills: () => `Frontend:  React, TypeScript, Next.js, Tailwind CSS
Backend:   Node.js, Python, PostgreSQL, Redis
Tools:     Git, Docker, Kubernetes, CI/CD, AWS
Concepts:  REST APIs, WebSocket, Microservices, Testing`,

  projects: () => `1. Real-time Collaboration Platform
   Technologies: React, WebSocket, Node.js, Redis

2. E-commerce Analytics Dashboard
   Technologies: TypeScript, PostgreSQL, D3.js, Docker

3. API Gateway Service
   Technologies: Go, gRPC, Kubernetes, AWS`,

  contact: () => `Email:    dev@portfolio.com
GitHub:   github.com/yourhandle
LinkedIn: linkedin.com/in/yourprofile
Twitter:  @yourhandle`,

  experience: () => `Senior Full-Stack Developer @ Tech Innovations Inc. (2022 - Present)
• Led development of cloud-native applications serving 500K+ users
• Mentored team of 5 developers

Full-Stack Developer @ Startup Solutions LLC (2020 - 2022)
• Built and launched 3 MVPs from concept to production
• Scaled platform to 100K+ concurrent users`,

  clear: () => '__CLEAR__',

  theme: () => 'Available themes: dark, ocean, forest, sunset, monochrome',
};

export function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to the interactive terminal. Type "help" for available commands.' },
    { type: 'output', content: '' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setTheme } = useTheme();

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const [command, ...args] = trimmed.toLowerCase().split(' ');

    setLines(prev => [...prev, { type: 'input', content: `$ ${trimmed}` }]);

    if (commands[command]) {
      const output = commands[command](args);

      if (output === '__CLEAR__') {
        setLines([]);
      } else {
        setLines(prev => [...prev, { type: 'output', content: output }]);
      }
    } else {
      setLines(prev => [
        ...prev,
        { type: 'error', content: `Command not found: ${command}. Type 'help' for available commands.` },
      ]);
    }

    setHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  return (
    <div className="terminal-container" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-header">
        <div className="terminal-dots">
          <div className="terminal-dot"></div>
          <div className="terminal-dot"></div>
          <div className="terminal-dot"></div>
        </div>
        <div className="terminal-title">terminal</div>
      </div>
      <div ref={terminalRef} className="terminal-body">
        {lines.map((line, idx) => (
          <div key={idx} className={`terminal-line terminal-${line.type}`}>
            {line.content}
          </div>
        ))}
        <div className="terminal-input-line">
          <span className="terminal-prompt">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            autoFocus
            spellCheck={false}
          />
          <span className="terminal-cursor"></span>
        </div>
      </div>
    </div>
  );
}
