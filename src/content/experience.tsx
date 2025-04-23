import React from 'react';
import { portfolioConfig } from '@/config/portfolio';

export default function Experience() {
  const { experience } = portfolioConfig;
  
  return (
    <div className="p-6 font-mono text-sm">
      <div className="text-vscode-comment">// Work Experience Configuration</div>
      <div className="text-vscode-keyword">const</div> <div className="text-vscode-variable">experienceConfig</div> = [
      {experience.map((exp, index) => (
        <div key={exp.id} className="ml-4">
          {'{'}
          <div className="ml-4">
            <div className="text-vscode-property">id</div>: <div className="text-vscode-string">"{exp.id}"</div>,
            <div className="text-vscode-property">company</div>: <div className="text-vscode-string">"{exp.company}"</div>,
            <div className="text-vscode-property">position</div>: <div className="text-vscode-string">"{exp.position}"</div>,
            <div className="text-vscode-property">period</div>: <div className="text-vscode-string">"{exp.period}"</div>,
            <div className="text-vscode-property">description</div>: [
            <div className="ml-4">
              {exp.description.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div className="text-vscode-string">"{item}"</div>
                  {itemIndex < exp.description.length - 1 && ','}
                </div>
              ))}
            </div>
            ],
            <div className="text-vscode-property">technologies</div>: [
            <div className="ml-4">
              {exp.technologies.map((tech, techIndex) => (
                <div key={techIndex}>
                  <div className="text-vscode-string">"{tech}"</div>
                  {techIndex < exp.technologies.length - 1 && ','}
                </div>
              ))}
            </div>
            ]
          </div>
          {'}'}
          {index < experience.length - 1 && ','}
        </div>
      ))}
      ];
      
      <div className="mt-4 text-vscode-comment">// Export the configuration</div>
      <div className="text-vscode-keyword">export default</div> experienceConfig;
    </div>
  );
} 