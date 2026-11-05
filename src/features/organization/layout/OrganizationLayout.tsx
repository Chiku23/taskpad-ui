import { Link, useLocation, Outlet, useParams } from "react-router-dom";

import { Icon } from "../../../components/ui/Icon";

import { useOrganizations } from "../hooks/useOrganizations";

const NAV_ITEMS = [
  { id: 1, name: "Projects", path: "project", icon: "project" as const },
  { id: 2, name: "Settings & Members", path: "settings", icon: "settings" as const },
];

export const OrganizationLayout = () => {
  const location = useLocation();
  const { orgSlug } = useParams();
  const { organizationsData } = useOrganizations();

  const organizations = organizationsData?.data.organizations || [];
  const currentOrg = organizations.find((org) => org.slug === orgSlug);

  return (
    <div className="flex flex-col bg-app-canvas min-h-screen">
      <div className="sticky top-0 z-50 flex flex-col gap-2 border-b border-app-border bg-app-canvas pt-5 px-10">
        {/* header */}
        <div className="flex items-center text-text-muted gap-4">
          <div className="flex gap-2 items-center">
            <Icon name="organization" size={30} />
            <h1 className="text-2xl font-semibold capitalize">
              {currentOrg?.name}
            </h1>
          </div>
        </div>

        {/* navigation */}
        <nav className="mt-4">
          <ul className="flex gap-4 text-text-ghost text-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname.endsWith(item.path);

              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-1.5 px-1 pb-2 transition-colors font-semibold ${
                      isActive
                        ? "border-b-2 border-app-button text-text-main"
                        : "hover:text-text-muted"
                    }`}
                  >
                    <Icon name={item.icon} size={16}/>
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* content */}
      <div className="mx-10 my-5 flex items-center">
        <Outlet />
      </div>
    </div>
  );
};
