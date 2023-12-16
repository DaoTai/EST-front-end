"use client";
import CancelIcon from "@mui/icons-material/Cancel";
import LockPersonIcon from "@mui/icons-material/LockPerson";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import MyDialog from "@/components/custom/Dialog";
import { Box, Chip } from "@mui/material";
import { useSession } from "next-auth/react";
import { memo, useMemo, useState } from "react";

type IProps = {
  member: IMemberGroupChat;
  disalbed?: boolean;
  onBlock: (idMember: string) => Promise<void>;
  onDelete: (idMember: string) => Promise<void>;
};

const ListMembers = ({ member, disalbed = false, onBlock, onDelete }: IProps) => {
  const { data: session } = useSession();
  const [openConfirmBlock, setOpenConfirmBlock] = useState<boolean>(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  //   / Toggle confirm block member
  const toggleConfirmBlock = () => setOpenConfirmBlock(!openConfirmBlock);

  //   / Toggle confirm delete member
  const toggleConfirmDelete = () => setOpenConfirmDelete(!openConfirmDelete);

  //   handle block
  const handleBlock = async () => {
    await onBlock(member._id);
    toggleConfirmBlock();
  };

  // handle delete member
  const handleDeleteMember = async () => {
    await onDelete(member._id);
    toggleConfirmDelete();
  };

  const isHost = useMemo(() => {
    return session?._id === member._id;
  }, [session, member]);

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
        {isHost ? (
          <Box sx={{ flexGrow: 2, width: "fit-content" }}>
            <Chip className="bg-gradient" label={member.username} />
          </Box>
        ) : (
          <Typography variant="body1" flexGrow={2}>
            {member.username}
          </Typography>
        )}

        <Stack flexDirection={"row"} gap={0.5}>
          <Tooltip title="Lock">
            <span>
              <IconButton disabled={disalbed} onClick={toggleConfirmBlock}>
                <LockPersonIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Cancel">
            <span>
              <IconButton color="error" disabled={isHost} onClick={toggleConfirmDelete}>
                <CancelIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
      </Stack>

      {/* Confirm block */}
      {openConfirmBlock && (
        <MyDialog
          title="Block member"
          content={"Do you want to block " + member.username}
          onClose={toggleConfirmBlock}
          onSubmit={handleBlock}
        />
      )}

      {/* Confirm delete */}
      {openConfirmDelete && (
        <MyDialog
          title="Delete member"
          content={"Do you want to delete " + member.username + "?"}
          onClose={toggleConfirmDelete}
          onSubmit={handleDeleteMember}
        />
      )}
    </>
  );
};

export default memo(ListMembers);
