import { SignInSchema, SignUpSchema } from "@/utils/validation/auth";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { InferType } from "yup";
import "react-toastify/dist/ReactToastify.css";
import { SERVER_URI } from "@/utils/constants/common";

type ISignUp = InferType<typeof SignUpSchema>;
type ISignIn = InferType<typeof SignInSchema>;

const authAxios = axios.create({
  baseURL: SERVER_URI + "/auth",
});

authAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const message = axiosError.response?.data as string;
      toast.error(message, {
        autoClose: false,
        type: "error",
        theme: "colored",
        style: {
          background: "#d32f2f",
        },
      });
    }
    return Promise.reject(error);
  }
);

export const verifyEmail = async (email: string) => {
  try {
    const res = await authAxios.post<string>("/verify-email", { email });

    return res.data;
  } catch (err) {}
};

export const signUp = async (values: ISignUp) => {
  try {
    const res = await authAxios.post("/sign-up", values);
    toast.success("Sign in successfully");
    return res.data;
  } catch (error) {}
};

export const signIn = async (values: ISignIn) => {
  try {
    const res = await authAxios.post("/sign-in", values);
    console.log("Res: ", res);

    return res.data;
  } catch (error) {}
};
