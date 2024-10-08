"use client";

import React from "react";
import { poppins } from "@/app/ui/fonts";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

import { usePostSignupMutation } from "@/app/store/services/authApi";
import { updateUser } from "@/app/store/features/userSlice";
import { useDispatch } from "react-redux";
import GoogleLoginButton from "@/app/components/googleLoginButton";

type formFields = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

interface ErrorResponse {
  message: string;
}

const SignupPage = () => {
  const [
    registerUser,
    { isError, isLoading, data: userInfo, error, isSuccess },
  ] = usePostSignupMutation();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState, watch } = useForm<formFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
  });
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const onSubmit = async (data: formFields) => {
    dispatch(updateUser(data));
    await registerUser(data);
  };

  if (userInfo && isSuccess) {
    redirect("/otp-verify");
  }

  return (
    <div className="flex items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col items-center justify-around  w-full p-6 sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-1/3 lg:px-16"
      >
        <h1
          className={`${poppins.className} text-[#25324B] text-4xl font-black `}
        >
          Sign Up Today!
        </h1>

        <GoogleLoginButton />
        <div className="flex w-full justify-between items-center my-4 ">
          <hr className="w-1/4  bg-black" />
          <span className="text-gray-500">Or Sign Up with Email</span>
          <hr className="w-1/4  bg-black" />
        </div>

        <label className="w-full font-[600] text-[#515B6F] mb-1" htmlFor="name">
          Full Name
        </label>
        <input
          className="w-full rounded-md border-[1px] border-[#D6DDEB] text-gray-700 p-2 mb-4"
          type="text"
          id="name"
          {...register("name", { required: "Name is required!" })}
          placeholder="Enter full name"
        />
        {errors?.name && (
          <p className="w-full text-xs text-red-500 text-end mt-[-14px]">
            {errors.name.message}{" "}
          </p>
        )}
        <label
          className="w-full font-[600] text-[#515B6F] mb-1"
          htmlFor="email"
        >
          Email Address
        </label>
        <input
          className="w-full rounded-md border-[1px] border-[#D6DDEB] text-gray-700 p-2 mb-4"
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required!",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address!",
            },
          })}
          placeholder="Enter email address"
        />
        {errors?.email && (
          <p className="w-full text-xs text-red-500 text-end mt-[-14px]">
            {errors.email.message}
          </p>
        )}
        <label
          className="w-full font-[600] text-[#515B6F] mb-1"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="w-full rounded-md border-[1px] border-[#D6DDEB] text-gray-700 p-2 mb-4"
          type="password"
          id="password"
          {...register("password", {
            required: "Password is required!",
            minLength: {
              value: 6,
              message: "password length minimum of 6 charachter",
            },
          })}
          placeholder="Enter password"
        />
        {errors?.password && (
          <p className="w-full text-xs text-red-500 text-end mt-[-14px]">
            {errors.password.message}
          </p>
        )}
        <label
          className="w-full font-[600] text-[#515B6F] mb-1"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          className="w-full rounded-md border-[1px] border-[#D6DDEB] text-gray-700 p-2 mb-4"
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "Confirm password is required!",
            validate: (value) =>
              value === watch("password") || "Passwords do not match!",
          })}
          placeholder="Confirm password"
        />
        {errors?.confirmPassword && (
          <p className="w-full text-xs text-red-500 text-end mt-[-14px]">
            {errors.confirmPassword.message}{" "}
          </p>
        )}

        {isError && "data" in error && (
          <p className="w-full text-xs text-red-500 ">
            {(error.data as ErrorResponse).message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className={`${
            isSubmitting ? "bg-indigo-600" : "bg-[#4640DE]"
          } rounded-full text-white w-full py-2 text-sm my-2 font-bold hover:bg-indigo-700`}
        >
          continue
        </button>
        {isSuccess && isSubmitSuccessful && (
          <p className="w-full text-sm font-bold text-indigo-500 text-center my-2">
            your data submitted successfully!
          </p>
        )}

        <p className="text-sm my-4 text-gray-500 w-full text-start">
          Already have an account?
          <Link href="/signin" className="text-indigo-900 ml-2 font-semibold">
            Login
          </Link>
        </p>
        <p className="text-[14px] text-gray-500">
          By clicking 'Continue', you acknowledge that you have read and
          accepted our
          <span className="text-indigo-900 font-medium">Terms of Service</span>
          and
          <span className="text-indigo-900 font-medium"> Privacy Policy</span>.
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
