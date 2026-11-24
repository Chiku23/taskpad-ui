import { BASE_URL, axiosInstance } from "../../../lib/apiClient";
import type { GetProjectsResponse, CreateProjectPayload, AddMemberPayload } from "../types/projectTypes";

export const getProjects = async(slug: string): Promise<GetProjectsResponse> => {
    return await axiosInstance.get(`${BASE_URL}/organization/${slug}/projects`);
}

export const getProject = async(slug: string) => {
    return await axiosInstance.get(`${BASE_URL}/project/${slug}`);
}

export const createProject = async({slug, projectFormData}: {slug: string, projectFormData: CreateProjectPayload}) => {
    return await axiosInstance.post(`${BASE_URL}/organization/${slug}/projects`, projectFormData);
}

export const addProjectMember = async({slug, addMemberData}: {slug: string, addMemberData: AddMemberPayload}) => {
    return await axiosInstance.post(`${BASE_URL}/project/${slug}/members`, addMemberData);
}

export const getProjectMembers = async(slug: string) => {
     return await axiosInstance.get(`${BASE_URL}/project/${slug}/members`);
}

export const updateProject = async({slug, updateProjectData}: {slug: string, updateProjectData: unknown}) => {
    return await axiosInstance.put(`${BASE_URL}/project/${slug}`, updateProjectData);
}