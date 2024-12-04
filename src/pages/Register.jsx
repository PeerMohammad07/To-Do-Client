import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye } from "react-icons/fa6";
import { IoEyeOffSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerApi } from "../api/userApi";
import toast from "react-hot-toast";
import { userLogin } from "../redux/userSlice";
import { useDispatch } from "react-redux";


const registerSchema = z.object({
  name: z.string()
    .trim()
    .min(3, "Name must contain at least 3 letters")
    .refine((name) => name.length > 0, {
      message: "Username cannot be only spaces.",
    }),
  email: z.string()
    .trim()
    .email("Invalid email. Please enter a valid email address."),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password cannot exceed 20 characters")
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter.",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least one lowercase letter.",
    })
    .refine((password) => /\d/.test(password), {
      message: "Password must contain at least one digit.",
    })
    .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
      message: "Password must contain at least one special character.",
    })
    .refine((password) => !/\s/.test(password), {
      message: "Password cannot contain spaces.",
    }),
});

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [eyeState, setEyeState] = useState(false);
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    try {
      const response = await registerApi(data)
      if(response.data.message == "User created successfully"){
        dispatch(userLogin(response.data.data))
        toast.success("Register successfully")
        navigate("/")
      }
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col font-sans">
      <header className="flex justify-between items-center p-5">
        <Link to="/" className="text-gray-800 text-sm flex items-center">
          <FaArrowLeft className="mr-1" />
          Back
        </Link>
        <Link to="/login" className="text-gray-800 text-sm">Log In</Link>
      </header>
      <main className="flex flex-col justify-center items-center flex-1 p-5">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl mb-4">Create Your Account</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5 text-left">
              <label htmlFor="name" className="block text-xs text-gray-600 mb-1 uppercase">USERNAME</label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
            </div>
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
              <div className="relative">
                <input
                  type={eyeState ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                  onClick={() => setEyeState(!eyeState)}
                >
                  {eyeState ? <FaEye /> : <IoEyeOffSharp />}
                </button>
              </div>
              {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded mt-5"
              disabled={loading}
            >
              {loading ? "Creating" : "Create Account"}
            </button>
          </form>
          <p className="text-xs text-gray-600 mt-5">
            By creating an account, you agree to our <Link to="/terms" className="underline">Terms of Service</Link> and have read and understood the <Link to="/privacy" className="underline">Privacy Policy</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;