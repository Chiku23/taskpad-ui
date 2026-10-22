import { useQuery } from "@tanstack/react-query"
import { getUser } from "../api/authApi"

export const useAuth = () => {
    const { data, isPending, isSuccess, isError } = useQuery({
        queryKey: ["authUser"],
        queryFn: getUser,
        retry: false,
        staleTime: 1000 * 60 * 5,
    });

    return {
        user: data?.data ?? null,
        isPending,
        isAuthenticated: isSuccess && !isError && Boolean(data?.data),
    };
};