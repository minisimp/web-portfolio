import { Router } from "express";
import {
  Project,
  ProjectSchema,
  ProjectArraySchema,
  ProjectInputSchema,
} from "../schema/projects";
import { supabase } from "../lib/supabase";
import { asyncHandler } from "../utils/asyncHandler";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

// Public routes
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from("projects")
      .select("id, slug, name, summary, tech, status, featured")
      .order("id", { ascending: true });

    if (error) {
      throw error; //goes to centralized error handler
    }

    const parsed = ProjectArraySchema.safeParse(data);
    if (!parsed.success) {
      console.error("Invalid project data:", parsed.error);
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.json(parsed.data);
  })
);

router.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const slug = req.params.slug;
    const { data, error } = await supabase
      .from("projects")
      .select("id, slug, name, summary, tech, status, featured")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return res.status(404).json({ error: "Project not found" });
    }

    const parsed = ProjectSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Invalid project data for slug:", parsed.error);
      return res.status(500).json({ error: "Internal project data" });
    }

    return res.json(parsed.data);
  })
);

// Admin routes
router.post(
  "/",
  requireAdmin,
  asyncHandler(async (req, res) => {
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
      throw error;
    }

    const validated = ProjectSchema.safeParse(data);
    if (!validated.success) {
      console.error("Invalid project data after insertion:", validated.error);
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(201).json(validated.data);
  })
);

router.put(
  "/:id",
  requireAdmin,
  asyncHandler(async (req, res) => {
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
      throw error;
    }

    if (!data) {
      return res.status(404).json({ error: "Project not found" });
    }

    const validated = ProjectSchema.safeParse(data);
    if (!validated.success) {
      console.error("Invalid project data after update:", validated.error);
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(201).json(validated.data);
  })
);

router.delete(
  "/:id",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      throw error;
    }

    return res.status(204).send();
  })
);

export default router;
