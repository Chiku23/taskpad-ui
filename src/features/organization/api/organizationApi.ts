import { BASE_URL } from "../../../lib/apiClient";
import type { GetOrganizationResponse, CreateOrganizationPayload, AddOrgMemberPayload } from "../types/organizationTypes";


// Fetch all organization owned by authenticated user
export const getOrganizations = async(): Promise<GetOrganizationResponse> => {
    const response = await fetch(`${BASE_URL}/organization`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        credentials: "include"
    });

    if(!response.ok){
        throw new Error("Failed to fetch organizations");
    }
    return await response.json();
}

export const createOrganization = async({name, slug} : CreateOrganizationPayload) => {
    const response = await fetch(`${BASE_URL}/organization/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        credentials: "include",
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
    const response = await fetch(`${BASE_URL}/organization/${slug}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        credentials: "include"
    })

    if(!response.ok){
        throw new Error("Failed to fetch organization")
    }

    return await response.json();
}

export const updateOrganization = async({name, slug}: CreateOrganizationPayload) => {
    const response = await fetch(`${BASE_URL}/organization/${slug}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            name,
            slug
        })
    })

    if(!response.ok){
        throw new Error("Failed to update organization")
    }

    return await response.json();
}

export const deleteOrganization = async(slug: string) => {
    const response = await fetch(`${BASE_URL}/organization/${slug}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        credentials: "include"
    })

    if(!response.ok){
        throw new Error("Failed to delete organization")
    }

    return await response.json();
}

export const getOrganizationMembers = async(slug: string) => {
    const response = await fetch(`${BASE_URL}/organization/${slug}/members`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        credentials: "include"
    })

    if(!response.ok){
        throw new Error("Failed to get organization member")
    }

    return await response.json();
}
export const addOrgMember = async({slug, email, role}: AddOrgMemberPayload) => {
    const response = await fetch(`${BASE_URL}/organization/${slug}/members`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            email,
            role
        })
    })

    if(!response.ok){
        throw new Error("Failed to add member to organization");
    }

    return await response.json();
}