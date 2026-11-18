import { axiosInstance, BASE_URL } from "../../../lib/apiClient";
import type {
    CreateOrganizationPayload,
    AddOrgMemberPayload,
    GetOrganizationResponse,
    GetOrganizationsResponse,
    GetOrganizationMemberResponse,
    OrgRole
} from "../types/organizationTypes";


// Fetch all organization owned by authenticated user
export const getOrganizations = async (): Promise<GetOrganizationsResponse> => {
    return await axiosInstance.get(`${BASE_URL}/organization`);
}

export const createOrganization = async ({ name, slug }: CreateOrganizationPayload) => {
    return await axiosInstance.post(`${BASE_URL}/organization/create`, {name, slug});
}

export const getOrganization = async (slug: string): Promise<GetOrganizationResponse> => {
    return await axiosInstance.get(`${BASE_URL}/organization/${slug}`);
}

export const updateOrganization = async ({ name, slug }: CreateOrganizationPayload) => {
    return await axiosInstance.post(`${BASE_URL}/organization/${slug}`, {name, slug});
}

export const deleteOrganization = async (slug: string) => {
    return await axiosInstance.delete(`${BASE_URL}/organization/${slug}`);
}

export const getOrganizationMembers = async (slug: string): Promise<GetOrganizationMemberResponse> => {
    return await axiosInstance.get(`${BASE_URL}/organization/${slug}/members`);
}
export const addOrgMember = async ({ slug, email, role }: AddOrgMemberPayload) => {
    return await axiosInstance.post(`${BASE_URL}/organization/${slug}/members`, {email, role});
};

export const updateOrgMemberRole = async ({ slug, userId, role }: {
    slug: string;
    userId: number;
    role: OrgRole;
}) => {
    return await axiosInstance.put(`${BASE_URL}/organization/${slug}/members/${userId}`, role);
};

export const removeOrgMember = async ({
    slug,
    userId,
}: {
    slug: string;
    userId: number;
}) => {
    return await axiosInstance.delete(`${BASE_URL}/organization/${slug}/members/${userId}`);
};