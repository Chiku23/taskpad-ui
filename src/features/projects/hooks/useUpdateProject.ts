import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../api/projectApi";

export const useUpdateProject = (orgSlug: string) => {
  const queryClient = useQueryClient();

  const { mutate: mutateUpdateProject, isPending } = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects", orgSlug] });
    },
  });

  return { mutateUpdateProject, isPending };
};
