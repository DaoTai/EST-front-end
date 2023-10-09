import { options } from "@/config/next-auth";
import { SERVER_URI } from "@/utils/constants/common";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { Heading, Intro } from "../_components";

// Check log back-end to see this page be cached
const getData = async (id: string): Promise<IProfile | undefined> => {
  const session = await getServerSession(options);
  const res = await fetch(SERVER_URI + "/user/profile/" + id, {
    headers: {
      Authorization: "Bearer " + session?.accessToken,
    },
  });
  console.log("Res: ", res);

  if (!res.ok) {
    return undefined;
  }

  return res.json();
};

const DetailProfile = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <Heading avatar={data?.avatar} roles={data?.roles} username={data?.username} />
      {data && <Intro user={data} />}
    </>
  );
};

export default DetailProfile;
