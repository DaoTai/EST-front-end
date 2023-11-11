"use client";
import FlagIcon from "@mui/icons-material/Flag";
import SendIcon from "@mui/icons-material/Send";

import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Box, Typography } from "@mui/material";

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
    <Accordion
      sx={{
        border: "none",

        ".MuiButtonBase-root": {
          minHeight: "unset",
        },
        ".MuiAccordionDetails-root": {
          padding: "0px 16px 8px",
        },
      }}
    >
      <AccordionSummary>
        <Tooltip arrow title="Report" placement="right-start">
          <Box display={"flex"}>
            <FlagIcon />
            <Typography variant="body2" marginLeft={1}>
              ({listReports.length})
            </Typography>
          </Box>
        </Tooltip>
      </AccordionSummary>
      <AccordionDetails>
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
      </AccordionDetails>
    </Accordion>
  );
};

export default ReportBox;