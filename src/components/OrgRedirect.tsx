import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOrganizations } from "../features/organization/hooks/useOrganizations";
import { useModalStore } from "../stores/useModalStore";
import { useOrgStore } from "../stores/useOrgStore";
import { ModalRegistry } from "./modals/ModalRegistry";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

/**
 * Rendered at the root "/" route.
 * - Fetches the user's organizations.
 * - If at least one exists → redirect to /:targetOrgSlug/dashboard.
 * - If none exist → prompts user to create one and renders ModalRegistry.
 */
export const OrgRedirect = () => {
  const navigate = useNavigate();
  const { organizationsData, isLoading } = useOrganizations();
  const { setActiveOrg } = useOrgStore();

  useEffect(() => {
    if (isLoading) return;

    const orgs = organizationsData?.data.organizations ?? [];

    if (orgs.length === 0) {
      // No org yet — prompt to create one
      useModalStore.getState().openModal("create_organization");
      return;
    }

    const savedSlug = localStorage.getItem("active_org_slug");
    const targetOrg = orgs.find((o) => o.slug === savedSlug) ?? orgs[0];

    setActiveOrg(targetOrg);
    localStorage.setItem("active_org_slug", targetOrg.slug);
    navigate(`/${targetOrg.slug}/dashboard`, { replace: true });
  }, [isLoading, organizationsData, navigate, setActiveOrg]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-app-canvas text-text-muted">
        <AiOutlineLoading3Quarters className="size-6 animate-spin" />
      </div>
    );
  }

  // If no orgs found, show fallback screen and ensure ModalRegistry is mounted
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center bg-app-canvas text-text-muted gap-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-text-main">Welcome to TaskPad</h2>
        <p className="text-sm text-text-muted mt-1">
          You don't belong to any organization yet.
        </p>
      </div>
      <button
        onClick={() => useModalStore.getState().openModal("create_organization")}
        className="bg-app-button hover:bg-app-button-hover text-black font-semibold px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors"
      >
        Create an Organization
      </button>
      <ModalRegistry />
    </div>
  );
};
