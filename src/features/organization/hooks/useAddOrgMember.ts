import { useMutation } from "@tanstack/react-query"
import { addOrgMember } from "../api/organizationApi"

export const useAddOrgMember = () => {
    const {mutate: mutateAddOrgMember, isPending} = useMutation({
        mutationFn: addOrgMember
    }) 

    return {
        mutateAddOrgMember,
        isPending
    }
}