import serverAxios from "@/config/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const GET = async (req: NextRequest) => {
  try {
    const res = await serverAxios.get("/cv/byUser");
    return NextResponse.json(res.data, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return new NextResponse(error.response?.data, { status: error.response?.status });
    }
  }
};
