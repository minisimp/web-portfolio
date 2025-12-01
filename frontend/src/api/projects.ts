import type {
  Project /*, ProjectCreateRequest, ProjectUpdateRequest*/,
} from "../types/project";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001";

function getAdminHeaders(adminToken: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    "x-admin-token": adminToken,
  };
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE_URL}/projects`);
  if (!res.ok) {
    throw new Error(`Failed to fetch projects: ${res.status}`);
  }

  const data = (await res.json()) as Project[];
  return data;
}

export async function createProject(
  input: Omit<Project, "id">,
  adminToken: string
): Promise<Project> {
  const res = await fetch(`${API_BASE_URL}/projects`, {
    method: "POST",
    headers: getAdminHeaders(adminToken),
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error(`Failed to create project: ${res.status}`);
  }

  return (await res.json()) as Project;
}

export async function updateProject(
  id: number,
  input: Omit<Project, "id">,
  adminToken: string
): Promise<Project> {
  const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: "PUT",
    headers: getAdminHeaders(adminToken),
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error(`Failed to update project: ${res.status}`);
  }

  return (await res.json()) as Project;
}

export async function deleteProject(
  id: number,
  adminToken: string
): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: "DELETE",
    headers: {
      "x-admin-token": adminToken,
    },
  });

  if (!res.ok && res.status !== 204) {
    throw new Error(`Failed to delete project: ${res.status}`);
  }
}
