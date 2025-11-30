export type ProjectStatus =
  | "Completed"
  | "In progress"
  | "Ongoing"
  | "Prototype";

export type Project = {
  id: number;
  slug: string;
  name: string;
  summary: string;
  tech: string[];
  status: ProjectStatus;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: "portfolio-website",
    name: "Portfolio Website",
    summary: "This site - a hub for my projects and upcoming full-stack apps.",
    tech: ["React", "TypeScript", "MUI", "Node (planned)"],
    status: "In progress",
    featured: true,
  },
  {
    id: 2,
    slug: "mizuki-assistant",
    name: "Mizuki Assistant",
    summary:
      "A personal AI assistant project focused on tools, memory, and homelab integration.",
    tech: ["Python", "OpenAI API", "Docker"],
    status: "Prototype",
    featured: true,
  },
  {
    id: 3,
    slug: "homelab-automation",
    name: "Homelab Automation",
    summary:
      "Scripts and services to manage my self-hosted environment and media stack.",
    tech: ["Linux", "Docker", "PowerShell"],
    status: "Ongoing",
  },
];
