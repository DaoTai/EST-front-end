"use client";
import SendIcon from "@mui/icons-material/Send";

import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

type IProps = {
  idLesson: string;
  reports: IReport[] | null | undefined;
};

const ReportBox = ({ reports, idLesson }: IProps) => {
  const { data: session } = useSession();
  const [listReports, setListReports] = useState<IReport[]>(reports ?? []);
  const [newReport, setNewReport] = useState<string>("");

  const handleReport = async () => {
    const value = newReport.trim();
    if (value && value.length > 5) {
      try {
        const res = await axios.post<IReport[]>("/api/user/my-lessons/" + idLesson + "/reports", {
          content: value,
        });
        const myReports = res.data.filter((report) => report.user === session?._id);
        setListReports(myReports);
        setNewReport("");
        toast.success("Report lesson success");
      } catch (error) {
        toast.warning("Report lesson failed");
      }
    }
  };

  const deleteReport = async (idReport: string) => {
    try {
      await axios.delete("/api/user/my-lessons/" + idLesson + "/reports/" + idReport);
      setListReports((prev) => prev.filter((report) => report._id !== idReport));
    } catch (error) {
      toast.warning("Delete report failed");
    }
  };

  return (
    <Box>
      <Typography
        gutterBottom
        variant="body1"
        textAlign={listReports.length === 0 ? "center" : "left"}
      >
        {listReports.length > 0 ? "You have " + listReports.length + " reports" : "No report"}
      </Typography>
      {/* List my reports */}
      <Stack flexDirection={"row"} flexWrap={"wrap"} gap={2} mb={1}>
        {listReports?.map((report) => (
          <Tooltip key={report._id} title={dayjs(report.createdAt).format("DD/MM/YYYY")}>
            <Chip label={report.content} onDelete={() => deleteReport(report._id)} />
          </Tooltip>
        ))}
      </Stack>
      <TextField
        fullWidth
        placeholder="Content at least 5 characters"
        margin="dense"
        value={newReport}
        onChange={(e) => setNewReport(e.target.value)}
      />
      <Stack mt={1} flexDirection={"row"} justifyContent={"end"}>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleReport}
          disabled={newReport.trim().length <= 5}
        >
          Send
        </Button>
      </Stack>
    </Box>
  );
};

export default ReportBox;
