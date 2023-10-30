import serverAxios from "@/config/axios";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const res = await serverAxios.patch("/admin/courses/" + params.id);
    return NextResponse.json(res.data, {
      status: 200,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const res = await serverAxios.delete("/admin/courses/" + params.id);
    return NextResponse.json(res.data, {
      status: 200,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};
