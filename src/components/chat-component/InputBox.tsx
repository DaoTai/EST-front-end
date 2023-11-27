"use client";
import VisuallyHiddenInput from "@/components/custom/VisuallyHiddenInput";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import Image from "next/image";

import { ChangeEvent, KeyboardEvent, memo, useEffect, useRef, useState } from "react";

type IProps = {
  onSend: (newChat: any) => Promise<void>;
};

const InputBox = ({ onSend }: IProps) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const [newChat, setNewChat] = useState<IFormChat>({ message: "" });
  const [files, setFiles] = useState<{ file: File | null; preview: string }[]>([]);

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  // On change message
  const handleChangeMessage = (val: string) => {
    setNewChat((prev) => ({
      ...prev,
      message: val,
    }));
  };

  //   On upload files
  const handleUploadFiles = (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;
    if (files) {
      const listFiles = Array.from(files).map((item) => ({
        file: item,
        preview: URL.createObjectURL(item),
      }));
      setFiles(listFiles);
    }
  };

  //   Send new chat
  const handleSend = async () => {
    await onSend({
      ...newChat,
      images: files?.map((item) => item.file),
    });
    setNewChat({ message: "" });
    files.length > 0 && setFiles([]);
    inputRef.current?.focus();
  };

  //   on key down input message
  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await handleSend();
    }
  };

  //   On key up input message
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      setNewChat((prev) => ({
        ...prev,
        message: prev.message + "\n",
      }));
    }
  };

  return (
    <>
      {/* Preview */}
      {files.length > 0 && (
        <Stack
          flexDirection={"row"}
          gap={1}
          p={1}
          flexWrap={"nowrap"}
          sx={{
            width: "100%",
            overflowX: "auto",
            border: 1,
            borderColor: "divider",
            img: { borderRadius: 2 },
          }}
        >
          {files?.map((file, i) => {
            return (
              <Box key={i}>
                <Image src={file.preview} alt="File" width={120} height={120} />
              </Box>
            );
          })}
        </Stack>
      )}
      <Stack
        flexDirection={"row"}
        gap={1}
        alignItems={"end"}
        p={1}
        borderTop={1}
        borderColor={"divider"}
      >
        {/* Input message */}
        <InputBase
          multiline
          placeholder="New chat"
          inputRef={inputRef}
          value={newChat.message}
          sx={{ flex: "2 1 auto", border: 1, borderColor: "divider", borderRadius: 1, p: 1 }}
          onChange={(e) => handleChangeMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />

        {/* Controls */}
        <Stack flexDirection={"row"} gap={1}>
          <IconButton component="label">
            <UploadFileIcon />
            <VisuallyHiddenInput
              accept="image/png, image/gif, image/jpeg"
              multiple
              type="file"
              onChange={handleUploadFiles}
            />
          </IconButton>

          <Button variant="text" onClick={handleSend}>
            Send
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default memo(InputBox);
