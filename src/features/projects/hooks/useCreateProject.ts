import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../api/projectApi";

export const useCreateProject = (orgSlug?: string) => {
  const queryClient = useQueryClient();

  const { mutate: mutateCreateProject, isPending } = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      if (orgSlug) {
        queryClient.invalidateQueries({ queryKey: ["projects", orgSlug] });
      }
    },
  });

  return { mutateCreateProject, isPending };
};
