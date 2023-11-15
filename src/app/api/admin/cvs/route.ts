import serverAxios from "@/config/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const res = await serverAxios.get("/admin/cvs?" + searchParams);
    return NextResponse.json(res.data, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
};
