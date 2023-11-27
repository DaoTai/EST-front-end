import serverAxios from "@/config/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
// forces the route handler to be dynamic
export const dynamic = "force-dynamic";
export const GET = async (req: NextRequest, { params }: { params: { idGroupChat: string } }) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const res = await serverAxios.get(
      "/chat/group-chat/" + params.idGroupChat + "?" + searchParams
    );
    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
};

export const POST = async (req: NextRequest, { params }: { params: { idGroupChat: string } }) => {
  try {
    const body = await req.formData();
    const res = await serverAxios.post("/chat/group-chat/" + params.idGroupChat, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
};
