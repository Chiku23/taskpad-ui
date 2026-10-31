import { Outlet, useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useEffect, useState } from "react";
import { ModalRegistry } from "../modals/ModalRegistry";
import { useModalStore } from "../../stores/useModalStore";
import { useOrganizations } from "../../features/organization/hooks/useOrganizations";
import { useOrgStore } from "../../stores/useOrgStore";

export const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { orgSlug } = useParams<{ orgSlug: string }>();
  const navigate = useNavigate();

  const { organizationsData, isLoading } = useOrganizations();
  const { setActiveOrg } = useOrgStore();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // When Page loads, check if an organization exist, If yes set that organization or the first organization as active
  // If no organization exist prompt the user to create an organization
  useEffect(() => {
    if (isLoading) return;

    const orgs = organizationsData?.data.organizations ?? [];

    if (orgs.length === 0) {
      // No organizations found — prompt user to create one
      useModalStore.getState().openModal("create_organization");
      return;
    }

    // Try to match the slug in the URL against the user's orgs
    const matchedOrg = orgs.find((o) => o.slug === orgSlug);

    if (!matchedOrg) {
      // Slug is invalid or missing — fall back to the saved org or first org
      const savedSlug = localStorage.getItem("active_org_slug");
      const fallbackOrg = orgs.find((o) => o.slug === savedSlug) ?? orgs[0];
      navigate(`/${fallbackOrg.slug}/dashboard`, { replace: true });
      return;
    }

    // Set the matched org as active in the global store & persist
    setActiveOrg(matchedOrg);
    localStorage.setItem("active_org_slug", matchedOrg.slug);
  }, [isLoading, organizationsData, orgSlug, navigate, setActiveOrg]);

  return (
    //no full window scrolling
    <div className="relative flex flex-col h-screen w-full overflow-hidden font-public-sans">
      <div className="relative z-50">
        <Topbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>
      <div className="flex flex-1 min-h-0">
        <Sidebar isOpen={isSidebarOpen} />

        {/* Only outlet contents are allowed to scroll */}
        <main className="flex-1 overflow-y-auto z-10 bg-app-canvas">
          <Outlet />
        </main>
        <ModalRegistry />
      </div>
    </div>
  );
};
