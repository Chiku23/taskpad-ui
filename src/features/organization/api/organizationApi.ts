import { BASE_URL } from "../../../lib/apiClient";
import type { GetOrganizationResponse } from "../types/organizationTypes";


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

    return await response.json();
}