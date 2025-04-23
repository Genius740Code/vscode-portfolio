import React from 'react';
import { portfolioConfig } from '@/config/portfolio';

export default function Skills() {
  const { skills } = portfolioConfig;
  
  return (
    <div className="p-6 font-mono text-sm">
      <div className="text-vscode-comment">// Skills Configuration</div>
      <div className="text-vscode-keyword">const</div> <div className="text-vscode-variable">skillsConfig</div> = [
      {skills.map((skillGroup, index) => (
        <div key={index} className="ml-4">
          {'{'}
          <div className="ml-4">
            <div className="text-vscode-property">category</div>: <div className="text-vscode-string">"{skillGroup.category}"</div>,
            <div className="text-vscode-property">items</div>: [
            <div className="ml-4">
              {skillGroup.items.map((skill, skillIndex) => (
                <div key={skillIndex}>
                  <div className="text-vscode-string">"{skill}"</div>
                  {skillIndex < skillGroup.items.length - 1 && ','}
                </div>
              ))}
            </div>
            ]
          </div>
          {'}'}
          {index < skills.length - 1 && ','}
        </div>
      ))}
      ];
      
      <div className="mt-4 text-vscode-comment">// Export the configuration</div>
      <div className="text-vscode-keyword">export default</div> skillsConfig;
    </div>
  );
} 