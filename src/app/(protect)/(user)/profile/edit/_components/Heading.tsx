"use client";
import { Avatar, Button, Divider, Stack } from "@mui/material";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Heading = () => {
  const { data: user } = useSession();
  const [previewAvatar, setPreviewAvatar] = useState<string>();
  useEffect(() => {
    return () => {
      previewAvatar && URL.revokeObjectURL(previewAvatar);
    };
  }, [previewAvatar]);

  // Previre avatar
  const onPreviewAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewAvatar(url);
    }
  };
  return (
    <>
      <Stack
        mb={1}
        p={1}
        flexDirection="row"
        justifyContent="space-between"
        flexWrap="wrap"
        sx={{ background: (theme) => theme.palette.gradient.main }}
      >
        {user?.avatar ? (
          <Image
            src={previewAvatar || user?.avatar}
            alt="avatar"
            width={200}
            height={200}
            style={{ borderRadius: 99, objectFit: "cover" }}
          />
        ) : (
          <Avatar sx={{ width: 200, height: 200 }}>{user?.username[0]}</Avatar>
        )}

        {/*  Preview Avatar Control */}
        <Stack justifyContent={previewAvatar ? "space-between" : "flex-end"} alignItems={"end"}>
          {/* Controls */}
          {previewAvatar && (
            <Stack flexDirection={"row"} gap={1}>
              <Button variant="outlined" onClick={() => setPreviewAvatar("")}>
                Cancel
              </Button>
              <Button variant="contained">Save</Button>
            </Stack>
          )}

          {/* Input file */}
          <Button
            variant="outlined"
            sx={{
              height: "fit-content",
              position: "relative",
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
      <Divider />
    </>
  );
};

export default Heading;
