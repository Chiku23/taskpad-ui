import { useQuery } from "@tanstack/react-query";
import { getOrganizationProjects } from "../api/projectApi";
import type { GetProjectsResponse } from "../types/projectTypes";

// Fetch projects for the given org slug
export const useOrgProjects = (orgSlug: string | undefined) => {
  const { data, isLoading, isError } = useQuery<GetProjectsResponse>({
    queryKey: ["projects", orgSlug],
    queryFn: () => getOrganizationProjects(orgSlug!),
    enabled: !!orgSlug, // only run when orgSlug is known
    retry: false,
  });

  return {
    projects: data?.data.projects ?? [],
    isLoading,
    isError,
  };
};
