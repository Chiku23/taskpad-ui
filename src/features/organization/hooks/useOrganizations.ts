import { useQuery } from "@tanstack/react-query";
import { getOrganizations } from "../api/organizationApi";
import type{ GetOrganizationResponse } from "../types/organizationTypes";

// fetch existing organization belongs to authenticated user
export const useOrganizations = () => {
    const {data: organizationsData} = useQuery<GetOrganizationResponse>({
        queryKey: ["organizations"],
        queryFn: getOrganizations,
        retry: false
    })

    return{
        organizationsData
    }
}
