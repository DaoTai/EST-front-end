import serverAxios from "@/config/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const id = params.id;
    const body = await req.json();
    await serverAxios.patch("/answer-records/" + id, body);
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
