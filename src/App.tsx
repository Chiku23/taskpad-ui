import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
      <Route path="/" element={<Navigate to="/login" replace/>}/>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}/>
      <Route path="*" element={<Navigate to="/login" replace/>} /> 
     </Routes>
    </BrowserRouter>
  );
}

export default App;
