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
    <Grid container pt={1}>
      <Grid item md={6} sm={12} mb={2}>
        <Stack gap={1} alignItems={"start"}>
          <Typography variant="h4" fontWeight={500}>
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

          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            flexWrap={"wrap"}
            gap={1}
            sx={{ textTransform: "capitalize" }}
          >
            <Tooltip arrow title="Level">
              <Chip label={register?.course.level} />
            </Tooltip>
            <Tooltip arrow title="Type">
              <Chip label={register?.course.type} />
            </Tooltip>

            <Chip label={register?.course?.lessons?.length + " lessons"} className="bg-gradient" />
          </Stack>

          <Tooltip arrow title="Programming languages">
            <Stack flexDirection={"row"} gap={1} flexWrap={"wrap"}>
              {register?.course.programmingLanguages.map((lang, i) => (
                <Chip key={i} label={lang} />
              ))}
            </Stack>
          </Tooltip>

          {/* Learn */}
          {register.passedLessons.length > 0 ? (
            <Button
              className="bg-gradient"
              variant="outlined"
              component={Link}
              href={pathName + "/" + register!.passedLessons.pop()}
              endIcon={<ForwardIcon />}
              sx={{ mt: 1, bgcolor: (theme) => theme.palette.mainBlue.main }}
            >
              Learn
            </Button>
          ) : (
            <>
              {register.course?.lessons && register.course?.lessons?.length > 0 && (
                <Button
                  className="bg-gradient"
                  variant="outlined"
                  component={Link}
                  href={pathName + "/" + register.course?.lessons[0]}
                  endIcon={<ForwardIcon />}
                  sx={{ mt: 1, bgcolor: (theme) => theme.palette.mainBlue.main }}
                >
                  Learn
                </Button>
              )}
            </>
          )}
        </Stack>
      </Grid>
      <Grid
        item
        md={6}
        sm={12}
        sx={{
          borderRadius: 2,
          height: "50vh",
          backgroundImage: `url(${register?.course?.thumbnail?.uri}),  linear-gradient(to bottom right,
            rgba(0, 0, 0, 0.8), 
            rgba(0, 0, 0, 0.45)
          ) `,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "rgba(0,0,0,0.3)",
            p: 1,
            borderRadius: 2,
            height: "100%",
            width: "100%",
            color: (theme) => theme.palette.white.light,
          }}
        >
          <Typography
            gutterBottom
            letterSpacing={1}
            variant="h3"
            textAlign={"center"}
            textTransform={"uppercase"}
            fontWeight={700}
            sx={{ textShadow: "1px 1px 4px #000" }}
          >
            {register.course.name}
          </Typography>
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: register?.course.intro }}
            sx={{ textShadow: "1px 1px 4px #000" }}
          ></Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Content;
