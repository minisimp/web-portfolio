import type {
  Project /*, ProjectCreateRequest, ProjectUpdateRequest*/,
} from "../types/project";

const API_BASE_URL = "http://localhost:3001";

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE_URL}/projects`);
  if (!res.ok) {
    throw new Error("Failed to fetch projects: ${res.status}");
  }

  const data = (await res.json()) as Project[];
  return data;
}
