import serverAxios from "@/config/axios";
import { options } from "@/config/next-auth";
import { SERVER_URI } from "@/utils/constants/common";
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
    console.log("data: ", res.data);
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
