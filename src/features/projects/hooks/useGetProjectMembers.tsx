import { useQuery } from "@tanstack/react-query"
import { getProjectMembers } from "../api/projectsApi"

export const useGetProjectMembers = (slug: string) => {
    const {data: projectMembersData, isLoading} = useQuery({
        queryKey: ["project", "members", slug],
        queryFn: () => getProjectMembers(slug)
    });

    return{
        projectMembersData,
        isLoading
    }
}