"use client";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CheckIcon from "@mui/icons-material/Check";
import MailIcon from "@mui/icons-material/Mail";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { memo, useMemo } from "react";

import { Chip, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import Link from "next/link";

type IProps = {
  total: number;
  cvs: ICv[];
  onSelectRow: (newSelectionModel: { idUser: string; idCv: string }[]) => void;
  onDetail: (cv: ICv) => void;
};

const Table = ({ total, cvs, onSelectRow, onDetail }: IProps) => {
  const columns: GridColDef[] = useMemo(() => {
    return [
      {
        field: "authorized",
        headerName: "Authorized",
        width: 90,
        renderCell: (params) => {
          const cv: ICv = params.row;
          return cv.user.roles.includes(cv.role) ? (
            <CheckIcon color="success" />
          ) : (
            <PendingActionsIcon color="action" />
          );
        },
      },
      {
        field: "user.fullName",
        headerName: "Full name",
        width: 100,
        renderCell: (params) => {
          const cv: ICv = params.row;
          return cv.user.fullName;
        },
      },
      {
        field: "user.username",
        headerName: "Username",
        width: 100,
        renderCell: (params) => {
          const cv: ICv = params.row;
          return cv.user.username;
        },
      },

      {
        field: "user.roles",
        headerName: "Role",
        width: 250,
        renderCell: (params) => {
          const cv: ICv = params.row;
          return (
            <Stack flexDirection={"row"} flexWrap={"wrap"} gap={1}>
              {cv.user.roles.map((role, i) => (
                <Chip label={role} key={i} />
              ))}
            </Stack>
          );
        },
      },
      {
        field: "role",
        headerName: "Request role",
        width: 100,
      },

      {
        field: "updatedAt",
        headerName: "Updated time",
        width: 250,
        renderCell: (params) => {
          const cv: ICv = params.row;
          return dayjs(cv.updatedAt).format("MMMM D, YYYY h:mm A");
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 250,
        renderCell: (params) => {
          const cv: ICv = params.row;
          return (
            <Box display={"flex"} gap={2}>
              <Tooltip title="View CV">
                <IconButton color="secondary" onClick={() => onDetail(cv)}>
                  <MailIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="View profile">
                <IconButton color="info" LinkComponent={Link} href={"/profile/" + cv.user._id}>
                  <AccountBoxIcon color="info" />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
    ];
  }, [cvs]);
  return (
    <Box>
      <Typography variant="body2" gutterBottom>
        Total CV: {total || 0}
      </Typography>
      <div style={{ width: "100%", overflowX: "auto" }}>
        <DataGrid
          autoHeight
          checkboxSelection
          disableRowSelectionOnClick
          hideFooter
          getRowId={(row) => row._id}
          rows={cvs ?? []}
          columns={columns}
          rowCount={total}
          onRowSelectionModelChange={(newSelectionModel, details) => {
            const listIds = cvs
              .filter((cv) => newSelectionModel.includes(cv._id))
              .map((cv) => ({
                idUser: cv.user._id,
                idCv: cv._id,
              }));

            onSelectRow(listIds);
          }}
        />
      </div>
    </Box>
  );
};

export default memo(Table);
