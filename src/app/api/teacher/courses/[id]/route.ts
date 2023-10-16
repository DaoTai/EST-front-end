import serverAxios from "@/config/axios";
import { options } from "@/config/next-auth";
import { SERVER_URI } from "@/utils/constants/common";
import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(options);
  const id = params.id;
  try {
    // const res = await serverAxios.get("/courses/" + id, {
    //   headers: {
    //     Authorization: "Bearer " + session?.accessToken,
    //   },
    // });
    // return NextResponse.json(res.data);

    const res = await fetch(SERVER_URI + "/courses/" + id, {
      headers: {
        Authorization: "Bearer " + session?.accessToken,
      },
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(null);
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const session = await getServerSession(options);
    const body = await request.formData();

    const res = await serverAxios.patch("/courses/" + id, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + session?.accessToken,
      },
    });
    revalidateTag("list-courses");
    revalidatePath("/courses");
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(null);
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const session = await getServerSession(options);

    await serverAxios.delete("/courses/" + id, {
      headers: {
        Authorization: "Bearer " + session?.accessToken,
      },
    });
    revalidatePath("/courses");
    revalidateTag("list-courses");
    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
