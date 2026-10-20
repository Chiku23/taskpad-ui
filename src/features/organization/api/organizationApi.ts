import { BASE_URL } from "../../../lib/apiClient";
import type { GetOrganizationResponse, CreateOrganizationPayload } from "../types/organizationTypes";


// Fetch all organization owned by authenticated user
export const getOrganizations = async(): Promise<GetOrganizationResponse> => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/organization`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if(!response.ok){
        throw new Error("Failed to fetch organizations");
    }
    return await response.json();
}

export const createOrganization = async({name, slug} : CreateOrganizationPayload) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/organization/create`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            slug
        })
    })

    if(!response.ok){
        throw new Error("Failed to create organization")
    }

    return await response.json();
}

export const getOrganization = async(slug: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/organization/${slug}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return await response.json();
}

export const updateOrganization = async({name, slug}: CreateOrganizationPayload) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/organization/${slug}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            slug
        })
    })

    return await response.json();
}

export const deleteOrganization = async(slug: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/organization/${slug}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })

    return await response.json();
}

export const getOrganizationMembers = async(slug: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/organization/${slug}/members`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return await response.json();
}