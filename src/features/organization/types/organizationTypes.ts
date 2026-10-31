export type OrgRole = "admin" | "member";
//Data models
export type Organization = {
    id: number;
    name: string,
    slug: string,
    owner_id: number,
    avatar_url?: string,
    created_at?: string,
    updated_at?: string
}

export type OrganizationMember = {
    id: number;
    organization_id: number;
    user_id: number;
    user_name?: string;
    user_email?: string;
    role: OrgRole;
    joined_at: string | null;
    created_at: string;
    updated_at: string;
}

//Api responses(Response types)
export type GetOrganizationsResponse = {
    status: string,
    message: string,
    data: {
        organizations: Organization[];
    }
}

export type GetOrganizationResponse = {
    status: string;
    message: string;
    data: {
        organization: Organization
    }
}

export type GetOrganizationMemberResponse = {
    status: string;
    message: string;
    data: {
        members: OrganizationMember[]
    }
}

//Api payloads(Request types)
export type CreateOrganizationPayload = {
    name: string,
    slug: string
}

export type AddOrgMemberPayload = {
    slug: string,
    email: string,
    role: OrgRole
}
