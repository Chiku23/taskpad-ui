import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { RegisterPage } from "./features/auth/pages/RegisterPage";
import { AppLayout } from "./components/layouts/AppLayout";
import { DashboardPage } from "./features/dashboard/pages/Dashboard";
import { IssuesPage } from "./features/issues/pages/IssuesPage";

/**
 * Renders the login and registration routes within the browser router.
 * @returns The application's authentication routes.
 */
function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="*" element={<Navigate to="/login" replace/>} /> 
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}/>

      <Route path="/" element={<AppLayout />}>
       <Route path="/dashboard" element={<DashboardPage />}/>
       <Route path="/issues" element={<IssuesPage />}/>
      </Route>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
