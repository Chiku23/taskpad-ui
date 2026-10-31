export interface Project {
  id: number | string;
  name: string;
  key: string;
  slug: string;
  description?: string;
  type?: string;
  is_archived?: number | boolean;
  organization_id: number | string;
  lead_id?: number | string | null;
  created_at?: string;
  updated_at?: string;
}

export type RouteParams = {
  orgSlug: string;
};

export type GetProjectsResponse = {
  status: string;
  message: string;
  data: {
    projects: Project[];
  };
};

export type CreateProjectPayload = {
  orgSlug?: string;
  slug?: string;
  name: string;
  key: string;
  description?: string;
  lead?: number | null;
};

export type UpdateProjectPayload = {
  projectSlug: string;
  name?: string;
  key?: string;
  description?: string;
  lead?: number | null;
};

export type ProjectRole = "owner" | "admin" | "member" | "leader";

export type AddMemberPayload = {
  user_id: number;
  role: ProjectRole;
};
