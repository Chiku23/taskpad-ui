import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../api/projectsApi";

export const useGetProjects = (slug: string) => {
    const {data: projectsData, isLoading} = useQuery({
        queryKey: ["projects", slug],
        queryFn: () => getProjects(slug),
        enabled: Boolean(slug)
    });

    return {
        projectsData,
        isLoading
    }
}
