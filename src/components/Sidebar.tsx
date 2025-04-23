import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { 
  FaFile, FaFolder, FaChevronRight, FaChevronDown, 
  FaSearch, FaCode, FaSourcetree, FaBoxOpen, 
  FaRegFileCode, FaJs, FaUser, FaPalette, FaHammer, FaEnvelope,
  FaEllipsisH, FaAward, FaCog, FaMedal, FaTrophy,
  FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaTimes, FaRocket, FaCertificate, FaPlus, FaGripLines
} from 'react-icons/fa';
import { VscFiles, VscSearch, VscSourceControl, VscPerson, VscGear } from 'react-icons/vsc';

interface SidebarIconProps {
  Icon: React.ElementType;
  active?: boolean;
  onClick?: () => void;
  tooltip?: string;
}

const SidebarIcon: React.FC<SidebarIconProps> = React.memo(({ Icon, active = false, onClick, tooltip }) => {
  return (
    <div 
      className={`p-3 hover:bg-vscode-sidebar-item cursor-pointer relative ${active ? 'text-white border-l-2 border-vscode-active' : 'text-vscode-inactive'}`}
      onClick={onClick}
    >
      <Icon size={22} />
      {tooltip && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-vscode-bg border border-vscode-border rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity hidden group-hover:block">
          {tooltip}
        </div>
      )}
    </div>
  );
});

SidebarIcon.displayName = 'SidebarIcon';

interface SidebarExplorerItemProps {
  name: string;
  isFile?: boolean;
  active?: boolean;
  onClick?: () => void;
  isFolder?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  indent?: number;
  icon?: React.ElementType;
  iconColor?: string;
}

const SidebarExplorerItem: React.FC<SidebarExplorerItemProps> = React.memo(({ 
  name, 
  isFile = true, 
  active = false,
  onClick,
  isFolder = false,
  isOpen = false,
  onToggle,
  indent = 0,
  icon: CustomIcon,
  iconColor = "text-vscode-inactive"
}) => {
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle?.();
  };

  const Icon = CustomIcon || (isFile ? FaRegFileCode : FaFolder);

  return (
    <div 
      className="flex items-center group"
      style={{ paddingLeft: `${indent * 8}px` }}
    >
      {isFolder && (
        <button 
          className="w-4 h-4 flex items-center justify-center text-vscode-inactive hover:text-white"
          onClick={handleToggle}
        >
          {isOpen ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
        </button>
      )}
      <div 
        className={`flex items-center py-1 px-2 text-xs flex-1 
          ${active ? 'vscode-sidebar-item-active' : 'vscode-sidebar-item'}`}
        onClick={onClick}
      >
        <Icon className={`mr-2 ${iconColor}`} size={14} />
        <span>{name}</span>
      </div>
    </div>
  );
});

SidebarExplorerItem.displayName = 'SidebarExplorerItem';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  activeFile: string;
  onFileClick: (file: string) => void;
  theme?: string;
  onThemeChange?: (theme: string) => void;
}

const sidebarItems = [
  { id: 'explorer', icon: VscFiles, label: 'Explorer', tooltip: 'Explorer (Ctrl+Shift+E)' },
  { id: 'git', icon: VscSourceControl, label: 'Timeline', tooltip: 'Timeline (Ctrl+Shift+G)' },
  { id: 'achievements', icon: FaAward, label: 'Achievements', tooltip: 'Achievements' },
  { id: 'contact', icon: VscPerson, label: 'Contact', tooltip: 'Contact' },
  { id: 'settings', icon: VscGear, label: 'Settings', tooltip: 'Settings (Ctrl+,)' }
];

const portfolioFiles = [
  { name: 'about.tsx', isFile: true, icon: FaUser, iconColor: 'text-blue-500' },
  { name: 'skills.tsx', isFile: true, icon: FaCode, iconColor: 'text-green-500' },
  { name: 'projects.tsx', isFile: true, icon: FaPalette, iconColor: 'text-purple-500' },
  { name: 'experience.tsx', isFile: true, icon: FaHammer, iconColor: 'text-orange-500' },
  { name: 'contact.tsx', isFile: true, icon: FaEnvelope, iconColor: 'text-pink-500' }
];

const achievements = [
  { 
    title: 'Frontend Master', 
    description: 'Built 10+ responsive web applications using modern frameworks', 
    date: '2023', 
    icon: FaTrophy, 
    iconColor: 'text-yellow-400' 
  },
  { 
    title: 'Database Expert', 
    description: 'Designed efficient schema for high-traffic applications', 
    date: '2022', 
    icon: FaMedal, 
    iconColor: 'text-blue-400' 
  },
  { 
    title: 'Problem Solver', 
    description: 'Resolved critical bugs in production environment', 
    date: '2022', 
    icon: FaAward, 
    iconColor: 'text-green-400' 
  },
  { 
    title: 'Team Leader', 
    description: 'Led a team of 5 developers to deliver project ahead of schedule', 
    date: '2021', 
    icon: FaTrophy, 
    iconColor: 'text-purple-400' 
  }
];

