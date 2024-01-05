"use client";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import VisuallyHiddenInput from "@/components/custom/VisuallyHiddenInput";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import Image from "next/image";

import { ChangeEvent, KeyboardEvent, memo, useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import Close from "@mui/icons-material/Close";

type IProps = {
  onSend: (newChat: any) => Promise<void>;
};

const InputBox = ({ onSend }: IProps) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [newChat, setNewChat] = useState<IFormChat>({ message: "" });
  const [files, setFiles] = useState<{ file: File | null; preview: string }[]>([]);
  const urlRefs = useRef<string[]>([]);
  useEffect(() => {
    return () => {
      releaseObjectUrls();
    };
  }, []);

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
      const listFiles = Array.from(files).map((item) => {
        const url = URL.createObjectURL(item);
        urlRefs.current.push(url);
        return {
          file: item,
          preview: url,
        };
      });

      setFiles((prev) => [...prev, ...listFiles]);
    }
  };

  const releaseObjectUrls = () => {
    urlRefs.current.forEach((url) => URL.revokeObjectURL(url));
  };

  // Remove file
  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    const deletedFile = newFiles.splice(index, 1)[0];
    URL.revokeObjectURL(deletedFile.preview);
    urlRefs.current = urlRefs.current.filter((url) => url !== deletedFile.preview);
    setFiles(newFiles);
  };

  //   Send new chat
  const handleSend = async () => {
    if (newChat.message.trim() || files.length > 0) {
      setLoading(true);
      await onSend({
        ...newChat,
        images: files?.map((item) => item.file),
      });
      setNewChat({ message: "" });
      setLoading(false);
      files.length > 0 && setFiles([]);
      inputRef.current?.focus();
    }
  };

  //   on key down input message
  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      !loading && (await handleSend());
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

  // Reset
  const handleReset = () => {
    if (newChat.message)
      setNewChat({
        message: "",
      });
    if (files.length > 0) {
      releaseObjectUrls();
      setFiles([]);
    }
  };

  return (
    <>
      {/* Preview */}
      {files.length > 0 && (
        <Box
          p={1}
          pb={0}
          sx={{
            border: 1,
            borderColor: "divider",
          }}
        >
          <Stack
            flexDirection={"row"}
            gap={1}
            flexWrap={"nowrap"}
            sx={{
              width: "100%",
              overflowX: "auto",
              img: { borderRadius: 2, border: 1, borderColor: "divider" },
            }}
          >
            {files?.map((file, i) => {
              return (
                <Box key={i} position={"relative"}>
                  <Image src={file.preview} alt="File" width={120} height={120} />
                  <IconButton
                    size="small"
                    sx={{ position: "absolute", top: 5, right: 5, border: 1 }}
                    onClick={() => handleRemoveFile(i)}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </Box>
              );
            })}
          </Stack>
          <Typography variant="caption" mt={1}>
            {files.length} images
          </Typography>
        </Box>
      )}
      <Stack
        flexDirection={"row"}
        gap={1}
        alignItems={"end"}
        p={1}
        borderTop={1}
        borderColor={"divider"}
      >
        {/* Reset message & files */}
        <Tooltip title="Reset">
          <span>
            <IconButton
              color="info"
              disabled={!newChat.message && files.length === 0}
              onClick={handleReset}
            >
              <RestartAltIcon />
            </IconButton>
          </span>
        </Tooltip>
        {/* Input message */}
        <InputBase
          autoFocus
          multiline
          spellCheck={false}
          placeholder="New chat"
          inputRef={inputRef}
          value={newChat.message}
          sx={{
            flex: "2 1 auto",
            border: 1,
            borderRadius: 8,
            pt: 1.5,
            pb: 1.5,
            ".MuiInputBase-input": {
              pl: 2,
            },
          }}
          onChange={(e) => handleChangeMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />

        {/* Controls */}
        <Stack flexDirection={"row"} gap={1}>
          <Tooltip title="Upload images">
            <IconButton color="warning" component="label">
              <UploadFileIcon />
              <VisuallyHiddenInput
                accept="image/png, image/gif, image/jpeg"
                multiple
                type="file"
                onChange={handleUploadFiles}
              />
            </IconButton>
          </Tooltip>

          <Button
            variant="outlined"
            disabled={loading || (files.length === 0 && !newChat.message.trim())}
            onClick={handleSend}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default memo(InputBox);
