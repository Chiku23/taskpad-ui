import { useQuery } from "@tanstack/react-query";
import { getOrganizationMembers } from "../api/organizationApi";

export const useGetOrganizationMembers = (slug: string) => {
    const {data: organizationsData} = useQuery({
        queryKey: ["organization", "member", slug],
        queryFn: () => getOrganizationMembers(slug)
    });

    return{
        organizationsData
    }
}