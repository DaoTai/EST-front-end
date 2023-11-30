import serverAxios from "@/config/axios/server-side";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const res = await serverAxios.get("/courses/" + id);
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  try {
    const body = await request.formData();

    const res = await serverAxios.patch("/courses/" + id, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(null);
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    await serverAxios.delete("/courses/" + id);
    // revalidatePath("/courses");
    // revalidateTag("list-courses");
    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
