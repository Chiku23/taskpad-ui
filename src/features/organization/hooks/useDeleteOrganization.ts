import { useMutation } from "@tanstack/react-query";
import { deleteOrganization } from "../api/organizationApi";

export const useDeleteOrganization = () => {
    const {mutate: mutateDeleteOrganization} = useMutation({
        mutationFn: deleteOrganization
    });

    return{
        mutateDeleteOrganization
    }
}