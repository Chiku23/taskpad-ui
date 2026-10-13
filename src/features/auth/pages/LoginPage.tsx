import { LoginForm } from "../components/LoginForm";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <div className="flex flex-col bg-app-canvas text-text-main min-h-screen justify-center items-center font-poppins">
      <div className="flex flex-col gap-8 border-1 border-app-border w-sm lg:w-xl p-4 rounded-lg bg-app-card">

        <div className="mt-2">
          <h1 className="text-text-main text-2xl mb-1">Login</h1>
          <p className="text-text-muted">Login below and start your journey</p>
        </div>

        <LoginForm />

        <div>
            <p>
              Don't have a account?{" "}
              <Link to={"/register"} className="underline text-app-brand hover:text-app-brand-hover">
                Click here
              </Link>
            </p>
        </div>
      </div>
    </div>
  );
}

