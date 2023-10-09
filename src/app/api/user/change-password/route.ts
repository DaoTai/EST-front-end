import axios from "@/config/axios";
import { options } from "@/config/next-auth";
import { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const body = await req.json();
  console.log("body: ", body);

  const session = await getServerSession(options);
  try {
    const res = await axios.patch("/user/change-password", body, {
      headers: {
        Authorization: "Bearer " + session?.accessToken,
      },
    });
    return Response.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return Response.json(error.response?.data, {
        status: Number(error.response?.status),
      });
    }
  }
};
