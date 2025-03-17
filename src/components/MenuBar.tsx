import React, { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaSearch, FaRegWindowMinimize, FaRegSquare, FaTimes, FaCog, FaChevronDown, FaTerminal, FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaEnvelope } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';

interface MenuBarProps {
  onFileOpen?: (filename: string) => void;
  onToggleSearch?: () => void;
  onToggleTerminal?: () => void;
  onThemeChange?: (theme: string) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ onFileOpen, onToggleSearch, onToggleTerminal, onThemeChange }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.menu-button') && !target.closest('.menu-dropdown')) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleMenu = (menu: string) => {
    if (activeMenu === menu) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
    }
  };

  const handleFileClick = (filename: string) => {
    if (onFileOpen) {
      onFileOpen(filename);
      setActiveMenu(null);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
    setSearchQuery('');
  };

  const handleThemeChange = (theme: string) => {
    onThemeChange?.(theme);
    setActiveMenu(null);
  };

  const MenuDropdown = ({ menu, children }: { menu: string, children: React.ReactNode }) => {
    if (activeMenu !== menu) return null;
    
    return (
      <div className="absolute top-full left-0 mt-1 bg-vscode-sidebar border border-vscode-border rounded shadow-lg z-50 min-w-[200px] menu-dropdown">
        <div className="py-1">
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center bg-vscode-bg border-b border-vscode-sidebar text-vscode-text text-sm h-8">
        <div className="flex items-center">
          <div className="w-8 h-8 flex items-center justify-center">
            <VscVscode className="text-blue-500 text-lg" />
          </div>
          <div className="flex items-center space-x-2 pl-2">
            <div className="relative">
              <button 
                className={`px-2 py-1 hover:bg-vscode-sidebar rounded text-xs menu-button ${activeMenu === 'file' ? 'bg-vscode-sidebar' : ''}`}
                onClick={() => toggleMenu('file')}
              >
                File
              </button>
              <MenuDropdown menu="file">
                <button
                  className="w-full text-left px-4 py-1 text-xs hover:bg-vscode-sidebar-item"
                  onClick={() => handleFileClick('about.tsx')}
                >
                  Open About
                </button>
                <button
                  className="w-full text-left px-4 py-1 text-xs hover:bg-vscode-sidebar-item"
                  onClick={() => handleFileClick('skills.tsx')}
                >
                  Open Skills
                </button>
                <button
                  className="w-full text-left px-4 py-1 text-xs hover:bg-vscode-sidebar-item"
                  onClick={() => handleFileClick('projects.tsx')}
                >
                  Open Projects
                </button>
                <button
                  className="w-full text-left px-4 py-1 text-xs hover:bg-vscode-sidebar-item"
                  onClick={() => handleFileClick('experience.tsx')}
                >
                  Open Experience
                </button>
                <button
                  className="w-full text-left px-4 py-1 text-xs hover:bg-vscode-sidebar-item"
                  onClick={() => handleFileClick('contact.tsx')}
                >
                  Open Contact
                </button>
                <div className="border-t border-vscode-border my-1"></div>
                <button
                  className="w-full text-left px-4 py-1 text-xs hover:bg-vscode-sidebar-item"
                  onClick={() => window.location.reload()}
                >
                  Reload Window
                </button>
              </MenuDropdown>
            </div>
            
            <div className="relative">
              <button 
                className={`px-2 py-1 hover:bg-vscode-sidebar rounded text-xs menu-button ${activeMenu === 'edit' ? 'bg-vscode-sidebar' : ''}`}
                onClick={() => toggleMenu('edit')}
              >
                Edit
              </button>
              <MenuDropdown menu="edit">
                <button
                  className="w-full text-left px-4 py-1 text-xs hover:bg-vscode-sidebar-item"
                  onClick={onToggleSearch}
                >
                  Find in File
                </button>
                <button className="w-full text-left px-4 py-1 text-xs hover:bg-vscode-sidebar-item opacity-50">
                  Cut
                  <span className="float-right text-vscode-inactive">Ctrl+X</span>
                </button>
                <button className="w-full text-left px-4 py-1 text-xs hover:bg-vscode-sidebar-item opacity-50">
                  Copy
                  <span className="float-right text-vscode-inactive">Ctrl+C</span>
                </button>
                <button className="w-full text-left px-4 py-1 text-xs hover:bg-vscode-sidebar-item opacity-50">
                  Paste
                  <span className="float-right text-vscode-inactive">Ctrl+V</span>
                </button>
              </MenuDropdown>
            </div>
            
            <div className="relative">
              <button 
                className={`px-2 py-1 hover:bg-vscode-sidebar rounded text-xs menu-button ${activeMenu === 'view' ? 'bg-vscode-sidebar' : ''}`}
                onClick={() => toggleMenu('view')}
              >
                View
              </button>
              <MenuDropdown menu="view">
                <button 
                  className="w-full text-left px-4 py-1 text-xs hover:bg-vscode-sidebar-item"
                  onClick={onToggleTerminal}
                >
                  Toggle Terminal
                  <span className="float-right text-vscode-inactive">Ctrl+`</span>
                </button>
                <button className="w-full text-left px-4 py-1 text-xs hover:bg-vscode-sidebar-item">
                  Toggle Sidebar
                </button>
                <button className="w-full text-left px-4 py-1 text-xs hover:bg-vscode-sidebar-item">
                  Zoom In
                </button>
                <button className="w-full text-left px-4 py-1 text-xs hover:bg-vscode-sidebar-item">
                  Zoom Out
                </button>
              </MenuDropdown>
            </div>
            
            <div className="relative">
              <button 
                className={`px-2 py-1 hover:bg-vscode-sidebar rounded text-xs menu-button ${activeMenu === 'terminal' ? 'bg-vscode-sidebar' : ''}`}
                onClick={() => toggleMenu('terminal')}
              >
                Terminal
              </button>
              <MenuDropdown menu="terminal">
                <button
                  onClick={onToggleTerminal}
                  className="w-full text-left px-3 py-1 hover:bg-vscode-sidebar-item"
                >
                  New Terminal
                </button>
                <button
                  className="w-full text-left px-3 py-1 hover:bg-vscode-sidebar-item"
                >
                  Split Terminal
                </button>
              </MenuDropdown>
            </div>
            
            <div className="relative">
              <button 
                className={`px-2 py-1 hover:bg-vscode-sidebar rounded text-xs menu-button ${activeMenu === 'info' ? 'bg-vscode-sidebar' : ''}`}
                onClick={() => toggleMenu('info')}
              >
                Info
              </button>
              <MenuDropdown menu="info">
                <a 
                  href="https://github.com/johndoe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center w-full text-left px-4 py-1 text-xs hover:bg-vscode-sidebar-item"
                >
                  <FaGithub className="mr-2" size={14} />
                  GitHub
                </a>
                <a 
                  href="https://linkedin.com/in/johndoe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center w-full text-left px-4 py-1 text-xs hover:bg-vscode-sidebar-item"
                >
                  <FaLinkedin className="mr-2" size={14} />
                  LinkedIn
                </a>
                <a 
                  href="https://twitter.com/johndoe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center w-full text-left px-4 py-1 text-xs hover:bg-vscode-sidebar-item"
                >
                  <FaTwitter className="mr-2" size={14} />
                  Twitter/X
                </a>
                <a 
                  href="https://facebook.com/johndoe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center w-full text-left px-4 py-1 text-xs hover:bg-vscode-sidebar-item"
                >
                  <FaFacebook className="mr-2" size={14} />
                  Facebook
                </a>
                <a 
                  href="mailto:john.doe@example.com"
                  className="flex items-center w-full text-left px-4 py-1 text-xs hover:bg-vscode-sidebar-item"
                >
                  <FaEnvelope className="mr-2" size={14} />
                  Email
                </a>
              </MenuDropdown>
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center h-full">
          <button 
            className="px-2 h-full hover:bg-vscode-sidebar"
            onClick={onToggleTerminal}
            title="Toggle Terminal"
          >
            <FaTerminal size={14} />
          </button>
          <button className="px-2 h-full hover:bg-vscode-sidebar"><FaRegWindowMinimize size={12} /></button>
          <button className="px-2 h-full hover:bg-vscode-sidebar"><FaRegSquare size={12} /></button>
          <button className="px-2 h-full hover:bg-red-700"><FaTimes size={14} /></button>
        </div>
      </div>
      
      <div className="flex items-center bg-vscode-bg border-b border-vscode-sidebar text-vscode-text text-sm h-8 px-2">
        <button className="w-6 h-6 flex items-center justify-center text-vscode-inactive hover:text-white">
          <FaChevronLeft size={12} />
        </button>
        <button className="w-6 h-6 flex items-center justify-center text-vscode-inactive hover:text-white">
          <FaChevronRight size={12} />
        </button>
        <form className="mx-2 flex-1 relative" onSubmit={handleSearchSubmit}>
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <FaSearch className="text-vscode-inactive" size={10} />
          </div>
          <input 
            type="text" 
            placeholder="Search..."
            className="w-full py-1 pl-7 pr-3 bg-vscode-sidebar border border-vscode-sidebar rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-vscode-active"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
        <button 
          className="w-6 h-6 flex items-center justify-center text-vscode-inactive hover:text-white ml-2"
          onClick={() => toggleMenu('info')}
          title="Settings"
        >
          <FaCog size={14} />
        </button>
      </div>
    </div>
  );
};

export default MenuBar; 