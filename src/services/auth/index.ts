import { SignInSchema, SignUpSchema } from "@/utils/validation/auth";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { InferType } from "yup";
import { SERVER_URI } from "@/utils/constants/common";
import { signOut } from "next-auth/react";

type ISignUpWithProvider = {
  email: string;
  fullName: string;
  avatar: string;
  provider: string;
};

type ISignInWithProvider = { email: string; provider: string };

type ISignUp = InferType<typeof SignUpSchema> | ISignUpWithProvider;
type ISignIn = InferType<typeof SignInSchema> | ISignInWithProvider;

const authRouteAxios = axios.create({
  baseURL: SERVER_URI + "/auth",
});

authRouteAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const message = axiosError.response?.data as string;
      console.log("Error: ", axiosError);

      toast.error(message);
    }
    return Promise.reject(error);
  }
);

export const verifyEmail = async (email: string) => {
  try {
    const res = await authRouteAxios.post<string>("/verify-email", { email });
    toast("We have sent captchat to your email \n Please check your email");
    return res.data;
  } catch (err) {}
};

export const signUp = async (values: ISignUp) => {
  try {
    const res = await authRouteAxios.post<Omit<IUser, "accessToken" | "hashedPassword">>(
      "/sign-up",
      values
    );
    toast.success("Sign up successfully");
    return res.data;
  } catch (error) {}
};

export const signUpWithFetch = async ({
  email,
  avatar,
  fullName,
  provider,
}: {
  email: string;
  avatar: IAttachment;
  fullName: string;
  provider: string;
}) => {
  try {
    const res = await fetch(SERVER_URI + "/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        avatar,
        fullName,
        provider,
      }),
    });
    return await res.json();
  } catch (error) {
    toast.error("Sign up failed");
    Promise.reject(error);
  }
};

export const signIn = async (values: ISignIn) => {
  try {
    const res = await authRouteAxios.post<IUser>("/sign-in", values);
    return res.data;
  } catch (error) {}
};

export const signInByFetch = async ({ email, password }: { email: string; password: string }) => {
  const res = await fetch(SERVER_URI + "/auth/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return res;
};

export const checkExistEmailAndProvider = async (email: string, provider: string) => {
  try {
    const res = await authRouteAxios.post("/exist-email-and-provider", {
      email,
      provider,
    });

    return res.data;
  } catch (error) {}
};

export const sendNewPasswordToEmail = async (email: string) => {
  try {
    const result = await authRouteAxios.post<boolean>("/forgot-password", { email });
    toast.success("Let's check your email");
    return result.data;
  } catch (error) {}
};

export const refreshToken = async (refreshToken: string) => {
  try {
    const res = await authRouteAxios.post<{ accessToken: string; refreshToken: string }>(
      "/refresh-token",
      {
        refreshToken,
      }
    );
    return res.data;
  } catch (error) {
    signOut();
  }
};
