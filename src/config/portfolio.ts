export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface Skill {
  category: string;
  items: SkillItem[];
}

export interface SkillItem {
  name: string;
  url?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export const portfolioConfig = {
  personal: {
    name: "Your Name",
    title: "Full Stack Developer",
    email: "your.email@example.com",
    location: "Your Location",
    bio: "A passionate developer with experience in...",
  },
  skills: [
    {
      category: "Frontend",
      items: [
        { name: "React", url: "https://reactjs.org/" },
        { name: "TypeScript", url: "https://www.typescriptlang.org/" },
        { name: "Next.js", url: "https://nextjs.org/" },
        { name: "Tailwind CSS", url: "https://tailwindcss.com/" }
      ]
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", url: "https://nodejs.org/" },
        { name: "Python", url: "https://www.python.org/" },
        { name: "PostgreSQL", url: "https://www.postgresql.org/" },
        { name: "MongoDB", url: "https://www.mongodb.com/" }
      ]
    },
    {
      category: "Tools & Others",
      items: [
        { name: "Git", url: "https://git-scm.com/" },
        { name: "Docker", url: "https://www.docker.com/" },
        { name: "AWS", url: "https://aws.amazon.com/" },
        { name: "CI/CD", url: "https://github.com/features/actions" }
      ]
    }
  ] as Skill[],
  projects: [
    {
      id: "project-1",
      title: "Project One",
      description: "Description of your first project",
      technologies: ["React", "Node.js", "MongoDB"],
      githubUrl: "https://github.com/yourusername/project1",
      liveUrl: "https://project1.com"
    }
  ] as Project[],
  experience: [
    {
      id: "exp-1",
      company: "Company Name",
      position: "Senior Developer",
      period: "2020 - Present",
      description: [
        "Led development of key features",
        "Mentored junior developers",
        "Improved application performance by 50%"
      ],
      technologies: ["React", "Node.js", "AWS"]
    }
  ] as Experience[],
  social: [
    {
      platform: "GitHub",
      url: "https://github.com/yourusername",
      icon: "github"
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      icon: "linkedin"
    }
  ] as SocialLink[]
}; 