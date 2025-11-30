import { Router } from "express";
import { Project, ProjectSchema, ProjectArraySchema } from "../schema/projects";
import { supabase } from "../lib/supabase";

const router = Router();

// sample data
/*const PROJECTS: Project[] = [
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
  {
    id: 4,
    slug: "Crazy-Project",
    name: "Crazy Project",
    summary: "This is really out there",
    tech: ["Linux", "Docker", "PowerShell"],
    status: "Ongoing",
    featured: false,
  },
];
*/
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("projects")
    .select("id, slug, name, summary, tech, status, featured")
    .order("id", { ascending: true });
  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ error: "failed to fetch projects" });
  }

  const parsed = ProjectArraySchema.safeParse(data);
  if (!parsed.success) {
    console.error("Invalid project data:", parsed.error);
    return res.status(500).json({ error: "Internal server error" });
  }

  res.json(parsed.data);
});

router.get("/:slug", async (req, res) => {
  const slug = req.params.slug;
  const { data, error } = await supabase
    .from("projects")
    .select("id, slug, name, summary, tech, status, featured")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ error: "Failed to fetch project" });
  }

  if (!data) {
    return res.status(404).json({ error: "Project not found" });
  }

  const parsed = ProjectSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Invalid project data for slug:", parsed.error);
    return res.status(500).json({ error: "Internal project data" });
  }

  res.json(parsed.data);
});

export default router;
