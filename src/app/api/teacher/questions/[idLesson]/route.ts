import serverAxios from "@/config/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { idLesson: string } }) => {
  try {
    const idLesson = params.idLesson;
    const res = await serverAxios.get("/questions/" + idLesson);
    return NextResponse.json(res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
};

export const POST = async (req: NextRequest, { params }: { params: { idLesson: string } }) => {
  try {
    const idLesson = params.idLesson;
    const data = await req.json();
    const res = await serverAxios.post("/questions/" + idLesson, data);
    return NextResponse.json(res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
};
