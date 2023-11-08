"use client";
import FlagIcon from "@mui/icons-material/Flag";
import SendIcon from "@mui/icons-material/Send";
import { Chip, Stack } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";

const ReportBox = ({ reports }: { reports: IReport[] | null | undefined }) => {
  const [listReport, setListReports] = useState<IReport[]>(reports ?? []);
  const [newReport, setNewReport] = useState<string>("");

  const handleReport = () => {
    if (newReport.trim()) {
    }
  };
  return (
    <Accordion
      sx={{
        border: "none",
        ".MuiAccordionSummary-content": {
          margin: "0 !important",
        },
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
          <IconButton size="small">
            <FlagIcon />
          </IconButton>
        </Tooltip>
      </AccordionSummary>
      <AccordionDetails>
        {listReport?.map((report) => (
          <Chip key={report._id} label={report.message} />
        ))}
        <TextField
          fullWidth
          size="small"
          placeholder="What do you want to report?"
          margin="dense"
          value={newReport}
          onChange={(e) => setNewReport(e.target.value)}
        />
        <Stack mt={1} flexDirection={"row"} justifyContent={"end"}>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleReport}
            disabled={!newReport.trim()}
          >
            Send
          </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default ReportBox;
