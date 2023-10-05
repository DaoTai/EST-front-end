import { options } from "@/config/next-auth";
import Divider from "@mui/material/Divider";
import { getServerSession } from "next-auth";
import { Content, Heading, Panel } from "./_components";

const Profile = async () => {
  const session = await getServerSession(options);

  return (
    <>
      <Heading avatar={session?.avatar} username={session?.username} roles={session?.roles} />
      <Panel />
      <Divider />
      {session && <Content user={session} />}
    </>
  );
};

export default Profile;
