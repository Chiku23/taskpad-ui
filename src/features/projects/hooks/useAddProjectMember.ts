import { useMutation } from "@tanstack/react-query"
import { addProjectMember } from "../api/projectsApi"
export const useAddProjectMember = () => {
    const {mutate: mutateAddMember} = useMutation({
        mutationFn: addProjectMember
    });

    return {
        mutateAddMember
    }
}