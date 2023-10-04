import authAxios from "@/config/axios/authAxios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
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

    return () => {
      authAxios.interceptors.request.eject(requestIntercept);
    };
  }, [session]);
  return authAxios;
};

export default useAuthAxios;
