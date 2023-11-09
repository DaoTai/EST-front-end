import serverAxios from "@/config/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string; idComment: string } }
) => {
  try {
    const idLesson = params.id;
    const idComment = params.idComment;
    const body = await req.json();
    const res = await serverAxios.patch(
      "/user/lessons/" + idLesson + "/comments/" + idComment,
      body
    );
    return NextResponse.json(res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string; idComment: string } }
) => {
  try {
    const idLesson = params.id;
    const idComment = params.idComment;
    await serverAxios.delete("/user/lessons/" + idLesson + "/comments/" + idComment);
    return NextResponse.json("OK");
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
};
