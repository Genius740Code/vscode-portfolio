import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { FaTerminal, FaChevronRight, FaWindows, FaGripLines, FaTimes, FaArrowUp, FaArrowDown, FaGithub, FaLinkedin, FaEnvelope, FaPlay, FaWindowMaximize, FaWindowMinimize, FaTrash } from 'react-icons/fa';

interface TerminalProps {
  isOpen?: boolean;
  onFileOpen?: (filename: string) => void;
  onClose?: () => void;
  theme?: string;
}

const commandList = [
  'help', 'about', 'skills', 'projects', 'experience', 'contact', 
  'clear', 'ls', 'open', 'github', 'linkedin', 'email', 'theme'
];

const commands = {
  help: `Available commands:
  help       - Show this help message
  about      - Learn more about me
  skills     - View my skills
  projects   - See my projects
  experience - View my work experience
  contact    - Get my contact information
  open [file]- Open a file (e.g., open about.tsx)
  ls         - List available files
  github     - Open my GitHub profile
  linkedin   - Open my LinkedIn profile
  email      - Send me an email
  theme      - Change the theme (light/dark/default)
  clear      - Clear the terminal`,
  
  about: `I'm a passionate developer who loves creating beautiful and functional web applications.
I specialize in modern web technologies and enjoy building intuitive user experiences.`,
  
  skills: `Frontend: React, Next.js, TypeScript, TailwindCSS
Backend: Node.js, Python, SQL, MongoDB
Tools: Git, Docker, AWS, VS Code`,
  
  projects: `1. E-Commerce Platform - React, Node.js, MongoDB
2. Task Management System - Next.js, TypeScript, PostgreSQL
3. Personal Finance Tracker - React, Firebase, Chart.js

Type 'open projects.tsx' to see more details.`,
  
  experience: `Senior Frontend Developer at Tech Innovators Inc. (2021 - Present)
Full Stack Developer at Digital Solutions Ltd. (2018 - 2020)
Junior Web Developer at StartUp Ventures (2016 - 2018)

Type 'open experience.tsx' to see more details.`,
  
  contact: `Email: john.doe@example.com
GitHub: github.com/johndoe
LinkedIn: linkedin.com/in/johndoe

Type 'email' to compose an email or 'open contact.tsx' for the contact form.`,

  ls: `Available files:
- bot.js
- about.tsx
- skills.tsx
- projects.tsx
- experience.tsx
- contact.tsx
- package.json
- .env
- .gitignore`,

  theme: `Available themes:
- light
- dark
- default

Usage: theme [theme-name]
Example: theme dark`
};

// Memoize terminal line to prevent unnecessary re-renders
const TerminalLine = React.memo(({ line }: { line: string }) => {
  if (line.startsWith('$')) {
    return (
      <div className="flex items-center">
        <FaChevronRight className="text-green-500 mr-2" size={10} />
        <span className="text-green-500">{line.slice(2)}</span>
      </div>
    );
  }
  return <div className="ml-4 text-vscode-text">{line}</div>;
});

TerminalLine.displayName = 'TerminalLine';

const initialHistory = [
  'Welcome to PowerShell! Type "help" to see available commands.',
  'PS C:\\Users\\user> '
];

