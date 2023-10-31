import serverAxios from "@/config/axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const res = await serverAxios.get("/user/courses");
    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json(error, { status: 500 });
  }
};
