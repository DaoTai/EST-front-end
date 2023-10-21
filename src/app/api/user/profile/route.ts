import serverAxios from "@/config/axios";
import { SERVER_URI } from "@/utils/constants/common";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const res = await serverAxios.get(SERVER_URI + "/user/profile?" + searchParams);
  return NextResponse.json(res.data, { status: res.status });
}

export async function PATCH(req: NextRequest) {
  const body = await req.formData();
  const res = await serverAxios.patch("/user/profile", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return NextResponse.json(res.data, {
    status: res.status,
  });
}
