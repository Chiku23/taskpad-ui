import { useQuery } from "@tanstack/react-query";
import { getOrganization } from "../api/organizationApi";

export const useOrganization = (slug: string) => {
    const {data: organization} = useQuery({
        queryKey: ["organization", slug],
        queryFn: () => getOrganization(slug)
    });

    return{
        organization
    }
}