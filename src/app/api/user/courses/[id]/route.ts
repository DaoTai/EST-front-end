import serverAxios from "@/config/axios/server-side";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const idCourse = params.id;
  try {
    const res = await serverAxios.post("/user/courses/" + idCourse);
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
