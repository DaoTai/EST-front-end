"use client";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";

import { DateTimePicker, DateTimeValidationError } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Dispatch, SetStateAction, memo, useMemo, useState } from "react";

type IProps = {
  action: "create" | "edit" | "watch";
  type: string;
  course?: ICourse;
  openDate: string | null | dayjs.Dayjs;
  closeDate: string | null | dayjs.Dayjs;
  setOpenDate: Dispatch<SetStateAction<string | dayjs.Dayjs | null>>;
  setCloseDate: Dispatch<SetStateAction<string | dayjs.Dayjs | null>>;
  errorOpenDate: DateTimeValidationError | null;
  errorCloseDate: DateTimeValidationError | null;
  setErrorOpenDate: Dispatch<SetStateAction<DateTimeValidationError>>;
  setErrorCloseDate: Dispatch<SetStateAction<DateTimeValidationError>>;
};

const DateTime = ({
  type,
  action,
  course,
  openDate,
  closeDate,
  setOpenDate,
  setCloseDate,
  errorOpenDate,
  errorCloseDate,
  setErrorOpenDate,
  setErrorCloseDate,
}: IProps) => {
  // Message for open date
  const errorOpenDateMessage = useMemo(() => {
    switch (errorOpenDate) {
      case "minTime": {
        return "Please select a datetime more than 30 minutes now";
      }

      default: {
        return "";
      }
    }
  }, [errorOpenDate]);

  // Message for close date
  const errorCloseDateMessage = useMemo(() => {
    switch (errorCloseDate) {
      case "minTime": {
        return "Please select a datetime more than 4 hours open date";
      }
      default: {
        return "";
      }
    }
  }, [errorCloseDate]);

  // Disabled open date register: when open date is past time
  const isPastOpenDate = useMemo(() => {
    if (course?.openDate) {
      const now = new Date().getTime();
      const openDate = new Date(course.openDate).getTime();
      return now - openDate > 0;
    }
  }, [course, type]);

  // On change open date
  const handleChangeOpenDate = (value: any) => {
    if (!value) {
      setOpenDate(null);
    } else {
      setOpenDate(value);
    }
  };

  // On change close date
  const handleChangeCloseDate = (value: any) => {
    if (!value) {
      setCloseDate(null);
    } else {
      setCloseDate(value);
    }
  };

  return (
    <>
      {/* Open date*/}
      <Grid item md={6} xs={12}>
        <FormControl fullWidth>
          <DateTimePicker
            readOnly={action === "watch"}
            disablePast={action === "create"}
            label="Open date register"
            disabled={!!(type === "public") || isPastOpenDate}
            minDateTime={action === "create" ? dayjs().add(29, "minutes") : undefined}
            value={type === "private" ? openDate ?? dayjs().add(1, "hour") : null}
            slotProps={{
              textField: {
                helperText: errorOpenDateMessage,
                InputProps: {
                  disabled: true,
                  //   sx: {
                  //     ".mui-aw45kt-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled": {
                  //       WebkitTextFillColor: "text.primary",
                  //     },
                  //   },
                },
              },
            }}
            onError={(newError) => setErrorOpenDate(newError)}
            onChange={handleChangeOpenDate}
          />
        </FormControl>
      </Grid>

      {/* Close date */}
      <Grid item md={6} xs={12}>
        <FormControl fullWidth>
          <DateTimePicker
            readOnly={action === "watch"}
            disablePast={action === "create"}
            label="Close date register"
            disabled={!!(type === "public")}
            value={type === "private" ? closeDate ?? dayjs().add(2, "day") : null}
            minDateTime={dayjs(openDate).add(4, "hour") || dayjs().add(4, "hour")}
            slotProps={{
              textField: {
                helperText: errorCloseDateMessage,
                InputProps: {
                  disabled: true,
                },
                // sx: {
                //   ".mui-aw45kt-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled": {
                //     WebkitTextFillColor: "text.primary",
                //   },
                // },
              },
            }}
            onError={(newError) => {
              setErrorCloseDate(newError);
            }}
            onChange={handleChangeCloseDate}
          />
        </FormControl>
      </Grid>
    </>
  );
};

export default memo(DateTime);
