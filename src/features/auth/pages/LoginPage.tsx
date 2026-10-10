import { LoginForm } from "../components/LoginForm";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <div className="flex flex-col bg-app-canvas text-text-main min-h-screen justify-center items-center font-poppins">
      <div className="flex flex-col gap-8 border-2 border-app-border w-sm lg:w-xl p-4 rounded-lg">

        <div className="mt-4">
        <h1 className="text-text-main text-2xl">Login to {""}
          <span className="text-app-brand">Taskpad</span>
        </h1>
        <p className="text-text-ghost">Login below and start your journey</p>
        </div>

        <LoginForm />

        <div>
          <Link to={"/register"} className="underline hover:text-app-brand">
            <p>
             Create an account
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

