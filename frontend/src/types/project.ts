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
}
