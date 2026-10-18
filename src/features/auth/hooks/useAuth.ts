import { useQuery } from "@tanstack/react-query"
import { getUser } from "../api/authApi"

export const useAuth = () => {
    const token = localStorage.getItem("token");

    const {data: user, isError} = useQuery({
        queryKey: ["authUser"],
        queryFn: getUser,
        enabled: Boolean(token),
        retry: false
    })

    return {
        user,
        isAuthenticated: Boolean(token) && !isError
    }
}