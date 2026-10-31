# Organization Verification & Slug-Based Routing Guide

This document outlines the implementation plan for verifying a user's organization on page load, blocking access until an organization exists, and enforcing organization-scoped routing (`localhost:5173/:orgSlug/...`).

---

## 1. Objectives

1. **Organization Check on Page Load**:
   - Check if the authenticated user belongs to at least one organization.
   - If no organization exists, block the entire UI with a non-dismissible prompt to create one.
   - Prevent all background interactions, sidebar navigation, and outlet mounting until creation succeeds.

2. **Always Selected Organization & URL Slug**:
   - Auto-select the first organization if none is explicitly specified in the URL.
   - Route all main workspace views under `/:orgSlug/` (e.g., `/:orgSlug/dashboard`, `/:orgSlug/issues`).
   - Reflect the active organization name in the topbar.
   - Automatically redirect the user to the newly created organization's slug after form submission.

---

## 2. File Changes

### 1. [App.tsx](file:///c:/Projects/taskpad/taskpad/src/App.tsx)
Nest authenticated workspace routes under the `:orgSlug` parameter.

```tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { RegisterPage } from "./features/auth/pages/RegisterPage";
import { AppLayout } from "./components/layouts/AppLayout";
import { DashboardPage } from "./features/dashboard/pages/Dashboard";
import { IssuesPage } from "./features/issues/pages/IssuesPage";
import { ActivityPage } from "./features/activity/pages/ActivityPages";
import { ProjectLayout } from "./features/projects/layout/ProjectLayout";
import { SummaryPage } from "./features/projects/pages/SummaryPage";
import { TaskListPage } from "./features/projects/pages/TaskListPage";
import { TaskBoardPage } from "./features/projects/pages/TaskBoardPage";
import { ProjectListPage } from "./features/organization/pages/ProjectListPage";
import { ProtectedRoute } from "./components/ui/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/" element={<AppLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/:orgSlug">
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="activity" element={<ActivityPage />} />
                <Route path="issues" element={<IssuesPage />} />

                <Route path="projects/:projectId" element={<ProjectLayout />}>
                  <Route index element={<Navigate to="summary" replace />} />
                  <Route path="summary" element={<SummaryPage />} />
                  <Route path="list" element={<TaskListPage />} />
                  <Route path="board" element={<TaskBoardPage />} />
                </Route>

                <Route path="project" element={<ProjectListPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
```

---

### 2. [AppLayout.tsx](file:///c:/Projects/taskpad/taskpad/src/components/layouts/AppLayout.tsx)
Handles the organization check, displays the blocking creation view if none exist, resolves the active organization, and redirects when the URL slug is missing or invalid.

```tsx
import { Outlet, useParams, Navigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useState } from "react";
import { ModalRegistry } from "../modals/ModalRegistry";
import { useModalStore } from "../../stores/useModalStore";
import { useOrganizations } from "../../features/organization/hooks/useOrganizations";
import { CreateOrganizationModal } from "../../features/organization/components/CreateOrganizationModal";

export const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { orgSlug } = useParams();

  const { organizationsData, isLoading } = useOrganizations();
  const organizations = organizationsData?.data?.organizations ?? [];

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const onOrganizationChange = () => {
    useModalStore.getState().openModal("create_organization");
  };

  // Verification loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-app-canvas text-sm font-medium text-text-ghost font-public-sans">
        Loading...
      </div>
    );
  }

  // Blocking view: forces organization creation before any layout renders
  if (organizations.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-app-canvas p-4 font-public-sans">
        <div className="w-full max-w-md rounded-xl border border-app-border bg-app-sidebar p-6 shadow-xl">
          <h2 className="mb-1 text-base font-bold text-text-main">
            Create an Organization
          </h2>
          <p className="mb-5 text-xs text-text-muted">
            You must create an organization to get started with TaskPad.
          </p>
          <CreateOrganizationModal onSuccess={() => {}} />
        </div>
      </div>
    );
  }

  // Resolve matching organization or fallback to the first available organization
  const currentOrg = organizations.find((org) => org.slug === orgSlug) || organizations[0];

  // Enforce the slug in the URL if visited without one or on mismatch
  if (!orgSlug || orgSlug !== currentOrg.slug) {
    return <Navigate to={`/${currentOrg.slug}/dashboard`} replace />;
  }

  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden font-public-sans">
      <Topbar
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        onOrganizationChange={onOrganizationChange}
        selectedOrganizationName={currentOrg.name}
      />
      <div className="flex flex-1 min-h-0">
        <Sidebar isOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
        <ModalRegistry />
      </div>
    </div>
  );
};
```

