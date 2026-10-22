import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export const ProtectedRoute = () => {
  const { isAuthenticated, isPending } = useAuth();
  const location = useLocation();

  if (isPending) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6">
        <AiOutlineLoading3Quarters className="size-8 animate-spin text-blue-500"/>
        <p className="text-sm font-medium text-text-ghost">
          Verifying user...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
