import { refreshToken } from "@/services/auth";
import { BACK_END_URI } from "@/utils/constants/common";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { getSession, signOut } from "next-auth/react";
const clientSideAxios = axios.create({
  baseURL: BACK_END_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

interface DecodedToken {
  exp: number;
}

clientSideAxios.interceptors.request.use(
  async function (config) {
    const session = await getSession();
    if (session?.accessToken && session.refreshToken) {
      const decodeToken: DecodedToken = jwt_decode(session.accessToken);
      const now = new Date();
      if (config.headers && decodeToken.exp < now.getTime() / 1000) {
        const newTokens = await refreshToken(session.refreshToken);
        if (!newTokens) {
          setTimeout(async () => {
            await signOut();
          }, 1500);
          return config;
        }
        session.accessToken = newTokens.accessToken;
        session.refreshToken = newTokens.refreshToken;
        config.headers.Authorization = "Bearer " + session.accessToken;
      }
    }

    if (!config.headers.Authorization)
      config.headers.Authorization = "Bearer " + session?.accessToken;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default clientSideAxios;
