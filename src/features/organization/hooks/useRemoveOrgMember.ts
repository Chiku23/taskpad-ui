import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeOrgMember } from "../api/organizationApi";

export const useRemoveOrgMember = (slug?: string) => {
    const queryClient = useQueryClient();

    const { mutate: mutateRemoveOrgMember, isPending, error } = useMutation({
        mutationFn: removeOrgMember,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["organization", "member"] });
            if (slug) {
                queryClient.invalidateQueries({ queryKey: ["organization", "member", slug] });
            }
        },
    });

    return {
        mutateRemoveOrgMember,
        isPending,
        error,
    };
};
