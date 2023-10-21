import serverAxios from "@/config/axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const id = params.id;
    const res = await serverAxios.get("/lessons/detail/" + id);

    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    return NextResponse.json("Get lesson failed", { status: 400 });
  }
};
