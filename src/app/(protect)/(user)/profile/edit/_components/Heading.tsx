"use client";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import useAuthAxios from "@/hooks/useAuthAxios";
import { editProfile } from "@/services/user/profile";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useTheme from "@mui/material/styles/useTheme";
import { useMediaQuery } from "@mui/material";
const Heading = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: user, update } = useSession();
  const axios = useAuthAxios();
  const [previewAvatar, setPreviewAvatar] = useState<{
    url: string;
    file?: File;
  }>();

  useEffect(() => {
    return () => {
      previewAvatar && URL.revokeObjectURL(previewAvatar.url);
    };
  }, [previewAvatar]);

  // Preview avatar
  const onPreviewAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewAvatar({
      url,
      file,
    });
  };

  // Save avatar
  const onSaveAvatar = async () => {
    if (!previewAvatar?.file) return;
    const data = await editProfile(axios, { avatar: previewAvatar.file });

    update(data);
    setPreviewAvatar({ url: "", file: undefined });
  };

  return (
    <Stack
      mb={1}
      p={1}
      gap={1}
      borderRadius={1}
      flexDirection="row"
      justifyContent={isMobile ? "center" : "space-between"}
      flexWrap="wrap"
      sx={{ background: (theme) => theme.palette.gradient.main }}
    >
      {user?.avatar ? (
        <Image
          src={previewAvatar?.url || user?.avatar?.uri}
          alt="avatar"
          width={200}
          height={200}
          style={{ borderRadius: 99, objectFit: "cover" }}
        />
      ) : (
        <Avatar src={previewAvatar?.url} sx={{ width: 200, height: 200, objectFit: "cover" }}>
          {user?.username[0]}
        </Avatar>
      )}

      {/*  Preview Avatar Control */}
      <Stack justifyContent={previewAvatar?.url ? "space-between" : "flex-end"} alignItems={"end"}>
        {/* Controls */}
        {previewAvatar?.url && (
          <Stack flexDirection={"row"} gap={1}>
            <Button variant="outlined" onClick={() => setPreviewAvatar({ url: "" })}>
              Cancel
            </Button>
            <Button variant="contained" onClick={onSaveAvatar}>
              Save
            </Button>
          </Stack>
        )}

        {/* Input file */}
        <Button
          variant="outlined"
          sx={{
            height: "fit-content",
            position: "relative",
            color: "#fff",
            input: {
              position: "absolute",
              display: "block",
              width: "100%",
              height: "100%",
              opacity: 0,
              cursor: "pointer",
            },
          }}
          startIcon={<CameraAltIcon fontSize="large" />}
        >
          Change image
          <input
            id="avatar"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={onPreviewAvatar}
          />
        </Button>
      </Stack>
    </Stack>
  );
};

export default Heading;
