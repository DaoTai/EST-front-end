"use client";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useSession } from "next-auth/react";
import { memo, useState } from "react";
import { toast } from "react-toastify";

type IProps = {
  idLesson: string;
  handleAddComment: () => void;
};

const CreateComment = ({ idLesson, handleAddComment }: IProps) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState<string>("");

  const handleClear = () => {
    setComment("");
  };

  const handleCreate = async () => {
    const value = comment.trim();
    if (value) {
      try {
        await axios.post<ILessonComment>(`/api/user/my-lessons/${idLesson}/comments`, {
          content: value,
        });
        handleAddComment();
        setComment("");
      } catch (error) {
        toast.error("Create comment failed", {
          theme: "colored",
          position: "bottom-left",
        });
      }
    }
  };

  return (
    <Stack flexDirection={"row"} gap={1} mt={2} mb={1}>
      <Avatar src={session?.avatar.uri} alt="avatar" />
      <Box flexGrow={2}>
        <TextField
          multiline
          fullWidth
          spellCheck={false}
          placeholder="What do you need to comment?"
          variant="filled"
          sx={{
            pt: 1,
            ".MuiInputBase-root": {
              pt: 2,
            },
          }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {comment.trim() && (
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
                fontSize: (theme) => theme.typography.fontSize,
              },
            }}
          >
            <Button variant="text" onClick={handleClear}>
              Clear
            </Button>
            <Button variant="contained" color="primary" onClick={handleCreate}>
              Comment
            </Button>
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

export default memo(CreateComment);
