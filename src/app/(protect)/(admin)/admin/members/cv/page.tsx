"use client";
import MyModal from "@/components/custom/Modal";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWR, { Fetcher, mutate } from "swr";
import Detail from "./_components/Detail";
import Table from "./_components/Table";
import MyDialog from "@/components/custom/Dialog";

type IResponse = {
  listCvs: ICv[];
  total: number;
  maxPage: number;
};

const fetcher: Fetcher<IResponse, string> = (url: string) => fetch(url).then((res) => res.json());

const CvPage = () => {
  const [action, setAction] = useState<"authorize" | "reject">("authorize");
  const [page, setPage] = useState(1);
  const [openConfirm, setConfirm] = useState(false);
  const [listIds, setListIds] = useState<{ idUser: string; idCv: string }[]>([]);
  const [detail, setDetail] = useState<ICv | null>(null);
  const { data, error } = useSWR(`/api/admin/cvs?page=${page}`, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // On select id row table
  const onSelectRow = (newSelectionModel: { idUser: string; idCv: string }[]) => {
    setListIds(newSelectionModel);
  };

  //   Get detail
  const onDetail = (detail: ICv) => {
    setDetail(detail);
  };

  // On change action
  const handleChangeAction = (event: SelectChangeEvent) => {
    setAction(event.target.value as any);
  };

  // On change page
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Authorize role for user
  const handleAuthorizeRole = async () => {
    await axios.patch("/api/admin/users", {
      listIdUsers: listIds.map((id) => id.idUser),
      option: action,
    });

    mutate(`/api/admin/cvs?page=${page}`);
    toast.success("Authorize to teacher successfully");
  };

  // Delete list cv
  const handleDeleteCvs = async () => {
    await axios.delete("/api/admin/cvs", {
      data: { listIdCvs: listIds.map((id) => id.idCv) },
    });
    mutate(`/api/admin/cvs?page=${page}`);
    toast.success("Reject request teacher successfully");
  };

  //   Handle action
  const handleAction = async () => {
    try {
      if (action === "authorize") {
        await handleAuthorizeRole();
      } else {
        await handleDeleteCvs();
      }
    } catch (error) {
      toast.error("Handle action failed");
    }
  };

  const toggleConfirm = () => setConfirm(!openConfirm);

  return (
    <Box p={2}>
      <Divider>
        <Typography variant="h4" fontWeight={500} gutterBottom>
          List CV
        </Typography>
      </Divider>

      {error ? (
        <Typography variant="body1" textAlign={"center"}>
          Having issues
        </Typography>
      ) : (
        <>
          {/* Action */}
          <Stack flexDirection={"row"} gap={2} flexWrap={"wrap"}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="action">Action</InputLabel>
              <Select
                MenuProps={{
                  disableScrollLock: true,
                }}
                labelId="action"
                value={action}
                label="Action"
                onChange={handleChangeAction}
              >
                <MenuItem value={"authorize"}>Authorize</MenuItem>
                <MenuItem value={"reject"}>Reject CV</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              disabled={listIds.length === 0}
              endIcon={<SendIcon />}
              onClick={toggleConfirm}
            >
              Handle action
            </Button>
          </Stack>

          {/* Table */}
          <Box mt={2}>
            {data && (
              <Table
                cvs={data.listCvs}
                total={data.total}
                onSelectRow={onSelectRow}
                onDetail={onDetail}
              />
            )}
          </Box>

          {/* Pagination */}
          <Stack mt={2} flexDirection={"row"} justifyContent={"center"}>
            <Pagination
              count={data?.maxPage}
              page={page}
              onChange={handleChangePage}
              variant="outlined"
              color="primary"
            />
          </Stack>
        </>
      )}

      {/* COnfirm dialog */}
      {openConfirm && (
        <MyDialog
          title="CV"
          content="Delete this CV"
          onClose={toggleConfirm}
          onSubmit={handleAction}
        />
      )}

      {/* Modal detail */}
      {detail && (
        <MyModal open={!!detail} onClose={() => setDetail(null)}>
          <Box minWidth={"60vw"}>
            <Detail cv={detail} />
          </Box>
        </MyModal>
      )}
    </Box>
  );
};

export default CvPage;
