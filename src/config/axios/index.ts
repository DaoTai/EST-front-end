import { SERVER_URI } from "@/utils/constants/common";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const serverAxios = axios.create({
  baseURL: SERVER_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

serverAxios.interceptors.response.use(
  async function (config) {
    return config;
  },
  function (error) {
    if (error instanceof AxiosError) {
      if (error.status === 500) {
        toast.error("Server had issues");
      }
    }
    return Promise.reject(error);
  }
);

export default serverAxios;
