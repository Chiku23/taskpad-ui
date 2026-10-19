import { useQuery } from "@tanstack/react-query"
import { getUser } from "../api/authApi"

export const useAuth = () => {
    const token = localStorage.getItem("token");

    const {data: user, isPending, isSuccess} = useQuery({
        queryKey: ["authUser"],
        queryFn: getUser,
        enabled: Boolean(token),
        retry: false
    })

    return {
        user,
        isPending,
        isAuthenticated: Boolean(token) && isSuccess
    }
}