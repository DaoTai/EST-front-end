import serverAxios from "@/config/axios/server-side";
import { options } from "@/config/next-auth";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import VideoRoom from "./_components/Main";
import Link from "next/link";

const PageVideo = async ({ params }: { params: { idGroupChat: string } }) => {
  try {
    const session = await getServerSession(options);
    const res = await serverAxios.get<IGroupChat>("/group-chat/" + params.idGroupChat);
    const groupChat = res.data;
    const isMember = groupChat.members.some((member) => member._id === session?._id);
    if (isMember) {
      return (
        <>
          <VideoRoom idGroupChat={params.idGroupChat} />
        </>
      );
    } else {
      return (
        <Stack gap={2}>
          <Typography textAlign={"center"}>You dont have permission to join this room</Typography>
          <Link href="/">Back</Link>
        </Stack>
      );
    }
  } catch (error) {
    return redirect("/");
  }
};

export default PageVideo;
