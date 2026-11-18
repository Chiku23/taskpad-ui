import { useMutation } from "@tanstack/react-query"
import { loginUser } from "../api/authApi"

export const useLogin = () => {
    const {mutate: mutateLogin, isPending} = useMutation({
        mutationFn: loginUser,
    })

    return {
        mutateLogin,
        isPending,
    }
}