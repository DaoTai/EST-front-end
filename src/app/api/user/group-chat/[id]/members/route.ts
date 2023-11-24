import serverAxios from "@/config/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

// Add members
export const POST = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const body = await req.json();
    await serverAxios.post(`/group-chat/${params.id}/members`, body);
    return NextResponse.json("OK", {
      status: 200,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
};
