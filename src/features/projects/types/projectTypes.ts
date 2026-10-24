export interface Project {
    id: number;
    name: string;
    key: string;
    slug: string;
    description: string;
    type: string;
    is_archived: number;
    organization_id: number;
    lead_id: number;
    created_at: string;
    updated_at: string;
}

export type RouteParams = {
    orgSlug: string;
}

export type CreateProjectPayload = {
    name: string;
    description: string;
    key: string;
    lead: number | null;
}

type ProjectRole = "member" | "leader"

export type AddMemberPayload = {
    user_id: number,
    role: ProjectRole
}