import authAxios from "@/config/axios/authAxios";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-toastify";
const useAuthAxios = () => {
  const { data: session } = useSession();
  useEffect(() => {
    const requestIntercept = authAxios.interceptors.request.use(
      async function (config) {
        config.headers.Authorization = "Bearer " + session?.accessToken;
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    const responseIntercept = authAxios.interceptors.response.use(
      async function (config) {
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    return () => {
      authAxios.interceptors.request.eject(requestIntercept);
      authAxios.interceptors.response.eject(responseIntercept);
    };
  }, [session]);
  return authAxios;
};

export default useAuthAxios;
