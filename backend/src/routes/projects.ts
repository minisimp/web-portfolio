import { Router } from "express";
import {
  Project,
  ProjectSchema,
  ProjectArraySchema,
  ProjectInputSchema,
} from "../schema/projects";
import { supabase } from "../lib/supabase";

const router = Router();

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

router.post("/", async (req, res) => {
  const parsed = ProjectInputSchema.safeParse(req.body);

  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: "Invalid project data", details: parsed.error });
  }

  const { data, error } = await supabase
    .from("projects")
    .insert(parsed.data)
    .select("id, slug, name, summary, tech, status, featured")
    .maybeSingle();

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ error: "Failed to create project" });
  }
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid project ID" });
  }

  const parsed = ProjectInputSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: "Invalid project data", details: parsed.error });
  }

  const { data, error } = await supabase
    .from("projects")
    .update(parsed.data)
    .eq("id", id)
    .select("id, slug, name, summary, tech, status, featured")
    .maybeSingle();

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ error: "Failed to update project" });
  }

  if (!data) {
    return res.status(404).json({ error: "Project not found" });
  }

  const validated = ProjectSchema.safeParse(data);
  if (!validated.success) {
    console.error("Invalid project data after update:", validated.error);
    return res.status(500).json({ error: "Internal server error" });
  }

  return res.json(validated.data);
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid project ID" });
  }

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ error: "Failed to delete project" });
  }

  return res.status(204).send();
});

export default router;
