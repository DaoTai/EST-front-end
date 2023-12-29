import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import { ChangeEvent, memo, useCallback, useEffect, useState } from "react";

import MyDialog from "@/components/custom/Dialog";
import VisuallyHiddenInput from "@/components/custom/VisuallyHiddenInput";
import { IFormLesson } from "@/types/ILesson";
import { initFormLesson } from "@/utils/initialValues";
import { FormLessonSchema } from "@/utils/validation/lesson";
import TextEditor from "../custom/TextEditor";
import Rules from "./Rules";

type Props = {
  type: "create" | "edit" | "watch";
  lesson?: ILesson & { questions?: IQuestion[] };
  onSubmit?: (value: IFormLesson) => Promise<void>;
};

const FormLesson = ({ type, lesson, onSubmit }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: initFormLesson,
    validationSchema: FormLessonSchema,
    onSubmit: async (values) => {
      video
        ? await onSubmit?.({
            ...values,
            video,
          })
        : await onSubmit?.(values);
    },
  });

  const [reference, setReference] = useState<string>("");
  const [video, setVideo] = useState<File | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    if (lesson) {
      setFieldValue("name", lesson.name);
      setFieldValue("isLaunching", lesson.isLaunching);
      setFieldValue("theory", lesson.theory);
      setFieldValue("references", lesson.references);
    }
  }, [lesson]);

  // Upload video
  const handleUploadVideo = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file && file.type.startsWith("video")) {
      const fileSizeInBytes = file.size;
      const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
      setVideo(file);
    }
  };

  // Toggle status launching
  const onToggleLanching = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue("isLaunching", event.target.checked);
  };

  // On change theory
  const onChangeTheory = useCallback(
    (value: string) => {
      setFieldValue("theory", value);
    },
    [values.theory]
  );

  // Add references
  const addReference = () => {
    if (!errors.references && reference.length >= 3) {
      if (reference.trim() && !values.references.includes(reference as never)) {
        setFieldValue("references", [...values.references, reference]);
        setReference("");
      }
    }
  };

  // Remove references
  const removeReference = (e: any, val: string) => {
    e.preventDefault();
    const newRefs = values.references.filter((ref) => ref !== val.trim());
    setFieldValue("references", newRefs);
  };

  return (
    <Box>
      <Divider>
        <Typography
          variant="h4"
          textAlign={"center"}
          textTransform={"capitalize"}
          fontWeight={500}
          margin={"0 auto"}
          gutterBottom
        >
          {type} lesson
        </Typography>
      </Divider>

      <Rules />

      {/* Form lesson*/}
      <Grid
        container
        spacing={2}
        component={"form"}
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                name="isLaunching"
                disabled={type === "watch"}
                checked={values.isLaunching}
                onChange={onToggleLanching}
              />
            }
            label="Launch"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            required
            fullWidth
            name="name"
            label="Name"
            InputProps={{
              readOnly: type === "watch",
            }}
            value={values.name}
            error={!!(touched.name && errors.name)}
            helperText={touched.name && errors.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <TextField
              fullWidth
              label="Reference links"
              name="references"
              InputProps={{
                readOnly: type === "watch",
              }}
              value={reference}
              error={!!(touched.references && errors.references)}
              helperText={touched.references && errors.references}
              onChange={(e) => setReference(e.target.value.trim())}
              onBlur={handleBlur}
            />
            <IconButton size="small" className="bg-gradient" onClick={addReference}>
              <AddIcon />
            </IconButton>
          </Stack>

          {values.references.length > 0 && (
            <Stack mt={1} mb={1} gap={1} flexDirection={"row"} flexWrap={"wrap"}>
              {values.references.map((ref) => (
                <Chip
                  key={ref}
                  label={ref}
                  clickable
                  component="a"
                  href={ref}
                  target="_blank"
                  disabled={type === "watch"}
                  onDelete={(e) => removeReference(e, ref)}
                />
              ))}
            </Stack>
          )}
        </Grid>

        <Grid item md={12} xs={12}>
          {type === "watch" ? (
            <Typography
              variant="body1"
              textAlign={"justify"}
              dangerouslySetInnerHTML={{ __html: values.theory }}
            ></Typography>
          ) : (
            <FormControl
              fullWidth
              sx={{
                ".ql-editor": {
                  minHeight: "30vh",
                },
              }}
            >
              <TextEditor value={values.theory} onChange={onChangeTheory} />
              <FormHelperText>{touched.theory && errors.theory}</FormHelperText>
            </FormControl>
          )}
        </Grid>
        {type !== "watch" && (
          <Grid item md={6} xs={12}>
            <Button
              size="small"
              color="info"
              component="label"
              variant="contained"
              startIcon={<FileUploadIcon />}
            >
              Upload video
              <VisuallyHiddenInput type="file" onChange={handleUploadVideo} />
            </Button>
            <Typography variant="caption" display={"block"}>
              {video && video.name}
            </Typography>
          </Grid>
        )}

        <Grid item xs={12} mt={1} display={"flex"} justifyContent={"end"}>
          {type === "create" && (
            <Button
              fullWidth={!!isMobile}
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
              disabled={isSubmitting}
              sx={{ textTransform: "capitalize" }}
            >
              {type}
            </Button>
          )}
          {type === "edit" && (
            <>
              <Button
                fullWidth={!!isMobile}
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                disabled={isSubmitting}
                sx={{ textTransform: "capitalize" }}
                onClick={() => setOpenDialog(true)}
              >
                {type}
              </Button>
              {openDialog && (
                <MyDialog
                  content="Confirm changed values about lesson"
                  title="Edit lesson"
                  onClose={() => setOpenDialog(false)}
                  onSubmit={handleSubmit}
                />
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(FormLesson);
