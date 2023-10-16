import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import serverAxios from "@/config/axios";
import { options } from "@/config/next-auth";
import { SERVER_URI } from "@/utils/constants/common";
export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(options);
    const body = await req.formData();
    const res = await serverAxios.post("/courses", body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + session?.accessToken,
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
