import React, { memo } from 'react';
import { FaCog, FaTerminal, FaCheck, FaTimesCircle, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';

interface StatusBarProps {
  currentTheme?: string;
  onTerminalToggle?: () => void;
}

// Memoized status item component
const StatusItem = memo(({ 
  icon: Icon, 
  text, 
  color = 'text-vscode-inactive',
  onClick 
}: { 
  icon: React.ElementType;
  text: string;
  color?: string;
  onClick?: () => void;
}) => (
  <div 
    className={`flex items-center ${onClick ? 'cursor-pointer hover:text-white transition-colors' : ''}`}
    onClick={onClick}
  >
    <Icon className={`mr-1 ${color}`} size={10} />
    <span className={`hidden sm:inline ${color}`}>{text}</span>
  </div>
));

const StatusBar: React.FC<StatusBarProps> = memo(({ currentTheme = 'dark', onTerminalToggle }) => {
  const formattedTheme = currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1);
  
  return (
    <div className="flex items-center justify-between bg-vscode-sidebar border-t border-vscode-border px-2 sm:px-3 py-1 text-xs text-vscode-inactive">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <StatusItem 
          icon={FaCheck} 
          text="0 Errors" 
          color="text-green-500" 
        />
        <StatusItem 
          icon={FaExclamationTriangle} 
          text="0 Warnings" 
          color="text-yellow-500" 
        />
        <StatusItem 
          icon={FaInfoCircle} 
          text="Ln 1, Col 1" 
        />
      </div>
      
      <div className="flex items-center space-x-2 sm:space-x-3">
        <StatusItem 
          icon={FaInfoCircle} 
          text="UTF-8" 
        />
        <StatusItem 
          icon={FaInfoCircle} 
          text="TypeScript React" 
        />
        <StatusItem 
          icon={FaCog} 
          text={`${formattedTheme} Theme`} 
        />
        {onTerminalToggle && (
          <StatusItem 
            icon={FaTerminal} 
            text="Terminal" 
            onClick={onTerminalToggle}
          />
        )}
        <StatusItem 
          icon={FaInfoCircle} 
          text="VS Code Portfolio" 
        />
      </div>
    </div>
  );
});

export default StatusBar; 