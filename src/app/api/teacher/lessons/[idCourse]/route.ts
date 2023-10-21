import serverAxios from "@/config/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { idCourse: string } }) => {
  try {
    const idCourse = params.idCourse;
    const query = req.nextUrl.searchParams;
    const res = await serverAxios.get("/lessons/" + idCourse + "?" + query);
    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.error;
    }
  }
};

export const POST = async (req: NextRequest, { params }: { params: { idCourse: string } }) => {
  try {
    const idCourse = params.idCourse;
    const body = await req.formData();

    const res = await serverAxios.post("/lessons/" + idCourse, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    if (error instanceof AxiosError)
      return NextResponse.json(error.message, { status: error.status });
  }
};