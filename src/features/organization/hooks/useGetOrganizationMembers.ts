import { useQuery } from "@tanstack/react-query";
import { getOrganizationMembers } from "../api/organizationApi";

export const useGetOrganizationMembers = (slug: string) => {
    const {data: organizationMembersData} = useQuery({
        queryKey: ["organization", "member", slug],
        queryFn: () => getOrganizationMembers(slug)
    });

    return{
        organizationMembersData
    }
}