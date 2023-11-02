"use client";

import { fetcherMyCourses } from "@/app/(protect)/(user)/my-courses/page";
import MyDialog from "@/components/custom/Dialog";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";

import React, { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";

type IProps = {
  _id: string;
  name: string;
  type: "public" | "private";
};

const RegisterButton = ({ _id, name, type }: IProps) => {
  const { data: session } = useSession();
  const [confirm, setConfirm] = useState<boolean>(false);

  const onOpenConfirm = () => {
    setConfirm(true);
  };

  const onCloseConfirm = useCallback(() => {
    setConfirm(false);
  }, []);

  const onRegister = useCallback(async () => {
    try {
      const res = await axios.post("/api/user/courses/" + _id);
      mutate("/api/user/my-courses");
      setConfirm(false);
      toast.success("Register course successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    }
  }, []);

  if (!session) {
    return (
      <Link href="/sign-in">
        <Button variant="contained" color="warning" endIcon={<ExitToAppIcon />}>
          Sign in to register
        </Button>
      </Link>
    );
  }

  // Sẽ được caching khi đã từng đc gọi từ 1 file khác => SWR sẽ dựa vào key (ở đây là url api) để thay đổi việc cache
  const { data: listMyCourses } = useSWR("/api/user/my-courses", fetcherMyCourses, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const isRegistered = useMemo(() => {
    return listMyCourses?.some((register) => register.course._id === _id);
  }, [listMyCourses, _id]);

  if (isRegistered) {
    return (
      <Typography variant="body1" fontWeight={600} gutterBottom>
        You are member in this course
      </Typography>
    );
  }

  return (
    <>
      <Button variant="contained" endIcon={<ExitToAppIcon />} onClick={onOpenConfirm}>
        Register
      </Button>
      {confirm && (
        <MyDialog
          title="Register course"
          content={
            "Do you want to register " +
            name +
            `${
              type === "private"
                ? ". Because this course is private so you should work harder"
                : "."
            }
           `
          }
          onClose={onCloseConfirm}
          onSubmit={onRegister}
        />
      )}
    </>
  );
};

export default RegisterButton;
