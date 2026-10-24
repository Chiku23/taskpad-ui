import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../api/projectsApi";

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    const {mutate: mutateCreateProject} = useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["projects"]})
        }
    });

    return {
        mutateCreateProject
    }
}