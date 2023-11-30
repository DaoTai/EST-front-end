import serverAxios from "@/config/axios/server-side";
import { AxiosError } from "axios";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const res = await serverAxios.get("/courses/trashes", {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

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

export const PATCH = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const res = await serverAxios.patch("/courses/" + id + "/restore");
    revalidateTag("list-courses");
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

export const DELETE = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const res = await serverAxios.delete("/courses/" + id + "/destroy");

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
