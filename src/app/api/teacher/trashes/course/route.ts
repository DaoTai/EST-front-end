import serverAxios from "@/config/axios";
import { options } from "@/config/next-auth";
import { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = await getServerSession(options);
    const res = await serverAxios.get("/courses/trashes", {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + session?.accessToken,
      },
    });
    // revalidateTag("listCourses");

    return NextResponse.json(res.data, {
      status: 200,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const session = await getServerSession(options);
    const id = req.nextUrl.searchParams.get("id");
    const res = await serverAxios.patch(
      "/courses/" + id + "/restore",
      {},
      {
        headers: {
          Authorization: "Bearer " + session?.accessToken,
        },
      }
    );

    return NextResponse.json(res.data, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Message: ", error.message);
    }
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const session = await getServerSession(options);
    const id = req.nextUrl.searchParams.get("id");
    const res = await serverAxios.delete("/courses/" + id + "/destroy", {
      headers: {
        Authorization: "Bearer " + session?.accessToken,
      },
    });

    return NextResponse.json(res.data, {
      status: 200,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};
