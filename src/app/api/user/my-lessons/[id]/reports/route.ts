import serverAxios from "@/config/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const idLesson = params.id;
    const body = await req.json();
    const res = await serverAxios.post("/user/lessons/" + idLesson + "/reports", body);
    return NextResponse.json(res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
};
