import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SearchBar } from "../ui/SearchBar";
import { CreateTaskButton } from "../../features/dashboard/components/CreateTaskButton";
import { ProfileDropdown } from "../../features/auth/components/ProfilleDropdown";
import { Icon } from "../ui/Icon";

import { useOrgStore } from "../../stores/useOrgStore";
import { useOrganizations } from "../../features/organization/hooks/useOrganizations";
import { useModalStore } from "../../stores/useModalStore";

interface TopbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Topbar = ({ onToggleSidebar, isSidebarOpen }: TopbarProps) => {
  const navigate = useNavigate();
  const { orgSlug } = useParams<{ orgSlug: string }>();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { activeOrg } = useOrgStore();
  const { organizationsData } = useOrganizations();
  const organizations = organizationsData?.data.organizations ?? [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchOrg = (slug: string) => {
    setDropdownOpen(false);
    navigate(`/${slug}/dashboard`);
  };

  const openCreateOrg = () => {
    setDropdownOpen(false);
    useModalStore.getState().openModal("create_organization");
  };

  const currentOrgSlug = orgSlug || activeOrg?.slug || "";

  return (
    <div className="p-3 sticky top-0 w-full bg-app-topbar grid grid-cols-3 items-center border-y border-app-border">
      {/* Sidebar toggle */}
      <div className="flex items-center gap-4 text-text-muted">
        <button
          onClick={onToggleSidebar}
          title={isSidebarOpen ? "Close Sidebar" : "Open sidebar"}
          aria-label={isSidebarOpen ? "Close Sidebar" : "Open sidebar"}
          className="hover:opacity-80 transition-opacity cursor-pointer"
        >
          {isSidebarOpen ? (
            <Icon name="sidebarClose" className="size-6" />
          ) : (
            <Icon name="sidebarOpen" className="size-6" />
          )}
        </button>

        {/* App Logo */}
        <div className="flex flex-col justify-center cursor-pointer">
          <p className="text-xl font-semibold text-app-brand m-0 leading-none">
            TaskPad
          </p>
        </div>

        {/* Organization switcher */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer"
            title="Switch Organization"
            aria-label="Switch Organization"
          >
            <Icon name="organization" size={20}/>
            <span className="text-sm font-semibold truncate max-w-32">
              {activeOrg?.name ?? "…"}
            </span>
          </button>

          {/* organization Dropdown */}
          {dropdownOpen && (
            <div className="absolute left-0 top-full mt-2 w-56 rounded-lg border border-app-border bg-app-sidebar shadow-xl z-50 py-1 overflow-hidden">
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-ghost px-3 pt-2 pb-1">
                Your organizations
              </p>

              {organizations.map((org) => (
                <button
                  key={org.id}
                  onClick={() => switchOrg(org.slug)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-app-item-hover transition-colors ${
                    org.id === activeOrg?.id
                      ? "text-text-main font-semibold"
                      : "text-text-muted"
                  }`}
                >
                  <Icon name="organization" size={16} className="shrink-0" />
                  <span className="truncate">{org.name}</span>
                  {org.id === activeOrg?.id && (
                    <span className="ml-auto text-[10px] bg-app-button text-white px-1.5 py-0.5 rounded-full">
                      active
                    </span>
                  )}
                </button>
              ))}

              <div className="border-t border-app-border mt-1 pt-1">
                <button
                  onClick={openCreateOrg}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text-muted hover:bg-app-item-hover transition-colors"
                >
                  <Icon name="plus" size={16} />
                  <span>Create organization</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search & Create task Button */}
      <div className="flex items-center gap-2 w-full h-full">
        <SearchBar
          className="text-sm bg-app-input-bg"
          placeholder="Type here...."
        />
        <CreateTaskButton slug={currentOrgSlug} />
      </div>

      {/* notification, app setting and profile */}
      <div className="flex items-center gap-4 text-text-muted justify-self-end">
        <button className="hover:opacity-80 transition-opacity cursor-pointer">
          <Icon name="notification" size={20}/>
        </button>
        <button
          onClick={() => {
            if (currentOrgSlug) {
              navigate(`/${currentOrgSlug}/organization/settings`);
            }
          }}
          title="Organization Settings"
          aria-label="Organization Settings"
          className="hover:opacity-80 transition-opacity cursor-pointer"
        >
          <Icon name="settings" size={20} />
        </button>
        {/* Profile Dropdown */}
        <ProfileDropdown />
      </div>
    </div>
  );
};
