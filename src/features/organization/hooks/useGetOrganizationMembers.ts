import { useQuery } from "@tanstack/react-query";
import { getOrganizationMembers } from "../api/organizationApi";

export const useGetOrganizationMembers = (slug: string) => {
    const { data: organizationMembersData, isLoading, isError } = useQuery({
        queryKey: ["organization", "member", slug],
        queryFn: () => getOrganizationMembers(slug),
        enabled: !!slug,
    });

    return {
        organizationMembersData,
        isLoading,
        isError,
    };
};