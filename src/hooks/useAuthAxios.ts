import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import authAxios from "@/config/axios/authAxios";
import { refreshToken } from "@/services/auth";

interface DecodedToken {
  exp: number;
}

const useAuthAxios = () => {
  const { data: session, update } = useSession();

  useEffect(() => {
    // const accessTokenLocal = localStorage.getItem("accessToken");
    // if (session?.accessToken && !accessTokenLocal) {
    //   localStorage.setItem("accessToken", session?.accessToken);
    // }

    const requestIntercept = authAxios.interceptors.request.use(
      async function (config) {
        // Refresh token
        if (session?.accessToken && session?.refreshToken) {
          const decodedToken: DecodedToken = jwt_decode(session.accessToken);
          const now = new Date();
          if (decodedToken.exp < now.getTime() / 1000) {
            const newTokens = await refreshToken(session.refreshToken);
            if (!newTokens) {
              setTimeout(() => {
                signOut();
              }, 1500);
              return config;
            }
            session.accessToken = newTokens?.accessToken;
            session.refreshToken = newTokens?.refreshToken;
            // localStorage.setItem("accessToken", session.accessToken);
            config.headers.Authorization = "Bearer " + session?.accessToken;
            update({ ...session, ...newTokens });
          }
        }

        // config.headers.Authorization = "Bearer " + accessTokenLocal;
        if (!config.headers.Authorization)
          config.headers.Authorization = "Bearer " + session?.accessToken;
        return config;
      },
      function (error) {
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
  }, [session, update]);
  return authAxios;
};

export default useAuthAxios;
