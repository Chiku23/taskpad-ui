import { useMutation } from "@tanstack/react-query";
import { updateOrganization } from "../api/organizationApi";

export const useUpdateOrganization = () => {
    const {mutate: mutateUpdateOrganization} = useMutation({
        mutationFn: updateOrganization
    })

    return{
        mutateUpdateOrganization
    }
}