import serverAxios from "@/config/axios/server-side";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
//export const dynamic = 'force-dynamic'  trong một API route, điều này bắt buộc Next.js phải xử lý route này theo cách động (dynamic). Điều này có nghĩa là các trang không được tạo ra tĩnh trong quá trình build mà thay vào đó, các truy vấn đến API route này sẽ được xử lý tại thời điểm runtime hoặc server-side.

// Mặc định cho các API route. Điều này có nghĩa là Next.js sẽ tạo ra các trang tĩnh (static) từ các API routes này trong quá trình build, giống như cách các trang tĩnh thông thường được tạo ra. Nó sẽ không có sự phụ thuộc vào runtime hoặc server-side logic khi truy cập các trang này.
export const GET = async (req: NextRequest) => {
  try {
    const res = await serverAxios.get("/cv/byUser");
    return NextResponse.json(res.data, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return new NextResponse(error.response?.data, { status: error.response?.status });
    }
  }
};
