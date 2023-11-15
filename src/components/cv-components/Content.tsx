"use client";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWR, { Fetcher } from "swr";
import MyDialog from "../custom/Dialog";
import TextEditor from "../custom/TextEditor";
import Spinner from "../custom/Spinner";

const fetcher: Fetcher<ICv, string> = (url: string) => fetch(url).then((res) => res.json());

const Content = () => {
  const { data, isLoading, error, mutate, isValidating } = useSWR("/api/user/cv", fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    onSuccess(data, key, config) {
      setCv(data);
    },
  });

  const [cv, setCv] = useState<Partial<ICv>>({ content: "" });
  const [showDialog, setShowDialog] = useState<boolean>(false);

  // Add CV
  const handleSubmit = async () => {
    try {
      if (cv.content?.trim()) {
        const payload: { role: string; content: string } = {
          role: "teacher",
          content: cv.content,
        };
        const res = await axios.post<ICv>("/api/cv", payload);
        mutate(res.data);
        toast.success("Submit your CV successfully");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (Array.isArray(error.response?.data)) {
          error.response?.data.map((message) => toast.error(message));
        }
        toast.error("Submit your CV failed");
      }
    }
  };

  // Update CV
  const handleUpdate = async () => {
    try {
      if (cv.content?.trim()) {
        const payload: { role: string; content: string } = {
          role: "teacher",
          content: cv.content,
        };
        const res = await axios.put<ICv>("/api/cv/" + cv._id, payload);
        mutate(res.data);
        toast.success("Update your CV successfully");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (Array.isArray(error.response?.data)) {
          error.response?.data.map((message) => toast.error(message));
        }
        toast.error("Update your CV failed");
      }
    }
  };

  // Cancel CV
  const handleCancel = async () => {
    try {
      if (cv._id) {
        await axios.delete("/api/cv/" + cv?._id);
        toast.success("You deleted your CV");
      }
      mutate();
    } catch (error) {
      toast.error("Delete your CV failed");
    }
  };

  if (error) {
    <Typography variant="body1" textAlign={"center"}>
      Error
    </Typography>;
  }

  return (
    <>
      {/* Text editor */}
      <Paper
        sx={{
          mb: 1,
          ".ql-editor": {
            minHeight: "50vh",
          },
        }}
      >
        <TextEditor
          value={cv?.content || ""}
          onChange={(value) => setCv((prev) => ({ ...prev, content: value }))}
          theme="snow"
          placeholder="Introduce about yourself and note message to admin"
        />
      </Paper>

      {/* Updated time */}
      {data && (
        <Typography variant="body1" gutterBottom>
          Updated at: {dayjs(data?.updatedAt).format("MMMM D, YYYY h:mm A")}
        </Typography>
      )}

      {isLoading ? (
        <Typography variant="body1" textAlign={"center"}>
          Loading...
        </Typography>
      ) : (
        <Stack mt={2} pb={2} flexDirection={"row"} justifyContent={"end"} gap={2}>
          {data ? (
            <>
              <Button variant="contained" onClick={() => setShowDialog(true)}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleUpdate}>
                Update
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </Stack>
      )}

      {/* Revalidating */}
      {isValidating && <Spinner />}

      {/* Dialog confirm cancel */}
      {showDialog && (
        <MyDialog
          title="Cancel CV"
          content="Do you want to delete CV and dont want to become a teacher EST Edu?"
          onSubmit={handleCancel}
          onClose={() => setShowDialog(false)}
        />
      )}
    </>
  );
};

export default Content;
