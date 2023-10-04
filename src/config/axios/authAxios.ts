import axios, { AxiosError } from "axios";
import { SERVER_URI } from "@/utils/constants/common";
import { toast } from "react-toastify";
import { getServerSession } from "next-auth";
import { options } from "../next-auth";
const authAxios = axios.create({
  baseURL: SERVER_URI,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// authAxios.interceptors.request.use(
//   async function (config) {
//     // Do something before request is sent
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// authAxios.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       const message = axiosError.response?.data as string;
//       toast.error(message);
//     }
//     return Promise.reject(error);
//   }
// );

export default authAxios;
