import { Link, useLocation, Outlet, useParams } from "react-router-dom";

import { VscProject } from "react-icons/vsc";
import { GoOrganization } from "react-icons/go";
import { useOrganizations } from "../hooks/useOrganizations";

const NAV_ITEMS = [
  {id: "1", name: "Projects", path: "project", icon: VscProject},
]

export const OrganizationLayout = () => {
  const location = useLocation();
  const {orgSlug} = useParams();

  const {organizationsData} = useOrganizations();
  const organizations = organizationsData?.data.organizations || [];  
  const currentOrg = organizations.find((org) => org.slug === orgSlug);

  return (
    <div className="flex flex-col bg-app-canvas min-h-screen">
      <div className="sticky top-0 flex flex-col gap-2 border-b border-app-border bg-app-canvas pt-5 px-10">
        {/* header */}
        <div className="flex items-center text-text-muted gap-1">
          <GoOrganization className="size-8"/>
          <h1 className="text-2xl font-semibold capitalize">{currentOrg?.name}</h1>
        </div>

        {/* navigation */}
        <nav className="mt-4">
          <ul className="flex gap-4 text-text-ghost text-sm">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.endsWith(item.path);
  
              return(
                <li key={item.id}> 
                <Link to={item.path} className={`flex items-center gap-1 px-1 pb-1 ${isActive ? "border-b-2 border-text-muted": ""}`}>
                    <Icon className="size-6" />
                    <span>{item.name}</span>
                </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

        {/*content */}
        <div className="p-10">
            <Outlet />
        </div>
    </div>
  );
};
