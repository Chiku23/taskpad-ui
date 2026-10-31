import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOrganizations } from "../features/organization/hooks/useOrganizations";
import { useModalStore } from "../stores/useModalStore";

/**
 * Rendered at the root "/" route.
 * - Fetches the user's organizations.
 * - If at least one exists → redirect to /:firstOrgSlug/dashboard.
 * - If none exist → open the "create organization" modal.
 */
export const OrgRedirect = () => {
  const navigate = useNavigate();
  const { organizationsData, isLoading } = useOrganizations();

  useEffect(() => {
    if (isLoading) return;

    const orgs = organizationsData?.data.organizations ?? [];

    if (orgs.length === 0) {
      // No org yet — prompt to create one
      useModalStore.getState().openModal("create_organization");
      return;
    }

    // Redirect to the first organization's dashboard
    navigate(`/${orgs[0].slug}/dashboard`, { replace: true });
  }, [isLoading, organizationsData, navigate]);

  // Show nothing while we are loading / redirecting
  return null;
};
