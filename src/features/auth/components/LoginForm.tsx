import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import type { LoginPayload } from "../types/authTypes";
import { useQueryClient } from "@tanstack/react-query";

export const LoginForm = () => {
  const [formData, setFormData] = useState<LoginPayload>({
    emailInput: "",
    passwordInput: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  
  // captures successful registration message
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(
    location.state?.message || "",
  );

  const handleSubmit = async (e: React.SubmitEvent) => {
    try {
      e.preventDefault();

      setErrorMessage("");
      setSuccessMessage("");

      const response = await loginUser(formData);
      if (response.status == "false") {
        setErrorMessage(response.message);
        // reset local storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } else {
        //clear cached data from previous session
        queryClient.clear();
        // Store the token and user in local storage after successful login
        const user = response.data;
        if (user?.token) {
          localStorage.setItem("token", user.token);
          localStorage.setItem("user", JSON.stringify(user));
        }
        queryClient.setQueryData(["authUser"], user);
        // navigate to dashboard
        navigate("/dashboard");
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Error occured");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        className="bg-app-input-bg px-4 py-2 border-1 border-app-input-border outline-none rounded-lg"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.emailInput}
        onChange={(e) =>
          setFormData({ ...formData, emailInput: e.target.value })
        }
        required
      />

      <input
        className="bg-app-input-bg px-4 py-2 border-1 border-app-input-border outline-none rounded-lg"
        type="password"
        placeholder="Enter your Password"
        value={formData.passwordInput}
        onChange={(e) =>
          setFormData({ ...formData, passwordInput: e.target.value })
        }
        required
      />

      <div className="min-h-10 flex flex-col justify-center">
        {/* captured registration message */}
        {successMessage && (
          <div className="text-sm text-green-500">{successMessage}</div>
        )}

        {/* show login related message */}
        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}
      </div>

      <button className="bg-app-button hover:bg-app-button-hover py-2 mt-2 rounded-lg shadow-lg cursor-pointer">
        Login
      </button>
    </form>
  );
};
