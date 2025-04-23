import React from 'react';
import { portfolioConfig } from '@/config/portfolio';

export default function Contact() {
  const { personal, social } = portfolioConfig;
  
  return (
    <div className="p-6 font-mono text-sm">
      <div className="text-vscode-comment">// Contact Information Configuration</div>
      <div className="text-vscode-keyword">const</div> <div className="text-vscode-variable">contactConfig</div> = {'{'}
      <div className="ml-4">
        <div className="text-vscode-property">personal</div>: {'{'}
        <div className="ml-4">
          <div className="text-vscode-property">email</div>: <div className="text-vscode-string">"{personal.email}"</div>,
          <div className="text-vscode-property">location</div>: <div className="text-vscode-string">"{personal.location}"</div>
        </div>
        {'}'},
        
        <div className="text-vscode-property">social</div>: [
        <div className="ml-4">
          {social.map((link, index) => (
            <div key={index}>
              {'{'}
              <div className="ml-4">
                <div className="text-vscode-property">platform</div>: <div className="text-vscode-string">"{link.platform}"</div>,
                <div className="text-vscode-property">url</div>: <div className="text-vscode-string">"{link.url}"</div>,
                <div className="text-vscode-property">icon</div>: <div className="text-vscode-string">"{link.icon}"</div>
              </div>
              {'}'}
              {index < social.length - 1 && ','}
            </div>
          ))}
        </div>
        ]
      </div>
      {'}'};
      
      <div className="mt-4 text-vscode-comment">// Export the configuration</div>
      <div className="text-vscode-keyword">export default</div> contactConfig;
    </div>
  );
} 