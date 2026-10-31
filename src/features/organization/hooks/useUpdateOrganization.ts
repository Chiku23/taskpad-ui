import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrganization } from "../api/organizationApi";

export const useUpdateOrganization = () => {
    const queryClient = useQueryClient();

    const { mutate: mutateUpdateOrganization, isPending, error } = useMutation({
        mutationFn: updateOrganization,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["organizations"] });
            queryClient.invalidateQueries({ queryKey: ["organization"] });
        },
    });

    return {
        mutateUpdateOrganization,
        isPending,
        error,
    };
};