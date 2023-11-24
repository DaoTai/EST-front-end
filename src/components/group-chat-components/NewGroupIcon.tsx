"use client";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { useCallback, useState } from "react";
import MyModal from "@/components/custom/Modal";
import axios from "axios";
import AddMembers from "./AddMembers";

const NewGroup = ({ mutate }: { mutate: any }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [nameGroup, setNameGroup] = useState<string>("");
  const [members, setMembers] = useState<IProfile[]>([]);

  const onCloseModal = useCallback(() => {
    setOpen(false);
    setNameGroup("");
    setMembers([]);
  }, []);

  const handleAddMember = useCallback((member: any) => {
    setMembers((prev) => [...prev, member]);
  }, []);

  const handleDeleteMember = useCallback((member: IProfile) => {
    setMembers((prev) => [...prev].filter((mem) => mem._id !== member._id));
  }, []);

  const handleCreate = async () => {
    try {
      const idMembers = members.map((mem) => mem._id);
      await axios.post("/api/user/group-chat", { name: nameGroup, idMembers });
      mutate();
      onCloseModal();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <Tooltip title="Create group">
        <IconButton onClick={() => setOpen(true)}>
          <GroupAddIcon />
        </IconButton>
      </Tooltip>

      <MyModal open={open} onClose={onCloseModal}>
        <Stack gap={2} mt={2} minHeight={"50vh"} minWidth={"40vw"}>
          <AddMembers existUsers={members} onAdd={handleAddMember} />

          {/* Selected members */}
          <Stack flexDirection={"row"} flexWrap={"wrap"} gap={1}>
            {members.map((member) => {
              return (
                <Chip
                  clickable
                  key={member._id}
                  label={member.username}
                  avatar={<Avatar src={member.avatar.uri} />}
                  onDelete={() => handleDeleteMember(member)}
                />
              );
            })}
          </Stack>
          <Box display={"flex"} gap={1} justifyContent={"space-between"}>
            <TextField
              size="small"
              placeholder="Create name group"
              value={nameGroup}
              onChange={(e) => setNameGroup(e.target.value)}
            />
            <Button
              disabled={!nameGroup.trim() || members.length === 0}
              variant="contained"
              onClick={handleCreate}
            >
              Create
            </Button>
          </Box>
        </Stack>
      </MyModal>
    </>
  );
};

export default NewGroup;
