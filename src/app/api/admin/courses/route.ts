import serverAxios from "@/config/axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const res = await serverAxios.get("/admin/courses");
    return NextResponse.json(res.data, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.error();
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const res = await serverAxios.patch("/admin/courses", body);

    return NextResponse.json(res.data, {
      status: 200,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};
