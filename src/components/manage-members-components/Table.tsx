"use client";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { memo, useMemo } from "react";

import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import Link from "next/link";

type IProps = {
  total: number;
  users: IProfile[];
  onSelectRow: (newSelectionModel: GridRowSelectionModel) => void;
};

const Table = ({ total, users, onSelectRow }: IProps) => {
  const columns: GridColDef[] = useMemo(() => {
    return [
      { field: "_id", headerName: "ID", width: 200 },
      { field: "fullName", headerName: "Full name", width: 100 },
      { field: "username", headerName: "User name", width: 100 },
      { field: "email", headerName: "Email", width: 250 },
      { field: "roles", headerName: "Roles", width: 250 },
      { field: "provider", headerName: "Provider", width: 100 },
      {
        field: "actions",
        headerName: "Actions",
        width: 250,
        renderCell: (params) => {
          const profile: IProfile = params.row;
          return (
            <Box display={"flex"} gap={2}>
              <Tooltip title="Detail">
                <Link href={"/profile/" + profile._id}>
                  <IconButton>
                    <VisibilityIcon color="info" />
                  </IconButton>
                </Link>
              </Tooltip>
            </Box>
          );
        },
      },
    ];
  }, [users]);
  return (
    <Box>
      <Typography variant="body2" gutterBottom>
        Total members: {total || 0}
      </Typography>
      <div style={{ width: "100%", overflowX: "auto" }}>
        <DataGrid
          autoHeight
          checkboxSelection
          disableRowSelectionOnClick
          hideFooter
          getRowId={(row) => row._id}
          rows={users ?? []}
          columns={columns}
          rowCount={total}
          onRowSelectionModelChange={(newSelectionModel) => onSelectRow(newSelectionModel)}
        />
      </div>
    </Box>
  );
};

export default memo(Table);