---

### 3. [Sidebar.tsx](file:///c:/Projects/taskpad/taskpad/src/components/layouts/Sidebar.tsx)
Ensures navigation links preserve the current organization slug.

```tsx
import { Link, useLocation, useParams } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { VscIssues } from "react-icons/vsc";
import { FaRegUserCircle } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
}

const NAV_ITEMS = [
  {
    id: "1",
    name: "For you",
    path: "activity",
    icon: FaRegUserCircle,
  },
  {
    id: "2",
    name: "Dashboard",
    path: "dashboard",
    icon: MdOutlineSpaceDashboard,
  },
  {
    id: "3",
    name: "Issues",
    path: "issues",
    icon: VscIssues,
    issueCount: 5,
  },
];

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  const { orgSlug } = useParams();

  return (
    <div
      {...(!isOpen ? { inert: true } : {})}
      className={`bg-app-sidebar font-semibold border-r border-app-border overflow-hidden h-screen text-sm text-text-muted shadow-lg ${
        isOpen ? "w-64 md:w-sm p-4" : "w-0 p-0"
      }`}
    >
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const targetUrl = `/${orgSlug}/${item.path}`;
          const isActive = location.pathname.startsWith(targetUrl);
          const Icon = item.icon;

          return (
            <div key={item.id} className="flex flex-col w-full">
              <div
                className={`group flex items-center justify-between rounded-lg p-1 ${
                  isActive
                    ? "bg-app-item-active text-text-main"
                    : "hover:bg-app-item-hover"
                }`}
              >
                <Link
                  to={targetUrl}
                  className="flex items-center gap-2 flex-1 min-w-0 p-0.5"
                >
                  <span className="size-5 flex items-center justify-center shrink-0">
                    <Icon className="size-5" />
                  </span>
                  <p className="truncate">{item.name}</p>
                </Link>

                {item.issueCount !== undefined && (
                  <span className="bg-app-button text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full text-center">
                    {item.issueCount}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
};
```

---

### 4. [CreateOrganizationModal.tsx](file:///c:/Projects/taskpad/taskpad/src/features/organization/components/CreateOrganizationModal.tsx)
Navigates the user to the newly created organization's dashboard URL upon submission success.

```tsx
import { useCreateOrganization } from "../hooks/useCreateOrganization";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateSlug } from "../../../utils/generateSlug";

interface CreateOrganizationModalProps {
  onSuccess: () => void;
}

export const CreateOrganizationModal = ({ onSuccess }: CreateOrganizationModalProps) => {
  const [orgName, setOrgName] = useState("");
  const orgSlugName = generateSlug(orgName);
  const navigate = useNavigate();

  const { mutateCreateOrganization, isPending } = useCreateOrganization();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    mutateCreateOrganization(
      { name: orgName, slug: orgSlugName },
      {
        onSuccess: () => {
          onSuccess();
          navigate(`/${orgSlugName}/dashboard`);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="org-name"
          className="text-xs font-bold text-text-ghost uppercase tracking-wide"
        >
          Organization Name
        </label>
        <input
          id="org-name"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          className="text-text-main text-sm border border-app-border bg-app-input-bg px-4 py-2 rounded-lg font-semibold w-full outline-none focus:border-app-input-focus"
          type="text"
          placeholder="e.g. Zeta pvt. ltd."
          required
        />
      </div>
      <button
        type="submit"
        disabled={isPending || !orgName.trim()}
        className="mt-6 w-full bg-app-button hover:bg-app-button-hover text-black font-semibold rounded-lg px-4 py-2 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Creating..." : "Create Organization"}
      </button>
    </form>
  );
};
```

---

## 3. Runtime Flow Summary

1. **Initial Page Load**:
   - `useOrganizations` query runs.
   - If user has 0 organizations:
     - `AppLayout` renders the centered creation card only.
     - Topbar, Sidebar, and child routes (`<Outlet />`) remain unmounted.
2. **Organization Created**:
   - `useCreateOrganization` mutation succeeds and invalidates `["organizations"]`.
   - The handler navigates directly to `/:orgSlug/dashboard`.
   - TanStack Query refetches; `organizations.length > 0` condition is satisfied.
   - Main layout mounts immediately.
3. **Subsequent Visits (`localhost:5173/`)**:
   - `AppLayout` detects missing `orgSlug` parameter.
   - `Navigate` component redirects to `/${organizations[0].slug}/dashboard`.
   - `Topbar` displays the active organization name.
