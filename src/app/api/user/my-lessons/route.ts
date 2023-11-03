import serverAxios from "@/config/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const query = req.nextUrl.searchParams;
    console.log("query: ", query);

    const res = await serverAxios.get("/user/lessons?" + query);

    return NextResponse.json(res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
};
