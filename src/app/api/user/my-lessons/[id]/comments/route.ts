import serverAxios from "@/config/axios/server-side";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const idLesson = params.id;
    const searchParams = req.nextUrl.searchParams;
    const res = await serverAxios.get("/user/lessons/" + idLesson + "/comments?" + searchParams);
    return NextResponse.json(res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
};

export const POST = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const idLesson = params.id;
    const body = await req.json();
    const res = await serverAxios.post("/user/lessons/" + idLesson + "/comments", body);
    return NextResponse.json(res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
};
