import { SERVER_URI } from "@/utils/constants/common";
import axios from "axios";
import { getServerSession } from "next-auth";
import { options } from "../next-auth";

const test = await (async () => {
  const session = await getServerSession(options);
  const authAxios = axios.create({
    baseURL: SERVER_URI,
  });
  authAxios.interceptors.request.use(
    async function (config) {
      config.headers.Authorization = session?.accessToken;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return authAxios;
})();

export default test;
