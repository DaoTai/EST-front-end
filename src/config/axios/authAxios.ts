import { SERVER_URI } from "@/utils/constants/common";
import axios from "axios";

const authAxios = axios.create({
  baseURL: SERVER_URI,
});

export default authAxios;
