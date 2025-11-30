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

export async function createProject(
  input: Omit<Project, "id">
): Promise<Project> {
  const res = await fetch(`${API_BASE_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error("Failed to create project: ${res.status}");
  }

  return (await res.json()) as Project;
}

export async function updateProject(
  id: number,
  input: Omit<Project, "id">
): Promise<Project> {
  const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error("Failed to update project: ${res.status}");
  }

  return (await res.json()) as Project;
}

export async function deleteProject(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: "DELETE",
  });

  if (!res.ok && res.status !== 204) {
    throw new Error("Failed to delete project: ${res.status}");
  }
}
