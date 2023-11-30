import serverAxios from "@/config/axios/server-side";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const id = params.id;
    const res = await serverAxios.get("/lessons/detail/" + id);

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

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const id = params.id;
    const body = await req.formData();
    const res = await serverAxios.patch("/lessons/detail/" + id, body, {
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

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const id = params.id;
    await serverAxios.delete("/lessons/detail/" + id);
    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
};
