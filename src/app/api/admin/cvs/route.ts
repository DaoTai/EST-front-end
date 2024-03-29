import serverAxios from "@/config/axios/server-side";
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

export const DELETE = async (req: NextRequest) => {
  try {
    const body = await req.json();
    await serverAxios.delete("/admin/cvs", {
      data: body,
    });
    return NextResponse.json("OK", {
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
