import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import type { LoginPayload } from "../types/authTypes";
import { useOrgStore } from "../../../stores/useOrgStore";
import { useLogin } from "../hooks/useLogin";
import { useToastStore } from "../../../stores/useToastStore";

export const LoginForm = () => {
  const [formData, setFormData] = useState<LoginPayload>({
    email: "",
    password: "",
  });

  const { mutateLogin, isPending } = useLogin();
  const [errorMessage, setErrorMessage] = useState("");
  const { addToast } = useToastStore();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // captures successful registration message or redirect location
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(
    location.state?.message || "",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    mutateLogin(formData, {
      onSuccess: async (response) => {
        if (response.status === "false") {
          setErrorMessage(response.message);
          return;
        }
        //clear cached query and save new user data
        queryClient.clear();
        useOrgStore.getState().clearActiveOrg();
        queryClient.setQueryData(["authUser"], response);
        addToast("Logged in !", "success", 5000);

        // If user was redirected here from a deep link, send them back
        const fromPath = location.state?.from?.pathname;
        if (
          fromPath &&
          fromPath !== "/" &&
          fromPath !== "/login" &&
          fromPath !== "/register" &&
          fromPath !== "/dashboard"
        ) {
          navigate(fromPath, { replace: true });
        } else {
          navigate("dashboard", { replace: true });
        }
      },
      onError: (error) => {
        setErrorMessage(error.message || "An unexpected errro happended")
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        className="bg-app-input-bg px-4 py-2 border-1 border-app-input-border outline-none rounded-lg"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <input
        className="bg-app-input-bg px-4 py-2 border-1 border-app-input-border outline-none rounded-lg"
        type="password"
        id="password"
        placeholder="Enter your Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />

      {/* captured registration message */}
      {successMessage && (
        <div className="text-sm text-green-500">{successMessage}</div>
      )}

      {/* show login related message */}
      {errorMessage && (
        <div className="text-red-400 text-sm">{errorMessage}</div>
      )}

      <button
        className={`bg-app-button hover:bg-app-button-hover py-2 mt-2 rounded-lg shadow-lg cursor-pointer ${
          isPending ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isPending}
      >
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};
