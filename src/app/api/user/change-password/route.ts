import axios from "@/config/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const res = await axios.patch("/user/change-password", body);
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
