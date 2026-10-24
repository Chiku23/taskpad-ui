import { useQuery } from "@tanstack/react-query";
import { getProject } from "../api/projectsApi";

export const useGetProject = (slug: string) => {
    const {data: projectData} = useQuery({
        queryKey: ["project", slug],
        queryFn: () => getProject(slug),
        enabled: Boolean(slug)
    })

    return {
        projectData
    }
}