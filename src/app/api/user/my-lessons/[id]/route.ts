import serverAxios from "@/config/axios/server-side";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const idLesson = params.id;
    const searchParams = req.nextUrl.searchParams;

    const res = await serverAxios.get("/user/lessons/" + idLesson + "/?" + searchParams);
    return NextResponse.json(res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
};
