import serverAxios from "@/config/axios";
import { options } from "@/config/next-auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(options);
  const id = params.id;
  try {
    const res = await serverAxios.get("/courses/" + id, {
      headers: {
        Authorization: "Bearer " + session?.accessToken,
      },
    });
    return NextResponse.json(res.data);

    // const res = await fetch(SERVER_URI + "/courses/" + id, {
    //   headers: {
    //     Authorization: "Bearer " + session?.accessToken,
    //   },
    // });

    // const data = await res.json();
    // console.log("data: ", data);
    // return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(null);
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const session = await getServerSession(options);
    const body = await request.formData();
    console.log("Form data: ", body);

    const res = await serverAxios.patch("/courses/" + id, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + session?.accessToken,
      },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(null);
  }
}
