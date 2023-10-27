import serverAxios from "@/config/axios";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;

  const data = await req.json();
  const res = await serverAxios.patch("/questions/detail/" + id, data);
  if (res.data) return NextResponse.json(res.data);
  return NextResponse.error();
};

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  try {
    await serverAxios.delete("/questions/detail/" + id);
    return NextResponse.json("Delete success");
  } catch (error) {
    return NextResponse.error();
  }
};
