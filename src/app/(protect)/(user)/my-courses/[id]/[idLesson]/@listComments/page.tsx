"use client";
import Close from "@mui/icons-material/Close";
import CommentIcon from "@mui/icons-material/Comment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { getDistanceTimeToNow } from "@/utils/functions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Fetcher } from "swr";
import useSWRInfinite from "swr/infinite";
import Comment from "./_component/Comment";

type Response = {
  listComments: ILessonComment[];
  total: number;
  maxPage: number;
};

const fetcher: Fetcher<Response, string> = (url: string) => fetch(url).then((res) => res.json());

const ListComments = () => {
  const params = useParams();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const { data, mutate, size, setSize, isValidating, isLoading } = useSWRInfinite(
    (page: number) => {
      return `/api/user/my-lessons/${params.idLesson}/comments?page=${page + 1}`;
    },
    fetcher
  );

  const res = useMemo(() => {
    if (data) {
      const values = data.reduce(
        (acc, item) => {
          return {
            maxPage: item.maxPage,
            total: item.total,
            listComments: [...acc.listComments, ...item.listComments],
          };
        },
        {
          listComments: [],
          maxPage: 0,
          total: 0,
        }
      );
      return values;
    }
    return null;
  }, [data]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  if (!res && !isLoading) return <Typography variant="body1">No comment</Typography>;

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
          sx={{ cursor: "pointer" }}
          onClick={toggleDrawer}
        >
          <Typography variant="body1" marginRight={2}>
            Comment ({res?.total || 0})
          </Typography>
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
            minWidth: "50vw",
            overflowY: "scroll",
          }}
        >
          <IconButton onClick={toggleDrawer} sx={{ position: "fixed", top: 5, right: 15 }}>
            <Close />
          </IconButton>

          {/* Create comment  */}
          <Stack flexDirection={"row"} gap={1} mt={2} mb={1}>
            <Avatar src={session?.avatar.uri} alt="avatar" />
            <Box flexGrow={2}>
              <TextField
                multiline
                fullWidth
                spellCheck={false}
                placeholder="What do you need to comment?"
                variant="filled"
                sx={{ pt: 1 }}
              />
              <Stack
                mt={2}
                gap={2}
                flexDirection={"row"}
                justifyContent={"end"}
                sx={{
                  button: {
                    borderRadius: 99,
                    padding: "4px 16px",
                    fontWeight: 400,
                  },
                }}
              >
                <Button variant="text">Clear</Button>
                <Button variant="contained" color="info">
                  Comment
                </Button>
              </Stack>
            </Box>
          </Stack>

          <Divider />

          {/* List comments */}
          <Box mt={1}>
            <Stack gap={2}>
              {res?.listComments.map((comment) => {
                return <Comment key={comment._id} comment={comment} />;
              })}
            </Stack>
            {size < (res?.maxPage ?? 0) && (
              <Stack mt={2} flexDirection={"row"} justifyContent={"center"}>
                <Chip
                  label="More"
                  disabled={isLoading || isValidating}
                  sx={{
                    bgcolor: (theme) => theme.palette.action.focus,
                    pl: 2,
                    pr: 2,
                  }}
                  onClick={() => setSize(size + 1)}
                />
              </Stack>
            )}
          </Box>
        </Paper>
      </Drawer>
    </Box>
  );
};

export default ListComments;
