import React, { useMemo, memo } from 'react';
import { FaUser, FaCode, FaPalette, FaHammer, FaEnvelope, FaJs, FaReact, FaHtml5, FaCss3, FaRegFileCode } from 'react-icons/fa';

interface EditorProps {
  activeFile: string;
  theme?: string;
  startingLineNumber?: number;
}

// Memoized file icon component
const FileIcon = memo(({ filename }: { filename: string }) => {
  const icon = useMemo(() => {
    if (filename.endsWith('.js') || filename.endsWith('.jsx')) {
      return <FaJs className="text-yellow-400 mr-2" size={14} />;
    } else if (filename.endsWith('.tsx') || filename.endsWith('.ts')) {
      return <FaReact className="text-blue-400 mr-2" size={14} />;
    } else if (filename.endsWith('.html')) {
      return <FaHtml5 className="text-orange-500 mr-2" size={14} />;
    } else if (filename.endsWith('.css')) {
      return <FaCss3 className="text-blue-500 mr-2" size={14} />;
    }
    return <FaRegFileCode className="text-yellow-400 mr-2" size={14} />;
  }, [filename]);

  return icon;
});

// Optimized syntax highlighting with regex caching
const syntaxPatterns = {
  comments: /\/\/.*/g,
  jsxTags: /<[^>]+>/g,
  keywords: /\b(const|let|var|function|return|if|else|for|while|switch|case|default|import|export|from|as|class|extends|super|new|this|try|catch|finally|throw|async|await)\b/g,
  hooks: /\b(useState|useEffect|useContext|useReducer|useCallback|useMemo|useRef|useLayoutEffect)\b/g,
  strings: /(["'`])(.*?)\1/g,
  numbers: /\b\d+\b/g,
  functionCalls: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g,
  classes: /\b([A-Z][a-zA-Z0-9_$]*)\b/g,
  attributes: /([a-zA-Z_$][a-zA-Z0-9_$]*)=/g,
  variables: /\b(const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g,
  properties: /\.([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g,
  brackets: /([{}[\]()])/g
};

const highlightSyntax = (code: string) => {
  const lines = code.split('\n');
  
  return lines.map((line, index) => {
    let highlightedLine = line;

    // Apply syntax highlighting patterns
    Object.entries(syntaxPatterns).forEach(([type, pattern]) => {
      highlightedLine = highlightedLine.replace(pattern, (match, ...args) => {
        switch (type) {
          case 'comments':
            return `<span class="text-gray-400 italic">${match}</span>`;
          case 'jsxTags':
            return `<span class="text-blue-500">${match}</span>`;
          case 'keywords':
            return `<span class="text-purple-400">${match}</span>`;
          case 'hooks':
            return `<span class="text-pink-500">${match}</span>`;
          case 'strings':
            return `<span class="text-green-400">${match}</span>`;
          case 'numbers':
            return `<span class="text-orange-400">${match}</span>`;
          case 'functionCalls':
            return `<span class="text-blue-400">${args[0]}</span>(`;
          case 'classes':
            return `<span class="text-blue-300">${match}</span>`;
          case 'attributes':
            return `<span class="text-yellow-300">${args[0]}</span>=`;
          case 'variables':
            return `<span class="text-purple-400">${args[0]}</span> <span class="text-yellow-300">${args[1]}</span>`;
          case 'properties':
            return `.<span class="text-yellow-400">${args[0]}</span>`;
          case 'brackets':
            return `<span class="text-white">${match}</span>`;
          default:
            return match;
        }
      });
    });

    return (
      <div key={index} dangerouslySetInnerHTML={{ __html: highlightedLine }} />
    );
  });
};

// Memoized content components
const AboutContent = memo(() => (
  <div className="pl-4">
    <h1 className="text-2xl font-bold mb-4">About Me</h1>
    <div className="code-line h-6 leading-6"><span className="text-purple-500">const</span> <span className="text-yellow-300">developer</span> = {'{'}</div>
    <div className="code-line h-6 leading-6 ml-4"><span className="text-yellow-400">name</span>: <span className="text-green-400">"John Doe"</span>,</div>
    <div className="code-line h-6 leading-6 ml-4"><span className="text-yellow-400">title</span>: <span className="text-green-400">"Full Stack Developer"</span>,</div>
    <div className="code-line h-6 leading-6 ml-4"><span className="text-yellow-400">location</span>: <span className="text-green-400">"New York, USA"</span>,</div>
    <div className="code-line h-6 leading-6 ml-4"><span className="text-yellow-400">email</span>: <span className="text-green-400">"john.doe@example.com"</span>,</div>
    <div className="code-line h-6 leading-6 ml-4"><span className="text-yellow-400">bio</span>: <span className="text-green-400">"I'm a passionate full-stack developer with over 5 years of experience building modern web applications. I specialize in React, TypeScript, and Node.js, with a focus on creating intuitive user experiences."</span></div>
    <div className="code-line h-6 leading-6">{'}'}</div>
    <div className="code-line h-6 leading-6"><span className="text-gray-400 italic">// I love working with the latest technologies and am always looking to learn more</span></div>
  </div>
));

const SkillsContent = () => (
  <div className="p-6 pl-0">
    <h1 className="text-2xl font-bold mb-4 pl-2">Skills</h1>
    
    <div className="code-line mb-2"><span className="text-purple-400">const</span> <span className="text-yellow-300">skills</span> = {'{'}</div>
    
    <div className="code-line ml-4 mb-1"><span className="text-yellow-300">languages</span>: [</div>
    <div className="code-line ml-8 mb-1"><span className="text-green-400">"JavaScript"</span>, <span className="text-green-400">"TypeScript"</span>, <span className="text-green-400">"HTML"</span>, <span className="text-green-400">"CSS"</span>, <span className="text-green-400">"Python"</span></div>
    <div className="code-line ml-4 mb-1">],</div>
    
    <div className="code-line ml-4 mb-1"><span className="text-yellow-300">frameworks</span>: [</div>
    <div className="code-line ml-8 mb-1"><span className="text-green-400">"React"</span>, <span className="text-green-400">"Next.js"</span>, <span className="text-green-400">"Express"</span>, <span className="text-green-400">"Node.js"</span></div>
    <div className="code-line ml-4 mb-1">],</div>
    
    <div className="code-line ml-4 mb-1"><span className="text-yellow-300">tools</span>: [</div>
    <div className="code-line ml-8 mb-1"><span className="text-green-400">"Git"</span>, <span className="text-green-400">"Webpack"</span>, <span className="text-green-400">"Docker"</span>, <span className="text-green-400">"VS Code"</span></div>
    <div className="code-line ml-4 mb-1">],</div>
    
    <div className="code-line ml-4 mb-1"><span className="text-yellow-300">databases</span>: [</div>
    <div className="code-line ml-8 mb-1"><span className="text-green-400">"MongoDB"</span>, <span className="text-green-400">"PostgreSQL"</span>, <span className="text-green-400">"MySQL"</span></div>
    <div className="code-line ml-4 mb-1">],</div>
    
    <div className="code-line ml-4 mb-1"><span className="text-blue-400">getLevelOfExpertise</span>: (<span className="text-yellow-300">skill</span>) ={'>'}  {'{'}</div>
    <div className="code-line ml-8 mb-1"><span className="text-purple-400">switch</span>(<span className="text-yellow-300">skill</span>) {'{'}</div>
    <div className="code-line ml-12 mb-1"><span className="text-purple-400">case</span> <span className="text-green-400">"React"</span>: <span className="text-purple-400">return</span> <span className="text-green-400">"Advanced"</span>;</div>
    <div className="code-line ml-12 mb-1"><span className="text-purple-400">case</span> <span className="text-green-400">"TypeScript"</span>: <span className="text-purple-400">return</span> <span className="text-green-400">"Intermediate"</span>;</div>
    <div className="code-line ml-12 mb-1"><span className="text-purple-400">default</span>: <span className="text-purple-400">return</span> <span className="text-green-400">"Learning"</span>;</div>
    <div className="code-line ml-8 mb-1">{'}'}</div>
    <div className="code-line ml-4 mb-1">{'}'}</div>
    
    <div className="code-line">{'}'}</div>
  </div>
);

const ProjectsContent = () => (
  <div className="p-6 pl-0">
    <h1 className="text-2xl font-bold mb-4 pl-2">Projects</h1>
    
    <div className="code-line mb-2"><span className="text-purple-400">const</span> <span className="text-yellow-300">projects</span> = [</div>
    
    <div className="code-line ml-4 mb-1">{'{'}</div>
    <div className="code-line ml-8 mb-1"><span className="text-yellow-300">name</span>: <span className="text-green-400">"E-commerce Platform"</span>,</div>
    <div className="code-line ml-8 mb-1"><span className="text-yellow-300">description</span>: <span className="text-green-400">"A full-stack e-commerce application with user authentication, product catalog, and payment processing."</span>,</div>
    <div className="code-line ml-8 mb-1"><span className="text-yellow-300">tech</span>: [<span className="text-green-400">"React"</span>, <span className="text-green-400">"Node.js"</span>, <span className="text-green-400">"MongoDB"</span>, <span className="text-green-400">"Stripe API"</span>],</div>
    <div className="code-line ml-8 mb-1"><span className="text-yellow-300">github</span>: <span className="text-green-400">"https://github.com/johndoe/ecommerce"</span>,</div>
    <div className="code-line ml-8 mb-1"><span className="text-yellow-300">live</span>: <span className="text-green-400">"https://ecommerce-demo.example.com"</span></div>
    <div className="code-line ml-4 mb-2">{'}'}</div>
    
    <div className="code-line ml-4 mb-1">{'{'}</div>
    <div className="code-line ml-8 mb-1"><span className="text-yellow-300">name</span>: <span className="text-green-400">"Task Management App"</span>,</div>
    <div className="code-line ml-8 mb-1"><span className="text-yellow-300">description</span>: <span className="text-green-400">"A task management application with drag-and-drop functionality, task prioritization, and team collaboration features."</span>,</div>
    <div className="code-line ml-8 mb-1"><span className="text-yellow-300">tech</span>: [<span className="text-green-400">"React"</span>, <span className="text-green-400">"TypeScript"</span>, <span className="text-green-400">"Firebase"</span>],</div>
    <div className="code-line ml-8 mb-1"><span className="text-yellow-300">github</span>: <span className="text-green-400">"https://github.com/johndoe/taskmanager"</span>,</div>
    <div className="code-line ml-8 mb-1"><span className="text-yellow-300">live</span>: <span className="text-green-400">"https://tasks-demo.example.com"</span></div>
    <div className="code-line ml-4 mb-1">{'}'}</div>
    
    <div className="code-line">];</div>
  </div>
);

const ExperienceContent = () => (
  <div className="p-6 pl-0">
    <h1 className="text-2xl font-bold mb-4 pl-2">Experience</h1>
    
    <div className="code-line mb-2"><span className="text-purple-400">const</span> <span className="text-yellow-300">experience</span> = [</div>
    
    <div className="code-line ml-4 mb-1">{'{'}</div>
    <div className="code-line ml-8 mb-1"><span className="text-yellow-300">title</span>: <span className="text-green-400">"Senior Frontend Developer"</span>,</div>
    <div className="code-line ml-8 mb-1"><span className="text-yellow-300">company</span>: <span className="text-green-400">"Tech Innovators Inc."</span>,</div>
    <div className="code-line ml-8 mb-1"><span className="text-yellow-300">period</span>: <span className="text-green-400">"2021 - Present"</span>,</div>
    <div className="code-line ml-8 mb-1"><span className="text-yellow-300">responsibilities</span>: [</div>
    <div className="code-line ml-12 mb-1"><span className="text-green-400">"Lead a team of 4 frontend developers in building a modern SaaS application"</span>,</div>
    <div className="code-line ml-12 mb-1"><span className="text-green-400">"Implemented a component library using React and TypeScript, reducing development time by 30%"</span>,</div>
    <div className="code-line ml-12 mb-1"><span className="text-green-400">"Optimized application performance, achieving a 40% reduction in load time"</span></div>
    <div className="code-line ml-8 mb-1">]</div>
    <div className="code-line ml-4 mb-2">{'}'}</div>
    
    <div className="code-line ml-4 mb-1">{'{'}</div>
    <div className="code-line ml-8 mb-1"><span className="text-yellow-300">title</span>: <span className="text-green-400">"Full Stack Developer"</span>,</div>
    <div className="code-line ml-8 mb-1"><span className="text-yellow-300">company</span>: <span className="text-green-400">"Digital Solutions Ltd."</span>,</div>
    <div className="code-line ml-8 mb-1"><span className="text-yellow-300">period</span>: <span className="text-green-400">"2018 - 2020"</span>,</div>
    <div className="code-line ml-8 mb-1"><span className="text-yellow-300">responsibilities</span>: [</div>
    <div className="code-line ml-12 mb-1"><span className="text-green-400">"Developed and maintained multiple web applications for clients across various industries"</span>,</div>
    <div className="code-line ml-12 mb-1"><span className="text-green-400">"Designed and implemented RESTful APIs and database schemas"</span>,</div>
    <div className="code-line ml-12 mb-1"><span className="text-green-400">"Integrated third-party services and payment gateways"</span></div>
    <div className="code-line ml-8 mb-1">]</div>
    <div className="code-line ml-4 mb-1">{'}'}</div>
    
    <div className="code-line">];</div>
  </div>
);

const ContactContent = () => (
  <div className="p-6 pl-0">
    <h1 className="text-2xl font-bold mb-4 pl-2">Contact</h1>
    
    <div className="code-line mb-2"><span className="text-purple-400">const</span> <span className="text-yellow-300">contact</span> = {'{'}</div>
    <div className="code-line ml-4 mb-1"><span className="text-yellow-300">email</span>: <span className="text-green-400">"john.doe@example.com"</span>,</div>
    <div className="code-line ml-4 mb-1"><span className="text-yellow-300">linkedin</span>: <span className="text-green-400">"https://linkedin.com/in/johndoe"</span>,</div>
    <div className="code-line ml-4 mb-1"><span className="text-yellow-300">github</span>: <span className="text-green-400">"https://github.com/johndoe"</span>,</div>
    <div className="code-line ml-4 mb-1"><span className="text-yellow-300">twitter</span>: <span className="text-green-400">"https://twitter.com/johndoe"</span>,</div>
    <div className="code-line mb-4">{'}'}</div>
    
    <div className="code-line mb-2"><span className="text-purple-400">function</span> <span className="text-blue-400">sendMessage</span>(<span className="text-yellow-300">message</span>) {'{'}</div>
    <div className="code-line ml-4 mb-1"><span className="text-purple-400">return</span> <span className="text-purple-400">new</span> <span className="text-blue-300">Promise</span>((<span className="text-yellow-300">resolve</span>) ={'>'} {'{'}</div>
    <div className="code-line ml-8 mb-1"><span className="text-gray-400 italic">// In a real application, this would send the message to a server</span></div>
    <div className="code-line ml-8 mb-1"><span className="text-yellow-300">console</span>.<span className="text-blue-400">log</span>(<span className="text-green-400">"Sending message:"</span>, <span className="text-yellow-300">message</span>);</div>
    <div className="code-line ml-8 mb-1"><span className="text-blue-400">setTimeout</span>(() ={'>'} {'{'}</div>
    <div className="code-line ml-12 mb-1"><span className="text-yellow-300">resolve</span>({'{'} <span className="text-yellow-300">success</span>: <span className="text-purple-400">true</span> {'}'});</div>
    <div className="code-line ml-8 mb-1">{'}'}, <span className="text-orange-400">1000</span>);</div>
    <div className="code-line ml-4 mb-1">{'}'})</div>
    <div className="code-line mb-2">{'}'}</div>
    
    <div className="code-line"><span className="text-gray-400 italic">// Feel free to reach out via any of the above methods!</span></div>
  </div>
);

const Editor: React.FC<EditorProps> = memo(({ activeFile, theme = 'dark', startingLineNumber = 1 }) => {
  const content = useMemo(() => {
    switch (activeFile) {
      case 'about.tsx':
        return <AboutContent />;
      case 'skills.tsx':
        return <SkillsContent />;
      case 'projects.tsx':
        return <ProjectsContent />;
      case 'experience.tsx':
        return <ExperienceContent />;
      case 'contact.tsx':
        return <ContactContent />;
      default:
        return <div className="text-vscode-text">Select a file to view its contents</div>;
    }
  }, [activeFile]);

  const lineCount = useMemo(() => {
    switch (activeFile) {
      case 'about.tsx': return 8;
      case 'skills.tsx': return 23;
      case 'projects.tsx': return 21;
      case 'experience.tsx': return 24;
      case 'contact.tsx': return 18;
      default: return 1;
    }
  }, [activeFile]);

  const lineNumbers = useMemo(() => 
    Array.from({ length: lineCount }, (_, i) => i + startingLineNumber),
    [lineCount, startingLineNumber]
  );

  if (!activeFile) {
    return (
      <div className="flex-1 h-full flex items-center justify-center text-vscode-inactive">
        <div className="text-center">
          <h2 className="text-xl mb-2">Welcome to VS Code Portfolio</h2>
          <p className="text-sm">Select a file from the Explorer to begin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-vscode-bg">
      <div className="flex-1 overflow-auto">
        <div className="flex">
          {/* Line Numbers Column */}
          <div className="bg-[#1e1e1e] text-gray-500 select-none border-r border-gray-800 pt-6 pb-8 font-mono text-sm hidden sm:block">
            {lineNumbers.map(num => (
              <div key={num} className="text-right pr-2 w-12 h-6 leading-6">{num}</div>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 pt-6 pb-8 font-mono text-sm px-4 sm:px-6">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Editor; 