import { useMutation } from "@tanstack/react-query";
import { createOrganization } from "../api/organizationApi";

export const useCreateOrganization = () => {
    const {mutate: mutateCreateOrganization} = useMutation({
        mutationFn: createOrganization
    })

    return{
        mutateCreateOrganization,
    }
}