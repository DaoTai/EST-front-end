import serverAxios from "@/config/axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { idLesson: string } }) => {
  const idLesson = params.idLesson;
  const res = await serverAxios.get("/questions/" + idLesson);
  if (res.data) return NextResponse.json(res.data);
  return NextResponse.error();
};

export const POST = async (req: NextRequest, { params }: { params: { idLesson: string } }) => {
  const idLesson = params.idLesson;
  const data = await req.json();
  const res = await serverAxios.post("/questions/" + idLesson, data);
  if (res.data) return NextResponse.json(res.data);
  return NextResponse.error();
};
