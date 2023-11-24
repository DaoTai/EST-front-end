"use client";
import MyDialog from "@/components/custom/Dialog";
import LockPersonIcon from "@mui/icons-material/LockPerson";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { memo, useState } from "react";

type IProps = { member: IMemberGroupChat; disalbed?: boolean };

const PrepareBlockMember = ({ member, disalbed = false }: IProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  //   / Toggle dialog
  const toggleDialog = () => setOpenDialog(!openDialog);

  //   handle block
  const handleBlock = async () => {
    try {
    } catch (error) {}
  };

  return (
    <>
      <Stack
        flexDirection={"row"}
        gap={2}
        pb={0.5}
        borderBottom={0.5}
        alignItems={"center"}
        borderColor="divider"
      >
        <Avatar src={member.avatar.uri} />
        <Typography variant="body1" flexGrow={2}>
          {member.username}
        </Typography>
        <Tooltip title="Lock">
          <IconButton disabled={disalbed} onClick={toggleDialog}>
            <LockPersonIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      {openDialog && (
        <MyDialog
          title="Block member"
          content={"Do you want to block " + member.username}
          onClose={toggleDialog}
          onSubmit={handleBlock}
        />
      )}
    </>
  );
};

export default memo(PrepareBlockMember);
