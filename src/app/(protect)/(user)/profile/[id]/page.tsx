"use client";
import Spinner from "@/components/custom/Spinner";
import HeadingProfile from "@/components/profile-components/Heading";
import clientSideAxios from "@/config/axios/client-side";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { notFound, redirect, useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ListCreatedCourses from "./_components/ListCreatedCourses";
import ListRegisterCourses from "./_components/ListRegisterCourses";
import Intro from "@/components/profile-components/Intro";

type IUserState =
  | {
      profile: IProfile;
      listCourses: IRegisterCourse[];
    }
  | null
  | undefined;

const DetailProfile = () => {
  const params = useParams();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUserState>(null);
  const [listCreatedCourses, setListCreatedCourses] = useState<ICourse[] | undefined>([]);

  // Check log back-end to see this page be cached
  const getUserData = async (id: string): Promise<IUserState> => {
    try {
      const res = await clientSideAxios.get("/user/profile/" + id);
      return res.data;
    } catch (error) {
      toast.error("Get profile failed");
    }
  };

  // If user is teacher
  const getCreatedCourses = async (userId: string): Promise<ICourse[] | undefined> => {
    try {
      const res = await clientSideAxios.get("/user/profile/" + userId + "/created-courses");
      return res.data;
    } catch (error) {
      toast.error("Get created courses failed");
    }
  };

  const fetchData = async () => {
    if (params.id && typeof params.id === "string") {
      setLoading(true);
      const [dataUser, dataCourses] = await Promise.all([
        getUserData(params.id),
        getCreatedCourses(params.id),
      ]);

      setUser(dataUser);
      setListCreatedCourses(dataCourses);
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
    // fetchData();
  }, [params.id]);

  if (!isLoading && user && listCreatedCourses) {
    return (
      <>
        <HeadingProfile
          avatar={user.profile.avatar}
          roles={user.profile.roles}
          username={user.profile.username}
        />
        <Grid container spacing={2} mt={2}>
          <Grid item md={4} xs={12}>
            <Paper sx={{ p: 1 }}>
              <Intro user={user.profile} />
            </Paper>
          </Grid>
          <Grid item md={8} xs={12} display={"flex"} flexDirection={"column"} gap={2}>
            {/* List created courses */}
            {user.profile.roles.includes("teacher") && (
              <Box>
                <Typography
                  gutterBottom
                  variant="h4"
                  className="underline-gradient"
                  fontWeight={500}
                  pb={0.5}
                >
                  Owner courses
                </Typography>
                <ListCreatedCourses listCreatedCourses={listCreatedCourses} />
              </Box>
            )}

            {/* List register courses */}
            <Box>
              <Typography
                gutterBottom
                variant="h4"
                className="underline-gradient"
                fontWeight={500}
                pb={0.5}
              >
                Register courses
              </Typography>
              <ListRegisterCourses listRegisterCourses={user.listCourses} />
            </Box>
          </Grid>
        </Grid>

        {isLoading && <Spinner />}
      </>
    );
  }
  return <></>;
};

export default DetailProfile;
