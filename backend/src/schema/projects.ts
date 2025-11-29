import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  summary: z.string(),
  tech: z.array(z.string()),
  status: z.enum(["Completed", "In progress", "Ongoing", "Prototype"]),
  featured: z.boolean().optional(),
});

export const ProjectArraySchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;
