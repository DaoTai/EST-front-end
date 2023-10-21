import axios from "@/config/axios";
import { NextRequest } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const body = await req.json();
  const res = await axios.patch("/user/change-password", body);
  return Response.json(res.data, {
    status: res.status,
  });
};
