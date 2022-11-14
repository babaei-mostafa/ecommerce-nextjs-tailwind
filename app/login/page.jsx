"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { getError } from "../../utils/error";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const LoginScreen = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const direct = useSearchParams();

  useEffect(() => {
    if (session?.user) {
      router.push(direct || "/");
    }
  }, [router, session, direct]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <div className="max-w-[1640px] mx-auto flex my-8">
      <form
        className="max-w-screen-md mx-auto"
        onSubmit={handleSubmit(handleLogin)}
      >
        <h1 className="text-xl">Login</h1>
        <div className="mt-4">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter a valid email",
              },
            })}
            id="email"
            type="email"
            className="w-full"
            autoFocus
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: "Please enter password",
              minLength: {
                value: 6,
                message: "Password must contain at least 6 characters",
              },
            })}
            id="password"
            type="password"
            className="w-full"
            autoFocus
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>

        <div className="mt-4">
          <button className="primary-button">Login</button>
        </div>
        <div className="mt-4">
          Don&apos;t have an account? <Link href="/login">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
