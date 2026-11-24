import { axiosInstance, BASE_URL } from "../../../lib/apiClient"
import type { Issue, IssueFilters } from "../types/issueTypes";

export const createIssue = async({slug, issueData}: {slug: string, issueData: Issue}) => {
    return await axiosInstance.post(`${BASE_URL}/project/${slug}/issues`, issueData);
}

export const getIssues = async(slug : string, params: IssueFilters) => {
    return await axiosInstance.get(`${BASE_URL}/project/${slug}/issues`, {
        params
    });
}

export const getIssue = async(issueId: number) => {
    return await axiosInstance.get(`${BASE_URL}/issues/${issueId}`);
}