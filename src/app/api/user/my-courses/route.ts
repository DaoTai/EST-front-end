import serverAxios from "@/config/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const res = await serverAxios.get("/user/courses");

    return NextResponse.json(res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("error from api");

      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
};