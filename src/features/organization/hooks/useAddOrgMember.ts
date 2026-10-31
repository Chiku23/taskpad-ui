import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrgMember } from "../api/organizationApi";

export const useAddOrgMember = (slug?: string) => {
    const queryClient = useQueryClient();

    const { mutate: mutateAddOrgMember, isPending, error } = useMutation({
        mutationFn: addOrgMember,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["organization", "member"] });
            if (slug) {
                queryClient.invalidateQueries({ queryKey: ["organization", "member", slug] });
            }
        },
    });

    return {
        mutateAddOrgMember,
        isPending,
        error,
    };
};