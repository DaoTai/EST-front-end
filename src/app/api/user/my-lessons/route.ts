import serverAxios from "@/config/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const query = req.nextUrl.searchParams;
    const res = await serverAxios.get("/user/lessons?" + query);
    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
};
