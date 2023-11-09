import serverAxios from "@/config/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string; idReport: string } }
) => {
  try {
    const idLesson = params.id;
    const idReport = params.idReport;
    await serverAxios.delete("/user/lessons/" + idLesson + "/reports/" + idReport);
    return NextResponse.json("OK");
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
};
