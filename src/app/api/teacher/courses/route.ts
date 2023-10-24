import serverAxios from "@/config/axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    console.log("get list courses");
    const res = await serverAxios.get("/courses");
    return NextResponse.json(res.data, {
      status: 200,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.formData();
    const res = await serverAxios.post("/courses", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // revalidateTag("list-courses");
    return NextResponse.json(res.data, {
      status: 200,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};
