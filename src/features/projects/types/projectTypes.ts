export type Project = {
  id: string;
  name: string;
  key: string;
  slug: string;
  description?: string;
  organization_id: string;
  lead_id?: string | number | null;
};

export type GetProjectsResponse = {
  status: string;
  message: string;
  data: {
    projects: Project[];
  };
};

export type CreateProjectPayload = {
  orgSlug: string;
  name: string;
  key: string;
  lead?: number | null;
};

export type UpdateProjectPayload = {
  projectSlug: string;
  name?: string;
  key?: string;
  lead?: number | null;
};

