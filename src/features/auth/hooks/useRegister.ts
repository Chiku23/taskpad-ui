import { useMutation } from "@tanstack/react-query"
import { registerUser } from "../api/authApi"

export const useRegister = () => {
    const {mutate: mutateRegister, isPending} = useMutation({
        mutationFn: registerUser
    });

    return{
        mutateRegister,
        isPending
    }
}