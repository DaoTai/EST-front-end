"use client";
import Close from "@mui/icons-material/Close";
import CommentIcon from "@mui/icons-material/Comment";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

import { useCallback, useRef, useState } from "react";
import ListComments, { IListCommentsRef } from "./ListComments";
import CreateComment from "./CreateComment";
import { useSearchParams } from "next/navigation";

const BoxComments = ({ idLesson }: { idLesson: string }) => {
  const searchParams = useSearchParams();

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(!!searchParams.get("openComment"));
  const listCommentsRef = useRef<Partial<IListCommentsRef>>(null);

  // Toggle drawer
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleAddComment = useCallback(() => {
    listCommentsRef.current?.mutate && listCommentsRef.current?.mutate();
  }, []);

  return (
    <Box mt={2}>
      <Stack flexDirection={"row"} justifyContent={"end"}>
        <Box
          display={"flex"}
          p={1}
          pl={2}
          pr={2}
          borderRadius={12}
          gap={1}
          boxShadow={2}
          sx={{
            cursor: "pointer",
            bgcolor: (theme) => theme.palette.mainBlue.main,
            color: theme.palette.white.light,
          }}
          onClick={toggleDrawer}
        >
          <Typography variant="body1">Comment</Typography>
          <CommentIcon />
        </Box>
      </Stack>

      {/* List comments */}
      <Drawer open={open} anchor="right" onClose={toggleDrawer}>
        <Paper
          elevation={4}
          sx={{
            p: 4,
            minHeight: "100vh",
            minWidth: isMediumScreen ? "100vw" : "50vw",
            overflowY: "scroll",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              zIndex: 10,
              top: 0,
              left: 0,
              right: 0,
              height: "8vh",
              background: (theme) => theme.palette.white.main,
            }}
          >
            <IconButton onClick={toggleDrawer} sx={{ position: "absolute", top: 5, right: 15 }}>
              <Close />
            </IconButton>
          </Box>

          {/* Create comment  */}
          <Box sx={{ mt: "4vh" }}>
            <Box>
              <CreateComment idLesson={idLesson} handleAddComment={handleAddComment} />
            </Box>
            <Divider />

            {/* List comments */}
            <Box mt={2}>
              <ListComments idLesson={idLesson} ref={listCommentsRef} />
            </Box>
          </Box>
        </Paper>
      </Drawer>
    </Box>
  );
};

export default BoxComments;
