import serverAxios from "@/config/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const body = await req.json();
    const res = await serverAxios.put("/cv/" + params.id, body);
    return NextResponse.json(res.data, {
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

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const res = await serverAxios.delete("/cv/" + params.id);
    return NextResponse.json(res.data, {
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
