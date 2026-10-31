import { BASE_URL } from "../../../lib/apiClient";
import type { GetProjectsResponse, CreateProjectPayload, UpdateProjectPayload } from "../types/projectTypes";

// Fetch all projects that belong to an organization
export const getOrganizationProjects = async (
  orgSlug: string
): Promise<GetProjectsResponse> => {
  const response = await fetch(
    `${BASE_URL}/organization/${orgSlug}/projects`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return await response.json();
};

// POST /organization/:orgSlug/projects
export const createProject = async ({ orgSlug, name, key, lead }: CreateProjectPayload) => {
  const response = await fetch(`${BASE_URL}/organization/${orgSlug}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, key, lead }),
  });

  if (!response.ok) {
    throw new Error("Failed to create project");
  }

  return await response.json();
};

// PUT /project/:projectSlug
export const updateProject = async ({ projectSlug, name, key, lead }: UpdateProjectPayload) => {
  const response = await fetch(`${BASE_URL}/project/${projectSlug}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, key, lead }),
  });

  if (!response.ok) {
    throw new Error("Failed to update project");
  }

  return await response.json();
};

