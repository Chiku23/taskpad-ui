export type OrgRole = "admin" | "member";

export type Organization = {
    id: number;
    name: string,
    slug: string
}

export type OrganizationMember = {
    id: number;
    organization_id: number;
    user_id: number;
    role: OrgRole;
    joined_at: string | null;
    created_at: string;
    updated_at: string;
}
export type GetOrganizationResponse = {
    status: string,
    message: string,
    data: {
        organizations: Organization[];
    }
}

export type CreateOrganizationPayload = {
    name: string,
    slug: string
}

export type AddOrgMemberPayload = {
    slug: string,
    email: string,
    role: OrgRole
}
