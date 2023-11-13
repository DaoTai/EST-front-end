import ForwardIcon from "@mui/icons-material/Forward";
import Button from "@mui/material/Button";
import React from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { mutate } from "swr";
const Content = ({ register }: { register: IRegisterCourse }) => {
  const pathName = usePathname();

  // Rate course
  const handleRating = (event: React.SyntheticEvent<Element, Event>, value: number | null) => {
    if (value) {
      axios
        .patch("/api/user/my-courses/" + register?.course._id, {
          rating: value,
        })
        .then(() => {
          mutate("/api/user/my-courses/" + register._id);
          toast.success("Rating successfully", { position: "top-right" });
        })
        .catch((error: AxiosError) => {
          toast.error("Rating failed" + `. ${error.response?.data}`, { position: "top-right" });
        });
    }
  };
  return (
    <Grid container pt={1} spacing={1}>
      <Grid item md={6} sm={12}>
        <Stack gap={1} alignItems={"start"}>
          <Typography variant="h5" fontWeight={500}>
            {register?.course.name}
          </Typography>
          <Typography variant="body1">
            Joined time: {dayjs(register?.createdAt).format("DD/MM/YYYY")}
          </Typography>
          <Typography variant="body1">Passed lessons: {register?.passedLessons.length}</Typography>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <Typography variant="body1">Your rating: {register?.rating} </Typography>
            <Rating value={register?.rating || 0} max={5} precision={0.5} onChange={handleRating} />
          </Stack>

          <Stack flexDirection={"row"} alignItems={"center"} flexWrap={"wrap"} gap={1}>
            <Tooltip arrow title="Level" sx={{ textTransform: "capitalize" }}>
              <Box>
                <Chip label={register?.course.level} />
              </Box>
            </Tooltip>
            <Tooltip arrow title="Type" sx={{ textTransform: "capitalize" }}>
              <Box>
                <Chip label={register?.course.type} />
              </Box>
            </Tooltip>
            <Tooltip arrow title="Category">
              <Box>
                <Chip label={register?.course.category} />
              </Box>
            </Tooltip>
            <Chip label={register?.course.members.length + " members"} className="bg-gradient" />
            <Chip label={register?.course.lessons.length + " lessons"} className="bg-gradient" />
          </Stack>

          {/* About lesson */}
          <Button
            variant="outlined"
            component={Link}
            href={
              pathName +
              "/" +
              (register!.passedLessons!.length > 0
                ? register!.passedLessons.pop()
                : register!.course.lessons[0])
            }
            endIcon={<ForwardIcon />}
            sx={{ bgcolor: (theme) => theme.palette.mainBlue.main }}
          >
            Learn
          </Button>
        </Stack>
      </Grid>
      <Grid item md={6} sm={12}>
        <Image
          unoptimized
          src={register?.course.thumbnail.uri as string}
          alt="thumbnail"
          width={200}
          height={200}
          style={{ borderRadius: 12, maxWidth: "100%" }}
        />
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: register?.course.intro }}
        ></Typography>
      </Grid>
    </Grid>
  );
};

export default Content;
