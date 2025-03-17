import React, { useMemo, memo } from 'react';
import { FaTimes, FaJs, FaReact, FaHtml5, FaCss3, FaRegFileCode } from 'react-icons/fa';

interface TabsProps {
  openFiles: string[];
  activeFile: string;
  onTabClick: (filename: string) => void;
  onTabClose: (filename: string) => void;
}

// Memoized file icon component
const FileIcon = memo(({ filename }: { filename: string }) => {
  const icon = useMemo(() => {
    if (filename.endsWith('.js') || filename.endsWith('.jsx')) {
      return <FaJs className="text-yellow-400" size={14} />;
    } else if (filename.endsWith('.tsx') || filename.endsWith('.ts')) {
      return <FaReact className="text-blue-400" size={14} />;
    } else if (filename.endsWith('.html')) {
      return <FaHtml5 className="text-orange-500" size={14} />;
    } else if (filename.endsWith('.css')) {
      return <FaCss3 className="text-blue-500" size={14} />;
    }
    return <FaRegFileCode className="text-yellow-400" size={14} />;
  }, [filename]);

  return icon;
});

// Memoized tab item component
const TabItem = memo(({ 
  file, 
  isActive, 
  onClick, 
  onClose 
}: { 
  file: string; 
  isActive: boolean; 
  onClick: () => void; 
  onClose: (e: React.MouseEvent) => void;
}) => (
  <div
    className={`flex items-center px-2 sm:px-3 py-1 border-r border-vscode-border ${
      isActive ? 'bg-vscode-bg-lighter' : 'bg-vscode-bg'
    } cursor-pointer group min-w-fit`}
    onClick={onClick}
  >
    <div className="flex items-center space-x-1 sm:space-x-2">
      <FileIcon filename={file} />
      <span className={`text-xs ${isActive ? 'text-white' : 'text-vscode-inactive'} hidden sm:inline`}>
        {file}
      </span>
      <span className={`text-xs ${isActive ? 'text-white' : 'text-vscode-inactive'} sm:hidden`}>
        {file.split('.')[0]}
      </span>
    </div>
    <button
      className="ml-1 sm:ml-2 p-0.5 opacity-0 group-hover:opacity-100 hover:bg-vscode-sidebar-item rounded"
      onClick={onClose}
    >
      <FaTimes size={10} className="text-vscode-inactive" />
    </button>
  </div>
));

const Tabs: React.FC<TabsProps> = memo(({ openFiles, activeFile, onTabClick, onTabClose }) => {
  if (openFiles.length === 0) {
    return <div className="border-b border-vscode-border h-9"></div>;
  }

  const handleTabClose = (file: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onTabClose(file);
  };

  return (
    <div className="flex border-b border-vscode-border h-9 bg-vscode-bg overflow-x-auto">
      {openFiles.map((file) => (
        <TabItem
          key={file}
          file={file}
          isActive={activeFile === file}
          onClick={() => onTabClick(file)}
          onClose={handleTabClose(file)}
        />
      ))}
    </div>
  );
});

export default Tabs; 