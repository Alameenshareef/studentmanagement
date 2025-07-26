import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoginForm from "@/components/auth/loginForm";
import { loginUser } from "@/api/authService";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setError("");
    setLoading(true);

    try {
      const response = await loginUser({ email, password });

      if (!response.token) {
        throw new Error("Login failed: No token returned");
      }

      const token = response.token;

      await login(token);
      navigate(response.role === "SuperAdmin" ? "/" : "/");
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center">
 
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-gray-800 dark:text-white">
              Student Management
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Sign in to access your account
            </p>
          </div>

          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800 sm:p-10">
            <LoginForm
              onSubmit={handleSubmit}
              error={error}
              loading={loading}
              buttonText="Sign In"
              showNameField={false}
            />

            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              <p>
                Don't have an account?{" "}
                <a
                  href="/auth/register"
                  className="font-medium text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Register here
                </a>
              </p>
            </div>

            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

          </div>

          <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
            <p>© {new Date().getFullYear()} Student Management. All rights reserved.</p>
            <p className="mt-1">
              <a href="#" className="hover:underline">
                Terms of Service
              </a>{" "}
              |{" "}
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;