const timelineEvents = [
  { 
    title: 'Graduated with Computer Science Degree', 
    date: 'May 2016', 
    description: 'Bachelor of Science in Computer Science with a minor in Mathematics'
  },
  { 
    title: 'Started First Developer Role', 
    date: 'Jun 2016', 
    description: 'Joined StartUp Ventures as a Junior Web Developer'
  },
  { 
    title: 'Promoted to Full Stack Developer', 
    date: 'Mar 2018', 
    description: 'Joined Digital Solutions Ltd. working on enterprise applications'
  },
  { 
    title: 'Moved to Senior Role', 
    date: 'Jan 2021', 
    description: 'Joined Tech Innovators Inc. as Senior Frontend Developer'
  },
  { 
    title: 'Started Teaching Coding', 
    date: 'Sep 2022', 
    description: 'Began mentoring junior developers and teaching online courses'
  }
];

const Sidebar: React.FC<SidebarProps> = React.memo(({ 
  activeView, 
  onViewChange, 
  activeFile, 
  onFileClick,
  theme = 'dark',
  onThemeChange
}) => {
  const [isPortfolioOpen, setIsPortfolioOpen] = React.useState(true);
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const [width, setWidth] = useState(250);
  const [fontSize, setFontSize] = useState(14);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const MIN_WIDTH = 200;
  const MAX_WIDTH = 400;

  const sidebarIcons = useMemo(() => 
    sidebarItems.map(({ id, icon: Icon, label, tooltip }) => (
      <SidebarIcon 
        key={id}
        Icon={Icon}
        active={activeView === id}
        onClick={() => onViewChange(id)}
        tooltip={tooltip}
      />
    )),
    [activeView, onViewChange]
  );

  const portfolioFilesList = useMemo(() => 
    portfolioFiles.map((item) => (
      <SidebarExplorerItem 
        key={item.name}
        name={item.name}
        isFile={item.isFile}
        active={activeFile === item.name}
        icon={item.icon}
        iconColor={item.iconColor}
        onClick={() => item.isFile && onFileClick(item.name)}
      />
    )),
    [activeFile, onFileClick]
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setSelectedTheme(savedTheme);
    
    // Load saved font size
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize));
      document.documentElement.style.fontSize = `${savedFontSize}px`;
    }
  }, []);
  
  const handleThemeChange = (newTheme: string) => {
    setSelectedTheme(newTheme);
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
    
    // Update document classes
    document.documentElement.className = newTheme;
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
  };
  
  const handleFontSizeChange = (newSize: number) => {
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
    localStorage.setItem('fontSize', newSize.toString());
  };

  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
    setStartWidth(width);
    
    // Add event listeners
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
    
    // Add a class to indicate dragging to change cursor globally
    document.body.classList.add('sidebar-resizing');
  };

  const handleDrag = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const newWidth = Math.max(
      MIN_WIDTH,
      Math.min(MAX_WIDTH, startWidth + e.clientX - startX)
    );
    setWidth(newWidth);
  }, [isDragging, startWidth, startX]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
    document.body.classList.remove('sidebar-resizing');
    
    // Save sidebar width to localStorage for persistence
    localStorage.setItem('sidebarWidth', width.toString());
  }, [handleDrag, width]);

  // Load saved width on component mount
  useEffect(() => {
    const savedWidth = localStorage.getItem('sidebarWidth');
    if (savedWidth) {
      setWidth(Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, parseInt(savedWidth))));
    }
    
    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
    };
  }, [handleDrag, handleDragEnd]);

  const renderExplorerView = () => (
    <div 
      ref={sidebarRef}
      className="flex flex-col bg-vscode-sidebar border-r border-vscode-border"
      style={{ width: `${width}px` }}
    >
      <div 
        className="flex items-center justify-between p-2 border-b border-vscode-border cursor-move"
        onMouseDown={handleDragStart}
      >
        <div className="flex items-center">
          <FaFolder className="text-vscode-inactive mr-2" />
          <span className="text-xs text-vscode-inactive">EXPLORER</span>
        </div>
        <div className="flex items-center">
          <FaGripLines className="text-vscode-inactive mr-2" size={10} />
          <button 
            onClick={() => onFileClick('')}
            className="text-vscode-inactive hover:text-white p-1"
          >
            <FaPlus size={12} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        {portfolioFilesList}
      </div>
    </div>
  );

  const renderGitView = () => (
    <div className="w-64 bg-vscode-sidebar border-r border-vscode-border overflow-y-auto">
      <div className="p-2 text-xs text-vscode-inactive">
        <h3 className="font-semibold mb-2">LIFE TIMELINE</h3>
        <div className="space-y-4">
          {timelineEvents.slice().reverse().map((event, index) => (
            <div key={index} className="border-l-2 border-vscode-active pl-3 relative ml-2">
              <div className="absolute w-2 h-2 bg-vscode-active rounded-full -left-[5px] top-1"></div>
              <div className="text-sm font-medium text-white">{event.title}</div>
              <div className="text-xs text-vscode-active mb-1">{event.date}</div>
              <div className="text-xs">{event.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAchievementsView = () => (
    <div className="w-64 bg-vscode-sidebar border-r border-vscode-border overflow-y-auto">
      <div className="p-2 text-xs text-vscode-inactive">
        <h3 className="font-semibold mb-2">ACHIEVEMENTS</h3>
        <div className="space-y-3">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div key={index} className="p-2 border border-vscode-border rounded bg-vscode-bg/30 hover:bg-vscode-bg/50">
                <div className="flex items-center mb-1">
                  <Icon className={`mr-2 ${achievement.iconColor}`} size={14} />
                  <div className="font-medium text-white">{achievement.title}</div>
                </div>
                <div className="text-xs mb-1">{achievement.description}</div>
                <div className="text-xs text-vscode-active">{achievement.date}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderContactView = () => (
    <div className="w-full sm:w-64 bg-vscode-sidebar border-r border-vscode-border overflow-y-auto">
      <div className="p-2 text-xs text-vscode-inactive">
        <h3 className="font-semibold mb-4">CONTACT INFORMATION</h3>
        <div className="space-y-4 p-2">
          <div className="flex items-center mb-2">
            <FaUser className="text-vscode-blue mr-2" size={14} />
            <span className="text-sm text-white">John Doe</span>
          </div>
          
          <div className="p-3 bg-vscode-bg/30 rounded border border-vscode-border">
            <div className="font-medium mb-2 text-vscode-active">Email</div>
            <a href="mailto:john.doe@example.com" className="text-vscode-text hover:underline flex items-center">
              <FaEnvelope className="mr-2" size={12} />
              <span className="break-all">john.doe@example.com</span>
            </a>
          </div>
          
          <div className="p-3 bg-vscode-bg/30 rounded border border-vscode-border">
            <div className="font-medium mb-2 text-vscode-active">Social Links</div>
            <div className="space-y-2">
              <a href="https://linkedin.com/in/johndoe" className="text-vscode-text hover:underline flex items-center">
                <FaLinkedin className="mr-2" size={12} />
                <span className="break-all">linkedin.com/in/johndoe</span>
              </a>
              <a href="https://github.com/johndoe" className="text-vscode-text hover:underline flex items-center">
                <FaGithub className="mr-2" size={12} />
                <span className="break-all">github.com/johndoe</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsView = () => {
    const themes = [
      { id: 'dark', name: 'VS Code Dark' },
      { id: 'light', name: 'VS Code Light' },
      { id: 'github-dark', name: 'GitHub Dark' },
      { id: 'github-light', name: 'GitHub Light' }
    ];
    
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Settings</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-2">Theme</h3>
            <div className="space-y-2">
              {themes.map(themeOption => (
                <label 
                  key={themeOption.id}
                  className="flex items-center space-x-2 text-sm cursor-pointer"
                >
                  <input 
                    type="radio" 
                    checked={selectedTheme === themeOption.id}
                    onChange={() => handleThemeChange(themeOption.id)}
                    className="form-radio text-vscode-active"
                  />
                  <span>{themeOption.name}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-2">Font Size</h3>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handleFontSizeChange(Math.max(12, fontSize - 1))}
                className="w-6 h-6 flex items-center justify-center bg-vscode-button hover:bg-vscode-button-hover text-white rounded"
                disabled={fontSize <= 12}
              >
                -
              </button>
              <span className="text-sm min-w-[30px] text-center">{fontSize}px</span>
              <button 
                onClick={() => handleFontSizeChange(Math.min(20, fontSize + 1))}
                className="w-6 h-6 flex items-center justify-center bg-vscode-button hover:bg-vscode-button-hover text-white rounded"
                disabled={fontSize >= 20}
              >
                +
              </button>
            </div>
            <div className="mt-2">
              <input 
                type="range" 
                min="12" 
                max="20" 
                value={fontSize} 
                onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-2">About</h3>
            <p className="text-xs text-vscode-inactive">
              VS Code Portfolio v1.0.0
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'explorer':
        return renderExplorerView();
      case 'git':
        return renderGitView();
      case 'achievements':
        return renderAchievementsView();
      case 'contact':
        return renderContactView();
      case 'settings':
        return renderSettingsView();
      default:
        return renderExplorerView();
    }
  };

  return (
    <div className="flex h-full">
      <div className="bg-vscode-sidebar-bg text-vscode-sidebar-text h-full">
        {sidebarIcons}
      </div>
      <div 
        ref={sidebarRef}
        className="bg-vscode-sidebar-panel-bg h-full overflow-y-auto"
        style={{ width: `${width}px` }}
      >
        <div className="p-4">
          {renderActiveView()}
        </div>
      </div>
      <div
        className="w-1 h-full cursor-ew-resize hover:bg-vscode-active relative group"
        onMouseDown={handleDragStart}
      >
        <div className="absolute w-1 h-full bg-transparent hover:bg-vscode-active group-hover:w-3 group-hover:-left-1 transition-all duration-100"></div>
        {isDragging && <div className="fixed inset-0 z-50 cursor-ew-resize" />}
      </div>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar; 