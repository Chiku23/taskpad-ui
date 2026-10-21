import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrganization } from "../api/organizationApi";

export const useCreateOrganization = () => {
    const queryClient = useQueryClient();
    const {mutate: mutateCreateOrganization, isPending} = useMutation({
        mutationFn: createOrganization,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["organizations"]});
        }
    })

    return{
        mutateCreateOrganization,
        isPending
    }
}