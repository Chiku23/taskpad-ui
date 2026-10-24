import { BASE_URL } from "../../../lib/apiClient"
import type { CreateProjectPayload, AddMemberPayload } from "../types/projectTypes";

export const getProjects = async(slug: string) => {
    const response = await fetch(`${BASE_URL}/organization/${slug}/projects`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
        credentials: "include"
    });

    if(!response.ok){
        throw new Error("Failed to fetch projects");
    }

    return await response.json();
}

export const getProject = async(slug: string) => {
    const response = await fetch(`${BASE_URL}/project/${slug}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
        credentials: "include"
    });

    if(!response.ok){
        throw new Error("Failed to fetch project");
    }

    return await response.json();
}

export const createProject = async({slug, projectFormData}: {slug: string, projectFormData: CreateProjectPayload}) => {
    const response = await fetch(`${BASE_URL}/organization/${slug}/projects`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(projectFormData)
    });

    if(!response.ok){
        throw new Error("Failed to create project");
    }

    return await response.json();
}

export const addProjectMember = async({slug, addMemberData}: {slug: string, addMemberData: AddMemberPayload}) => {
    const response = await fetch(`${BASE_URL}/project/${slug}/members`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(addMemberData)
    })

    if(!response.ok){
        throw new Error("Failed to add member to project")
    }

    return await response.json();
}