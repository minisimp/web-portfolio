import { Router } from "express";
import { Project, ProjectSchema, ProjectArraySchema } from "../schema/projects";

const router = Router();

// sample data
const PROJECTS: Project[] = [
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

router.get("/", (req, res) => {
  const parsed = ProjectArraySchema.safeParse(PROJECTS);
  if (!parsed.success) {
    console.error("Invalid project data:", parsed.error);
    return res.status(500).json({ error: "Internal server error" });
  }

  res.json(PROJECTS);
});

router.get("/:slug", (req, res) => {
  const { slug } = req.params;

  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  const parsed = ProjectSchema.safeParse(project);
  if (!parsed.success) {
    console.error("Invalid project data for slug:", parsed.error);
    return res.status(500).json({ error: "Internal server error" });
  }

  res.json(parsed.data);
});

export default router;
