"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import MainLayout from "@/components/common/MainLayout";
import Spinner from "@/components/custom/Spinner";
import useSWR, { Fetcher } from "swr";
import Content from "./_components/Content";
import Heading from "./_components/Heading";

const myCourseFetcher: Fetcher<IRegisterCourse, string> = (url: string) =>
  fetch(url).then((res) => res.json());

const DetailCourse = ({ params }: { params: { id: string } }) => {
  const { data: registeredCourse, isLoading } = useSWR(
    "/api/user/my-courses/" + params.id,
    myCourseFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (!isLoading && !registeredCourse) {
    return (
      <MainLayout>
        <Typography variant="h6" textAlign={"center"}>
          Not found course
        </Typography>
      </MainLayout>
    );
  }

  if (registeredCourse) {
    return (
      <MainLayout>
        <Box sx={{ p: 1, color: (theme) => theme.palette.text.primary }}>
          {/* About teacher */}
          <Heading register={registeredCourse} />
          <Divider />
          <Content register={registeredCourse} />
        </Box>
      </MainLayout>
    );
  }
};

export default DetailCourse;
