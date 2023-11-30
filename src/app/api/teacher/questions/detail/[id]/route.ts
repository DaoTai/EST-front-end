import serverAxios from "@/config/axios/server-side";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  try {
    const data = await req.json();
    const res = await serverAxios.patch("/questions/detail/" + id, data);
    return NextResponse.json(res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
};

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  try {
    await serverAxios.delete("/questions/detail/" + id);
    return NextResponse.json("Delete success");
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
};
