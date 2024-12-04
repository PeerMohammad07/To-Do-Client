import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginApi } from "../api/userApi"; 
import toast from "react-hot-toast";
import { userLogin } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const loginSchema = z.object({
  email: z.string()
    .trim()
    .email("Invalid email. Please enter a valid email address.")
    .refine((email) => email.length > 0, {
      message: "Email cannot be empty.",
    }),
  password: z.string()
    .trim()
    .min(1, "Password cannot be empty."),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await loginApi(data);       
      if (response.data.message === "User Login Successfully") {
        dispatch(userLogin(response.data.data))
        toast.success("Logged in successfully!");
        navigate("/");
      }
    } catch (error) {      
      toast.error(error.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col font-sans">
      <header className="flex justify-between items-center p-5">
        <Link to="/" className="text-gray-800 text-sm flex items-center">
          Back
        </Link>
        <Link to="/register" className="text-gray-800 text-sm">Sign Up</Link>
      </header>
      <main className="flex flex-col justify-center items-center flex-1 p-5">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl mb-4">Welcome Back</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5 text-left">
              <label htmlFor="email" className="block text-xs text-gray-600 mb-1 uppercase">EMAIL ADDRESS</label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-5 text-left">
              <label htmlFor="password" className="block text-xs text-gray-600 mb-1 uppercase">PASSWORD</label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded mt-5"
              disabled={loading}
            >
              {loading ? "Logging In" : "Log In"}
            </button>
          </form>
          <p className="text-xs text-gray-600 mt-5">
            Don't have an account? <Link to="/register" className="underline">Sign Up</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;