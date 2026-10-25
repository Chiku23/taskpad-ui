import { useQuery } from "@tanstack/react-query";
import { getOrganizations } from "../api/organizationApi";
import type{ GetOrganizationsResponse } from "../types/organizationTypes";

// fetch existing organization belongs to authenticated user
export const useOrganizations = () => {
    const {data: organizationsData, isLoading, isError} = useQuery<GetOrganizationsResponse>({
        queryKey: ["organizations"],
        queryFn: getOrganizations,
        retry: false
    })

    return{
        organizationsData,
        isLoading,
        isError
    }
}
