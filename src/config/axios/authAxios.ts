import { SERVER_URI } from "@/utils/constants/common";
import axios from "axios";
import { getServerSession } from "next-auth";
import { options } from "../next-auth";

const authAxios = axios.create({
  baseURL: SERVER_URI,
});

export default authAxios;
