import serverAxios from "@/config/axios";
import { options } from "@/config/next-auth";
import { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { idCourse: string } }) => {
  try {
    const session = await getServerSession(options);
    const idCourse = params.idCourse;
    const query = req.nextUrl.searchParams;

    const res = await serverAxios.get("/lessons/" + idCourse + "?" + query, {
      headers: {
        Authorization: "Bearer " + session?.accessToken,
      },
    });

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
    const session = await getServerSession(options);
    const body = await req.formData();

    const res = await serverAxios.post("/lessons/" + idCourse, body, {
      headers: {
        Authorization: "Bearer " + session?.accessToken,
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
