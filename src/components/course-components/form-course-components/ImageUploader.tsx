"use client";
import VisuallyHiddenInput from "@/components/custom/VisuallyHiddenInput";
import { IUploadImage } from "@/types/ICourse";
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
  image: { file: File | null; preview: string } | undefined;
  setImage: Dispatch<SetStateAction<IUploadImage | undefined>>;
  label?: string;
};

const ImageUploader = ({ image, setImage, label = "Upload image*" }: IProps) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  // Peview image
  const onPreviewThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file && file.type.includes("image"))
      setImage({
        file,
        preview: URL.createObjectURL(file),
      });
    imageInputRef.current!.value = "";
  };
  useEffect(() => {
    return () => {
      image?.preview && URL.revokeObjectURL(image.preview);
    };
  }, [image]);

  return (
    <FormControl fullWidth>
      {image?.preview && (
        <Box position={"relative"} mb={2}>
          <Image
            src={image.preview}
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
            className="bg-gradient"
            sx={{ position: "absolute", top: 5, right: 5 }}
            onClick={() =>
              setImage({
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
        {label}

        <VisuallyHiddenInput
          type="file"
          accept="image/png, image/jpeg"
          ref={imageInputRef}
          onChange={onPreviewThumbnail}
        />
      </Button>
      <Typography variant="caption" ml={1} mt={1}>
        Accept: image/png, image/gif, image/jpeg
      </Typography>
    </FormControl>
  );
};

export default memo(ImageUploader);
