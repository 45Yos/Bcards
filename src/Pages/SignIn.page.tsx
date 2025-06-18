import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../components/AuthContext";
import { toast } from "react-toastify";
import { HiEye, HiEyeOff } from "react-icons/hi";

const SignInPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  let tries = 0;
  const storageTries = localStorage.getItem("tries");
  const numberStorageTries = parseInt(storageTries || "0");

  const initialFormData = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: initialFormData,
    mode: "onChange",
  });

  const submit = async (form: typeof initialFormData) => {
    setLoading(true);
    setError("");

    if (numberStorageTries < 3) {
      try {
        const response = await axios.post(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
          form,
        );

        toast.success("Login successful!");

        login(response.data);
        setLoading(false);

        setTimeout(() => {
          window.location.href = "/home";
        }, 2000);
      } catch (error) {
        console.error("Login failed:", error);

        const numberTries = () => {
          if (storageTries) {
            if (parseInt(storageTries) < 3) {
              tries = parseInt(storageTries);
              localStorage.setItem("tries", (tries + 1).toString());
              setError("Login failed. Please check your Email and Password.");
            } else if (parseInt(storageTries) >= 3) {
              setError("Too many failed attempts. Please try again later.");
              setTimeout(() => {
                window.location.href = "/";
              }, 1000);
            }
          } else {
            localStorage.setItem("tries", "1");
            tries = 1;
          }
        };

        numberTries();

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    } else {
      const lastLoginAttempt = localStorage.getItem("lastLoginAttempt");
      const now = new Date().getTime();
      let hourPassed = 0;

      if (!lastLoginAttempt) {
        localStorage.setItem("lastLoginAttempt", JSON.stringify(now));
      }

      const checkTimeLeft = () => {
        const parsed = JSON.parse(lastLoginAttempt || "0");
        hourPassed = (now - parsed) / (1000 * 60 * 60);
        const timeLeft = 24 - hourPassed;

        const hours = Math.floor(timeLeft);
        const minutes = Math.floor((timeLeft - hours) * 60);
        const seconds = Math.floor(((timeLeft - hours) * 60 - minutes) * 60);

        const paddedHours = String(hours).padStart(2, "0");
        const paddedMinutes = String(minutes).padStart(2, "0");
        const paddedSeconds = String(seconds).padStart(2, "0");

        if (timeLeft > 24) {
          localStorage.removeItem("lastLoginAttempt");
        } else {
          toast.error(
            `You are banned for 24 hours. Please try again in ${paddedHours}:${paddedMinutes}:${paddedSeconds}  Hours`,
          );

          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
      };

      checkTimeLeft();

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center bg-gray-100 dark:bg-gray-800">
      <h1 className="mb-4 mt-40 text-3xl font-bold">Sign In</h1>

      <form
        onSubmit={handleSubmit(submit)}
        className="h-2/5 w-80 rounded-3xl bg-slate-400 p-6 shadow-md dark:bg-blue-200 dark:text-black"
      >
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            id="email"
            className={`w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password")}
              name="password"
              className={`w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showPassword ? (
                <HiEyeOff className="size-5" />
              ) : (
                <HiEye className="size-5" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid || loading}
          className="mt-10 w-full rounded bg-stone-700 py-2 text-white transition duration-200 hover:bg-stone-800 focus:outline-none dark:bg-cyan-900 dark:hover:bg-cyan-800"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-900 hover:underline">
            Sign Up
          </a>
        </p>

        {error && <p className="text-center text-xl text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default SignInPage;
