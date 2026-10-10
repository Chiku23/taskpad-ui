import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { RegisterPage } from "./features/auth/pages/RegisterPage";

/**
 * Renders the login and registration routes within the browser router.
 * @returns The application's authentication routes.
 */
function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/register" element={<RegisterPage />}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
