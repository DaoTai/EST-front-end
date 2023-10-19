import serverAxios from "@/config/axios";
import { options } from "@/config/next-auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const id = params.id;
    const session = await getServerSession(options);
    const res = await serverAxios.get("/lessons/detail/" + id, {
      headers: {
        Authorization: "Bearer " + session?.accessToken,
      },
    });

    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    return NextResponse.json("Get lesson failed", { status: 400 });
  }
};
