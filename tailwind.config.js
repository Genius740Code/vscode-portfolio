/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'vscode-bg': '#1e1e1e',
        'vscode-sidebar': '#252526',
        'vscode-sidebar-item': '#37373d',
        'vscode-text': '#cccccc',
        'vscode-inactive': '#858585',
        'vscode-active': '#007acc',
        'vscode-blue': '#569cd6',
        'vscode-green': '#6a9955',
        'vscode-orange': '#ce9178',
        'vscode-purple': '#c586c0',
        'vscode-warning': '#ff6000',
        'vscode-pink': '#f92672',
        'vscode-highlight': '#264f78',
        'vscode-border': '#3c3c3c',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 