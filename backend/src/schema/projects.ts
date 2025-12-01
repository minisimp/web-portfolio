import { z } from "zod";

const UrlString = z
  .string()
  .trim()
  .refine(
    (val) => {
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Invalid URL format" }
  );

const NullableUrlString = z.union([UrlString, z.null()]);

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
  demo_url: NullableUrlString.optional(),
  repo_url: NullableUrlString.optional(),
  hero_image_url: NullableUrlString.optional(),
});

export const ProjectArraySchema = z.array(ProjectSchema);

export const ProjectInputSchema = ProjectSchema.omit({ id: true });

export type Project = z.infer<typeof ProjectSchema>;
