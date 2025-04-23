import React from 'react';
import { portfolioConfig } from '@/config/portfolio';

export default function Projects() {
  const { projects } = portfolioConfig;
  
  return (
    <div className="p-6 font-mono text-sm">
      <div className="text-vscode-comment">// Projects Configuration</div>
      <div className="text-vscode-keyword">const</div> <div className="text-vscode-variable">projectsConfig</div> = [
      {projects.map((project, index) => (
        <div key={project.id} className="ml-4">
          {'{'}
          <div className="ml-4">
            <div className="text-vscode-property">id</div>: <div className="text-vscode-string">"{project.id}"</div>,
            <div className="text-vscode-property">title</div>: <div className="text-vscode-string">"{project.title}"</div>,
            <div className="text-vscode-property">description</div>: <div className="text-vscode-string">"{project.description}"</div>,
            <div className="text-vscode-property">technologies</div>: [
            <div className="ml-4">
              {project.technologies.map((tech, techIndex) => (
                <div key={techIndex}>
                  <div className="text-vscode-string">"{tech}"</div>
                  {techIndex < project.technologies.length - 1 && ','}
                </div>
              ))}
            </div>
            ],
            {project.githubUrl && (
              <>
                <div className="text-vscode-property">githubUrl</div>: <div className="text-vscode-string">"{project.githubUrl}"</div>,
              </>
            )}
            {project.liveUrl && (
              <>
                <div className="text-vscode-property">liveUrl</div>: <div className="text-vscode-string">"{project.liveUrl}"</div>
              </>
            )}
          </div>
          {'}'}
          {index < projects.length - 1 && ','}
        </div>
      ))}
      ];
      
      <div className="mt-4 text-vscode-comment">// Export the configuration</div>
      <div className="text-vscode-keyword">export default</div> projectsConfig;
    </div>
  );
} 