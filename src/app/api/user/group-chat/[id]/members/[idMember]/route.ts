import serverAxios from "@/config/axios/server-side";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

// Block / unblock member
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string; idMember: string } }
) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const idGroupChat = params.id;
    const idMember = params.idMember;
    const body = await req.json();
    await serverAxios.patch(`/group-chat/${idGroupChat}/members/${idMember}?${searchParams}`, body);
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

// Host: delete member
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string; idMember: string } }
) => {
  try {
    const idGroupChat = params.id;
    const idMember = params.idMember;
    await serverAxios.delete(`/group-chat/${idGroupChat}/members/${idMember}`);
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
