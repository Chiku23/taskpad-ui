import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { RegisterPage } from "./features/auth/pages/RegisterPage";
import { AppLayout } from "./components/layouts/AppLayout";
import { DashboardPage } from "./features/dashboard/pages/Dashboard";
import { IssuesPage } from "./features/issues/pages/IssuesPage";
import { ActivityPage } from "./features/activity/pages/ActivityPages";
import { ProjectLayout } from "./features/projects/layout/ProjectLayout";
import { OrganizationLayout } from "./features/organization/layout/OrganizationLayout";
import { SummaryPage } from "./features/projects/pages/SummaryPage";
import { TaskListPage } from "./features/projects/pages/TaskListPage";
import { TaskBoardPage } from "./features/projects/pages/TaskBoardPage";
import { ProjectListPage } from "./features/organization/pages/ProjectListPage";
import { ProtectedRoute } from "./components/ui/ProtectedRoute";

/**
 * Renders the login and registration routes within the browser router.
 * @returns The application's authentication routes.
 */
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/" element={<AppLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/activity" element={<ActivityPage />} />
              <Route path="/issues" element={<IssuesPage />} />

              <Route path="/projects/:projectId" element={<ProjectLayout />}>
                <Route index element={<Navigate to={"summary"} replace />} />
                <Route path="summary" element={<SummaryPage />} />
                <Route path="list" element={<TaskListPage />} />
                <Route path="board" element={<TaskBoardPage />} />
              </Route>

              <Route
                path="/organization/:orgSlug"
                element={<OrganizationLayout />}
              >
                <Route index element={<Navigate to={"project"} replace />} />
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
