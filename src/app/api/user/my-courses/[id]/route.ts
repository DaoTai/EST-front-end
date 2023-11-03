import serverAxios from "@/config/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

// Get detail registered course
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const idCourse = params.id;
    const res = await serverAxios.get("/user/courses/" + idCourse);
    return NextResponse.json(res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
};

// Rating course
export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const idCourse = params.id;
    const body = await req.json();
    await serverAxios.patch("/user/courses/" + idCourse, {
      rating: body.rating,
    });
    return NextResponse.json("Rate course");
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
};

// Cancel course
export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const idCourse = params.id;
    await serverAxios.delete("/user/courses/" + idCourse);
    return NextResponse.json("Cancel course");
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
};
