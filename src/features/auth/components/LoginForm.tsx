import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { getOrganizations } from "../../organization/api/organizationApi";
import { useOrgStore } from "../../../stores/useOrgStore";
import type { LoginPayload } from "../types/authTypes";
import { useQueryClient } from "@tanstack/react-query";

export const LoginForm = () => {
  const [formData, setFormData] = useState<LoginPayload>({
    emailInput: "",
    passwordInput: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // captures successful registration message or redirect location
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(
    location.state?.message || ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      setErrorMessage("");
      setSuccessMessage("");
      setLoading(true);

      const response = await loginUser(formData);
      if (response.status === "false") {
        setErrorMessage(response.message);
        setLoading(false);
      } else {
        queryClient.clear();
        useOrgStore.getState().clearActiveOrg();
        queryClient.setQueryData(["authUser"], response);

        try {
          const orgsResponse = await getOrganizations();
          const orgs = orgsResponse?.data?.organizations ?? [];

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
          } else if (orgs.length > 0) {
            const savedSlug = localStorage.getItem("active_org_slug");
            const targetOrg = orgs.find((o) => o.slug === savedSlug) ?? orgs[0];

            useOrgStore.getState().setActiveOrg(targetOrg);
            localStorage.setItem("active_org_slug", targetOrg.slug);
            navigate(`/${targetOrg.slug}/dashboard`, { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        } catch {
          navigate("/", { replace: true });
        } finally {
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
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
        id="password"
        placeholder="Enter your Password"
        value={formData.passwordInput}
        onChange={(e) =>
          setFormData({ ...formData, passwordInput: e.target.value })
        }
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
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};
