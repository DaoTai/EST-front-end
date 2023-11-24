"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Spinner from "@/components/custom/Spinner";
import { showErrorToast } from "@/utils/functions";
import { memo, useState } from "react";
import BlockedMember from "./BlockedMember";
import PrepareBlockMember from "./PrepareBlockMember";

type IProps = Pick<IGroupChat, "blockedMembers" | "name" | "members"> & {
  onClose: () => void;
  onEdit: (val: string) => Promise<void>;
};

const EditGroupChat = ({ name, members, blockedMembers, onClose, onEdit }: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(name);
  //   Handle edit group
  const handleEdit = async () => {
    setLoading(true);
    onEdit(newName.trim())
      .then(() => {
        onClose();
      })
      .catch((err) => {
        showErrorToast(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChangeName = (value: string) => {
    setNewName(value);
  };

  return (
    <>
      <Box>
        <Typography variant="h4" textAlign={"center"}>
          Edit group
        </Typography>
        <TextField
          label="Name group"
          fullWidth
          placeholder="Edit name"
          value={newName}
          onChange={(e) => handleChangeName(e.target.value)}
          margin="normal"
        />

        {/* Block Members */}
        <Typography gutterBottom variant="subtitle1">
          Blocked members
        </Typography>
        <Stack gap={1} mb={1}>
          {members.map((mem) => (
            <BlockedMember key={mem._id} member={mem} />
          ))}
        </Stack>

        {/* Members */}
        <Typography gutterBottom variant="subtitle1">
          Members
        </Typography>
        <Stack gap={1} mb={1}>
          {members.map((mem) => {
            const isBlocked = blockedMembers.includes(mem);
            return <PrepareBlockMember key={mem._id} member={mem} disalbed={isBlocked} />;
          })}
        </Stack>

        <Button
          variant="contained"
          disabled={loading}
          sx={{ mt: 2, ml: "auto", display: "block" }}
          onClick={handleEdit}
        >
          Update
        </Button>
      </Box>

      {loading && <Spinner />}
    </>
  );
};

export default memo(EditGroupChat);