const Terminal: React.FC<TerminalProps> = ({ isOpen = true, onFileOpen, onClose, theme = 'dark' }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState(initialHistory);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [height, setHeight] = useState(200);
  const [isResizing, setIsResizing] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(200);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const MIN_HEIGHT = 120;
  const MAX_HEIGHT = 500;

  // Scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
    
    // Focus input when terminal is shown
    inputRef.current?.focus();
  }, [history]);

  // Handle command execution
  const handleCommand = useCallback((command: string) => {
    if (!command.trim()) return;
    
    // Add command to history
    const newHistory = [...history, `$ ${command}`];
    
    // Add to command history for up/down navigation
    setCommandHistory(prev => [command, ...prev]);
    setHistoryIndex(-1);
    
    // Process command
    const cmd = command.toLowerCase().trim();
    const args = cmd.split(' ');
    
    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }
    
    // Handle open command
    if (args[0] === 'open' && args.length > 1) {
      const filename = args[1];
      const validFiles = [
        'bot.js', 'about.tsx', 'skills.tsx', 'projects.tsx', 
        'experience.tsx', 'contact.tsx', 'package.json'
      ];
      
      if (validFiles.includes(filename)) {
        newHistory.push(`Opening ${filename}...`);
        onFileOpen?.(filename);
      } else {
        newHistory.push(`File not found: ${filename}`);
      }
      setHistory(newHistory);
      setInput('');
      return;
    }
    
    // Handle theme command
    if (args[0] === 'theme') {
      if (args.length === 1) {
        newHistory.push(commands.theme);
      } else {
        const theme = args[1].toLowerCase();
        if (['light', 'dark', 'default'].includes(theme)) {
          newHistory.push(`Switching to ${theme} theme...`);
          
          // Apply theme changes to the document
          const htmlElement = document.documentElement;
          htmlElement.classList.remove('theme-dark', 'theme-light', 'theme-high-contrast');
          
          const themeName = theme === 'default' ? 'dark' : theme;
          htmlElement.classList.add(`theme-${themeName}`);
          
          // Store theme preference in localStorage
          localStorage.setItem('theme', themeName);
          
          newHistory.push(`Theme changed to ${theme}.`);
        } else {
          newHistory.push(`Unknown theme: ${theme}. Available themes: light, dark, default`);
        }
      }
      setHistory(newHistory);
      setInput('');
      return;
    }
    
    // Handle external links
    if (cmd === 'github') {
      newHistory.push('Opening GitHub profile...');
      window.open('https://github.com/johndoe', '_blank');
      setHistory(newHistory);
      setInput('');
      return;
    }
    
    if (cmd === 'linkedin') {
      newHistory.push('Opening LinkedIn profile...');
      window.open('https://linkedin.com/in/johndoe', '_blank');
      setHistory(newHistory);
      setInput('');
      return;
    }
    
    if (cmd === 'email') {
      newHistory.push('Opening email client...');
      window.open('mailto:john.doe@example.com', '_blank');
      setHistory(newHistory);
      setInput('');
      return;
    }

    // Handle regular commands
    const response = commands[cmd as keyof typeof commands];
    if (response) {
      newHistory.push(response);
    } else {
      newHistory.push(`Command not found: ${command}. Type 'help' for available commands.`);
    }
    
    setHistory(newHistory);
    setInput('');
  }, [history, onFileOpen]);

  // Handle keyboard input
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-complete functionality
      const inputCmd = input.toLowerCase();
      const matchingCommand = commandList.find(cmd => cmd.startsWith(inputCmd));
      if (matchingCommand) {
        setInput(matchingCommand);
      }
    }
  }, [input, handleCommand, commandHistory, historyIndex]);

  // Handle input change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  // Handle terminal resizing
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Use document-level event handlers for more reliable dragging
    const startY = e.clientY;
    const startHeight = height;
    
    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = startY - e.clientY;
      const newHeight = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, startHeight + deltaY));
      setHeight(newHeight);
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Memoize the entire history to prevent re-renders
  const historyLines = useMemo(() => 
    history.map((line, index) => (
      <TerminalLine key={`line-${index}`} line={line} />
    )),
    [history]
  );

  if (!isOpen) return null;

  return (
    <div 
      className="flex flex-col bg-vscode-bg border-t border-vscode-border relative"
      style={{ height: `${height}px` }}
    >
      <div 
        className="resize-handle h-6 w-full cursor-ns-resize flex justify-center items-center bg-vscode-bg hover:bg-vscode-active transition-colors"
        onMouseDown={handleResizeStart}
      >
        <FaGripLines size={14} className="text-vscode-active" />
      </div>
      <div className="flex items-center px-4 py-1 border-b border-vscode-border bg-vscode-sidebar">
        <div className="flex items-center">
          <FaWindows className="text-vscode-inactive mr-1" size={10} />
          <FaTerminal className="text-vscode-inactive mr-2" size={12} />
          <span className="text-xs font-medium text-vscode-inactive">TERMINAL - PowerShell</span>
        </div>
        <div className="flex ml-auto items-center space-x-2 text-vscode-inactive">
          <button 
            className="text-vscode-inactive hover:text-white transition-colors"
            onClick={() => setHeight(MIN_HEIGHT)}
          >
            <FaWindowMinimize size={12} />
          </button>
          <button 
            className="text-vscode-inactive hover:text-white transition-colors"
            onClick={() => setHeight(MAX_HEIGHT)}
          >
            <FaWindowMaximize size={12} />
          </button>
          {onClose && (
            <button 
              className="text-vscode-inactive hover:text-white transition-colors"
              onClick={onClose}
            >
              <FaTimes size={12} />
            </button>
          )}
        </div>
      </div>
      <div 
        ref={terminalRef}
        className="flex-1 p-2 font-mono text-xs overflow-auto bg-black"
      >
        <div className="text-green-400 mb-2">Welcome to VS Code Portfolio Terminal</div>
        <div className="text-vscode-inactive mb-2">Type 'help' to see available commands</div>
        {historyLines}
        <div className="flex items-center">
          <FaChevronRight className="text-green-500 mr-2" size={10} />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className="flex-1 bg-transparent border-none outline-none text-vscode-text text-xs"
            placeholder="Type a command..."
            autoFocus
          />
        </div>
      </div>
      <div className="p-1 text-xs text-center text-vscode-inactive border-t border-vscode-border bg-vscode-sidebar">
        Type 'help' for commands
      </div>
    </div>
  );
};

Terminal.displayName = 'Terminal';

export default Terminal; 