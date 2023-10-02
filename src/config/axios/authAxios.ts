import axios, { AxiosError } from "axios";
import { SERVER_URI } from "@/utils/constants/common";
import { toast } from "react-toastify";
const authAxios = axios.create({
  baseURL: SERVER_URI,
});

authAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const message = axiosError.response?.data as string;
      toast.error(message);
    }
    return Promise.reject(error);
  }
);

// authAxios.interceptors.request.use();
