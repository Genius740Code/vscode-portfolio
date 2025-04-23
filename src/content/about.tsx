import React from 'react';
import { portfolioConfig } from '@/config/portfolio';

export default function About() {
  const { personal } = portfolioConfig;
  
  return (
    <div className="p-6 font-mono text-sm">
      <div className="text-vscode-comment">// Personal Information Configuration</div>
      <div className="text-vscode-keyword">const</div> <div className="text-vscode-variable">personalInfo</div> = {'{'}
      <div className="ml-4">
        <div className="text-vscode-property">name</div>: <div className="text-vscode-string">"{personal.name}"</div>,
        <div className="text-vscode-property">title</div>: <div className="text-vscode-string">"{personal.title}"</div>,
        <div className="text-vscode-property">email</div>: <div className="text-vscode-string">"{personal.email}"</div>,
        <div className="text-vscode-property">location</div>: <div className="text-vscode-string">"{personal.location}"</div>,
        <div className="text-vscode-property">bio</div>: <div className="text-vscode-string">"{personal.bio}"</div>
      </div>
      {'}'};
      
      <div className="mt-4 text-vscode-comment">// Export the configuration</div>
      <div className="text-vscode-keyword">export default</div> personalInfo;
    </div>
  );
} 