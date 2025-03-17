'use client';

import React, { useState, useEffect } from 'react';
import MenuBar from '@/components/MenuBar';
import Sidebar from '@/components/Sidebar';
import Tabs from '@/components/Tabs';
import Editor from '@/components/Editor';
import Terminal from '@/components/Terminal';
import StatusBar from '@/components/StatusBar';

// Custom ErrorBoundary class component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-vscode-bg text-white p-4">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h2>
          <p className="mb-4 text-center max-w-xl">
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function Home() {
  const [activeView, setActiveView] = useState('explorer');
  const [openFiles, setOpenFiles] = useState<string[]>([]);
  const [activeFile, setActiveFile] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [showTerminal, setShowTerminal] = useState(true);
  const [terminalHeight, setTerminalHeight] = useState(200);

  useEffect(() => {
    // Simulate loading of the application
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Open about.tsx by default
      handleFileClick('about.tsx');
    }, 1000);
    
    // Get saved theme from localStorage or use default
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    // Apply theme to document
    document.documentElement.className = savedTheme;
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }

    return () => clearTimeout(timer);
  }, []);

  const handleFileClick = (filename: string) => {
    if (!openFiles.includes(filename)) {
      setOpenFiles([...openFiles, filename]);
    }
    setActiveFile(filename);
  };

  const handleFileClose = (filename: string) => {
    const newOpenFiles = openFiles.filter(file => file !== filename);
    setOpenFiles(newOpenFiles);
    
    if (activeFile === filename) {
      setActiveFile(newOpenFiles.length > 0 ? newOpenFiles[newOpenFiles.length - 1] : '');
    }
  };

  const toggleTerminal = () => {
    setShowTerminal(!showTerminal);
  };
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme;
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-vscode-bg">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vscode-active mb-4"></div>
          <p className="text-vscode-text">Loading VS Code Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className={`h-screen flex flex-col ${theme === 'dark' ? 'dark' : 'light'}`}>
        <MenuBar 
          onFileOpen={handleFileClick} 
          onToggleTerminal={toggleTerminal}
          onThemeChange={toggleTheme}
        />
        
        <div className="flex flex-1 overflow-hidden">
          <Sidebar 
            activeView={activeView} 
            onViewChange={setActiveView}
            onFileClick={handleFileClick}
            activeFile={activeFile}
            theme={theme}
            onThemeChange={toggleTheme}
          />
          
          <div className="flex flex-col flex-1 overflow-hidden min-w-0">
            <Tabs 
              openFiles={openFiles} 
              activeFile={activeFile} 
              onTabClick={setActiveFile} 
              onTabClose={handleFileClose}
            />
            
            <div className="flex-1 overflow-hidden">
              <Editor activeFile={activeFile} theme={theme} startingLineNumber={1} />
            </div>
            
            {showTerminal && (
              <Terminal 
                isOpen={showTerminal}
                onClose={() => setShowTerminal(false)}
                height={terminalHeight}
              />
            )}
          </div>
        </div>
        
        <StatusBar 
          currentTheme={theme}
          onTerminalToggle={toggleTerminal}
          showTerminal={showTerminal}
        />
      </div>
    </ErrorBoundary>
  );
} 