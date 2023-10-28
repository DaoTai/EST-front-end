"use client";
import React, { useEffect, useMemo } from "react";
import useSWR, { Fetcher } from "swr";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Chip, Typography } from "@mui/material";

const fetcher: Fetcher<ICourse[], string> = (url: string) => fetch(url).then((res) => res.json());

const Courses = () => {
  const { data, isLoading } = useSWR("/api/admin/courses", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  console.log(data);

  const columns: GridColDef[] = useMemo(() => {
    return [
      { field: "name", headerName: "Name", width: 150, flex: 1 },
      {
        field: "status",
        headerName: "Status",
        width: 150,
        flex: 1,
        renderCell: (params) => {
          return (
            <Chip
              color={params.value === "pending" ? "warning" : "success"}
              label={params.value}
              size="small"
            />
          );
        },
      },
      {
        field: "type",
        headerName: "Type",
        width: 10,
        flex: 1,
        renderCell: (params) => {
          return (
            <Chip
              color={params.value === "public" ? "success" : "info"}
              label={params.value}
              size="small"
            />
          );
        },
      },

      { field: "category", headerName: "Category", width: 150, flex: 1 },
    ];
  }, [data]);

  return (
    <Box>
      <Typography variant="h4">Courses</Typography>
      {data && (
        <Box>
          <DataGrid
            disableRowSelectionOnClick
            pageSizeOptions={[5]}
            checkboxSelection={false}
            loading={isLoading}
            rows={data}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Courses;
