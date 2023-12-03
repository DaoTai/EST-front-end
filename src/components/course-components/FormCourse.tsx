"use client";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { DateTimeValidationError } from "@mui/x-date-pickers";

import dayjs from "dayjs";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ChangeEvent, memo, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import VisuallyHiddenInput from "@/components/custom/VisuallyHiddenInput";
import { IFormCourse } from "@/types/ICourse";
import { getChangedValuesObject } from "@/utils/functions";
import { initFormCourse } from "@/utils/initialValues";
import { FormCourseSchema } from "@/utils/validation/course";
import { InputLabel } from "@mui/material";
import TextEditor from "../custom/TextEditor";
import AboutCourse from "./AboutCourse";
import { selectFields, textFields } from "./_fields";
import DateTime from "./form-course-components/DateTime";
import LanguagesBox from "./form-course-components/LanguagesBox";
import SuitableJob from "./form-course-components/SuitableJob";
import UploadThumbnail from "./form-course-components/UploadThumbnail";
import { mutate } from "swr";
import { useSession } from "next-auth/react";
interface IPropsFormCourse {
  action: "create" | "edit" | "watch";
  course?: ICourse;
  onSubmit?: (value: IFormCourse) => Promise<void>;
}

const FormCourse = ({ action, course, onSubmit }: IPropsFormCourse) => {
  const router = useRouter();
  const {
    values,
    errors,
    touched,
    isSubmitting,
    setValues,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    validationSchema: FormCourseSchema,
    initialValues: initFormCourse,
    onSubmit: async (values) => {
      try {
        let payload = {
          ...values,
        } as IFormCourse;
        if (thumbnail?.file) payload["thumbnail"] = thumbnail?.file;
        if (roadmap) payload["roadmap"] = roadmap;

        if (payload.type === "private") {
          const formatOpenDate = dayjs(openDate).toISOString();
          const formatCloseDate = dayjs(closeDate).toISOString();

          if (action === "edit") {
            if (formatOpenDate !== course?.openDate) payload.openDate = formatOpenDate;
            if (formatCloseDate !== course?.closeDate) payload.closeDate = formatCloseDate;
          } else {
            Object.assign(payload, {
              openDate: formatOpenDate,
              closeDate: formatCloseDate,
            });
          }
        }

        if (action === "edit" && course) {
          payload = getChangedValuesObject(payload, course);
        }
        if (action === "create" && !payload["thumbnail"]) {
          toast.warn("Thumbnail is required", {
            position: "top-center",
            theme: "colored",
          });
          return;
        }

        await onSubmit?.(payload);
        mutate("/api/teacher/courses");
        setTimeout(() => {
          router.replace("/teacher");
        }, 2000);
      } catch (error) {
        console.log("Error: ", error);
      }
    },
  });

  const [thumbnail, setThumbnail] = useState<{ file: File | null; preview: string }>();
  const [roadmap, setRoadmap] = useState<File | null>();
  const [openDate, setOpenDate] = useState<string | null | dayjs.Dayjs>(null);
  const [closeDate, setCloseDate] = useState<string | null | dayjs.Dayjs>(null);
  const [errorOpenDate, setErrorOpenDate] = useState<DateTimeValidationError | null>(null);
  const [errorCloseDate, setErrorCloseDate] = useState<DateTimeValidationError | null>(null);

  useEffect(() => {
    if (course) {
      const data = {} as any;
      // Get value is compatiable with values
      for (const key of Object.keys(initFormCourse)) {
        data[key] = course[key as keyof ICourse];
      }
      setValues(data);
      course.openDate && setOpenDate(dayjs(course.openDate));
      course.closeDate && setCloseDate(dayjs(course.closeDate));
    }
  }, [course]);

  useEffect(() => {
    if (values.type === "private") {
      if (!openDate) setOpenDate(dayjs().add(1, "hour"));
      if (!closeDate) setCloseDate(dayjs().add(2, "day"));
    }
  }, [values.type]);

  // On change field roadmap
  const onChangeRoadmap = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) setRoadmap(file);
  };

  // On change programming languages
  const handleChangeLanguages = useCallback((programmingLanguages: string[]) => {
    setFieldValue("programmingLanguages", programmingLanguages);
  }, []);

  // On change intro
  const handleChangeIntro = (value: string) => {
    setFieldValue("intro", value);
  };

  return (
    <Box pt={1} pb={2}>
      <Typography
        gutterBottom
        mb={2}
        variant="h3"
        className="underline-gradient"
        margin={"0 auto"}
        textTransform="capitalize"
      >
        {action} course
      </Typography>

      {/* About */}
      {course && <AboutCourse course={course} type={action} />}

      {/* Form */}
      <Grid
        container
        mt={1}
        spacing={2}
        component={"form"}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        onSubmit={handleSubmit}
      >
        {/* Text fields */}
        {textFields.map((props, i) => (
          <Grid key={i} item md={6} xs={12}>
            <TextField
              {...props}
              value={values[props.name] || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(touched[props.name] && errors[props.name])}
              helperText={touched[props.name] && errors[props.name]}
              InputProps={{
                readOnly: action === "watch",
              }}
            />
          </Grid>
        ))}

        {/* Suitable job */}
        <Grid item md={6} xs={12}>
          <SuitableJob
            name="suitableJob"
            value={values.suitableJob}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!(touched["suitableJob"] && errors["suitableJob"])}
            helperText={touched["suitableJob"] && errors["suitableJob"]}
          />
        </Grid>

        {/* Select fields */}
        {selectFields.map(({ props, menuItem }, i) => (
          <Grid key={i} item md={6} xs={12}>
            <FormControl fullWidth required>
              <InputLabel>{props.label}</InputLabel>
              <Select
                {...props}
                label={props.label}
                MenuProps={{
                  disableScrollLock: true,
                }}
                value={values[props.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(touched[props.name] && errors[props.name])}
                readOnly={action === "watch"}
              >
                {menuItem.map((menu, j) => (
                  <MenuItem key={j} value={menu.value}>
                    {menu.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{touched[props.name] && errors[props.name]}</FormHelperText>
            </FormControl>
          </Grid>
        ))}

        {/* Date time */}
        <DateTime
          type={values.type}
          openDate={openDate}
          closeDate={closeDate}
          setOpenDate={setOpenDate}
          setCloseDate={setCloseDate}
          course={course}
          action={action}
          errorCloseDate={errorCloseDate}
          errorOpenDate={errorOpenDate}
          setErrorCloseDate={setErrorCloseDate}
          setErrorOpenDate={setErrorOpenDate}
        />

        {action !== "watch" && (
          <>
            {/* Upload files */}
            <Grid item md={6} xs={12}>
              <FormControl fullWidth sx={{ overflow: "hidden" }}>
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                  Upload roadmap
                  <VisuallyHiddenInput type="file" onChange={onChangeRoadmap} />
                </Button>
                <FormHelperText>{roadmap?.name}</FormHelperText>
              </FormControl>
            </Grid>

            {/* Upload thumbnail */}
            <Grid item md={6} xs={12}>
              <UploadThumbnail thumbnail={thumbnail} setThumbnail={setThumbnail} />
            </Grid>
          </>
        )}

        {/* Box programming languages */}
        <Grid item md={6} xs={12}>
          {action === "watch" ? (
            <>
              <Typography variant="h6" gutterBottom>
                Programming languages
              </Typography>
              <Stack flexDirection={"row"} mt={2} gap={1}>
                {values.programmingLanguages.map((lang, index) => (
                  <Chip key={index} label={lang} className="bg-gradient" />
                ))}
              </Stack>
            </>
          ) : (
            <LanguagesBox
              programmingLanguages={values.programmingLanguages}
              onChange={handleChangeLanguages}
            />
          )}
        </Grid>

        {/* Intro */}
        <Grid item md={12} xs={12}>
          {action === "watch" ? (
            <>
              <Typography variant="h6" gutterBottom>
                Intro
              </Typography>
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{ __html: values.intro }}
              ></Typography>
            </>
          ) : (
            <FormControl fullWidth>
              <TextEditor
                placeholder="Introduce about course"
                value={values.intro || ""}
                onChange={handleChangeIntro}
              />

              <FormHelperText sx={{ color: "error.main" }}>
                {touched.intro && errors.intro}
              </FormHelperText>
            </FormControl>
          )}
        </Grid>

        {action !== "watch" && (
          <Grid item md={12} xs={12} display={"flex"} justifyContent={"end"}>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              disabled={!!(errorOpenDate || errorCloseDate || isSubmitting)}
            >
              {action === "create" ? "Create" : "Edit"}
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default memo(FormCourse);
