"use client";
import VisuallyHiddenInput from "@/components/custom/VisuallyHiddenInput";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, memo, useEffect, useRef } from "react";

type IProps = {
  thumbnail: { file: File | null; preview: string } | undefined;
  setThumbnail: Dispatch<
    SetStateAction<
      | {
          file: File | null;
          preview: string;
        }
      | undefined
    >
  >;
};

const UploadThumbnail = ({ thumbnail, setThumbnail }: IProps) => {
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  // Peview thumbnail
  const onPreviewThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file && file.type.includes("image"))
      setThumbnail({
        file,
        preview: URL.createObjectURL(file),
      });
    thumbnailInputRef.current!.value = "";
  };
  useEffect(() => {
    return () => {
      thumbnail?.preview && URL.revokeObjectURL(thumbnail.preview);
    };
  }, [thumbnail]);

  return (
    <FormControl fullWidth>
      {thumbnail?.preview && (
        <Box position={"relative"} mb={2}>
          <Image
            src={thumbnail.preview}
            alt="thumb-nail"
            width={300}
            height={300}
            style={{
              borderRadius: 12,
              width: "100%",
              objectFit: "contain",
            }}
          />
          <IconButton
            size="small"
            sx={{ position: "absolute", top: 5, right: 5, bgcolor: "rgba(0,0,0,.3)" }}
            onClick={() =>
              setThumbnail({
                file: null,
                preview: "",
              })
            }
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      <Button
        component="label"
        variant="contained"
        color="info"
        startIcon={<AddPhotoAlternateIcon />}
      >
        Upload thumbnail*
        <VisuallyHiddenInput
          type="file"
          accept="image/png, image/gif, image/jpeg"
          ref={thumbnailInputRef}
          onChange={onPreviewThumbnail}
        />
      </Button>
      <Typography variant="caption" ml={1} mt={1}>
        Accept: image/png, image/gif, image/jpeg
      </Typography>
    </FormControl>
  );
};

export default memo(UploadThumbnail);
