import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  summary: z.string(),
  tech: z.array(z.string()),
  status: z.enum(["Completed", "In progress", "Ongoing", "Prototype"]),
  featured: z.boolean().optional(),

  //Optional fields
  description: z.string().optional(),
  demo_url: z.string().url().optional(),
  repo_url: z.string().url().optional(),
  hero_image_url: z.string().url().optional(),
});

export const ProjectArraySchema = z.array(ProjectSchema);

export const ProjectInputSchema = ProjectSchema.omit({ id: true });

export type Project = z.infer<typeof ProjectSchema>;
