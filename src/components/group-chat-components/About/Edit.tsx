"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Spinner from "@/components/custom/Spinner";
import { memo, useMemo, useState } from "react";
import BlockedMember from "./BlockedMember";
import { Divider } from "@mui/material";
import { useSession } from "next-auth/react";
import ListMembers from "./ListMembers";
import groupChatService from "@/services/group-chat";
import { showErrorToast } from "@/utils/functions";

type IHandleStatusMember = {
  idMember: string;
  option: "block" | "unblock";
};

type IProps = {
  loading: boolean;
  groupChat: IGroupChat;
  onClose: () => void;
  onEditName: (val: string) => Promise<void>;
  onDeleteMember: (idMember: string) => Promise<void>;
  onHandleStatus: ({ idMember, option }: IHandleStatusMember) => Promise<void>;
};

const EditGroupChat = ({
  loading,
  groupChat,
  onClose,
  onEditName,
  onDeleteMember,
  onHandleStatus,
}: IProps) => {
  const { data: session } = useSession();

  const { name, members, blockedMembers, host } = groupChat;
  const [newName, setNewName] = useState<string>(name);

  const isHost = useMemo(() => {
    return session?._id !== host._id;
  }, [session, host]);
  // On change new name
  const handleChangeName = (value: string) => {
    setNewName(value);
  };

  //   Handle edit name group
  const handleEditName = async () => {
    await onEditName(newName.trim());
    onClose();
  };

  // Handle block member
  const handleBlockMember = async (idMember: string) => {
    await onHandleStatus({ idMember, option: "block" });
  };

  // Handle unblock member
  const handleUnBlockMember = async (idMember: string) => {
    await onHandleStatus({ idMember, option: "unblock" });
  };

  // Handle delete member
  const handleDeleteMember = async (idMember: string) => {
    await onDeleteMember(idMember);
  };

  return (
    <>
      <Box>
        <Typography variant="h4" textAlign={"center"}>
          Edit group
        </Typography>
        <Box mb={1}>
          <TextField
            label="Name group"
            fullWidth
            placeholder="Edit name"
            value={newName}
            onChange={(e) => handleChangeName(e.target.value)}
            margin="normal"
          />

          <Button
            variant="contained"
            disabled={loading}
            sx={{ ml: "auto", display: "block" }}
            onClick={handleEditName}
          >
            Update
          </Button>
        </Box>

        <Divider />

        {/* Block Members */}
        <Typography gutterBottom variant="subtitle1" fontWeight={500} mt={1}>
          Blocked members
        </Typography>
        <Stack gap={1} mb={1}>
          {blockedMembers.length > 0 ? (
            blockedMembers.map((mem) => (
              <BlockedMember
                key={mem._id}
                disabled={!isHost}
                member={mem}
                onUnblock={handleUnBlockMember}
              />
            ))
          ) : (
            <Typography textAlign={"center"} variant="subtitle1">
              No body
            </Typography>
          )}
        </Stack>

        <Divider />

        {/* Members */}
        <Typography gutterBottom variant="subtitle1" fontWeight={500} mt={1}>
          Members
        </Typography>
        <Stack gap={1} mb={1}>
          {members.map((mem) => {
            const isBlocked = blockedMembers.some((block) => block._id === mem._id);
            // Disable to lock members: you are not not, host, blocked,
            const isDisabled = isHost || host._id === mem._id || isBlocked;

            return (
              <ListMembers
                key={mem._id}
                member={mem}
                disalbed={isDisabled}
                onBlock={handleBlockMember}
                onDelete={handleDeleteMember}
              />
            );
          })}
        </Stack>
      </Box>

      {loading && <Spinner />}
    </>
  );
};

export default memo(EditGroupChat);
