export type ProjectStatus =
  | "Completed"
  | "In progress"
  | "Ongoing"
  | "Prototype";

export interface Project {
  id: number;
  slug: string;
  name: string;
  summary: string;
  tech: string[];
  status: ProjectStatus;
  featured?: boolean;

  description?: string;
  demo_url?: string | null;
  repo_url?: string | null;
  hero_image_url?: string | null;
}
