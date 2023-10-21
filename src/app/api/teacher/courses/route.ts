import serverAxios from "@/config/axios";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.formData();
    const res = await serverAxios.post("/courses", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    revalidateTag("list-courses");
    return NextResponse.json(res.data, {
      status: 200,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};
