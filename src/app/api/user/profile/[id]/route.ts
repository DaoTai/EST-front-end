import serverAxios from "@/config/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const res = await serverAxios.get("/user/profile/" + params.id);
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
}
