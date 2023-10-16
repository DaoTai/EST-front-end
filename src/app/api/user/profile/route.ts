import { options } from "@/config/next-auth";
import { SERVER_URI } from "@/utils/constants/common";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import axios from "@/config/axios";
import { AxiosError } from "axios";

export async function GET(req: NextRequest) {
  const session = await getServerSession(options);
  const searchParams = req.nextUrl.searchParams;

  const res = await fetch(SERVER_URI + "/user/profile?" + searchParams, {
    headers: {
      Authorization: "Bearer " + session?.accessToken,
    },
  });
  const data = await res.json();
  if (res.ok) {
    return Response.json(data);
  }
  return Response.json(data, {
    status: res.status,
  });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(options);
  const body = await req.formData();
  try {
    const res = await axios.patch("/user/profile", body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + session?.accessToken,
      },
    });

    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return Response.json(error.response?.data, {
        status: Number(error.response?.status),
      });
    }
  }
}
