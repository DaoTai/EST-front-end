import serverAxios from "@/config/axios/server-side";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { idQuestion: string } }) => {
  try {
    const idQuestion = params.idQuestion;
    const res = await serverAxios.get("/answer-records/by-question/" + idQuestion);
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
