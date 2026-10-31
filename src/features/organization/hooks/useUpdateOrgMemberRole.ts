import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrgMemberRole } from "../api/organizationApi";

export const useUpdateOrgMemberRole = (slug?: string) => {
    const queryClient = useQueryClient();

    const { mutate: mutateUpdateRole, isPending, error } = useMutation({
        mutationFn: updateOrgMemberRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["organization", "member"] });
            if (slug) {
                queryClient.invalidateQueries({ queryKey: ["organization", "member", slug] });
            }
        },
    });

    return {
        mutateUpdateRole,
        isPending,
        error,
    };
};
