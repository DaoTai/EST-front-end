"use client";
import { Avatar, Box, Button, Chip, Stack, Typography } from "@mui/material";
import React, { memo, useState } from "react";
import AddMembers from "@/components/group-chat-components/AddMembers";
import axios from "axios";
import { showErrorToast } from "@/utils/functions";

type IProps = Pick<IGroupChat, "members"> & {
  onClose: () => void;
};

const AddNewMembers = ({ members, onClose }: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newMembers, setNewMembers] = useState<IMemberGroupChat[]>([]);

  // Add member
  const onAddNewMembers = (member: IMemberGroupChat) => {
    if (!newMembers.includes(member)) {
      setNewMembers((prev) => [...prev, member]);
    }
  };

  // Delete member
  const onDeleteMember = (member: IMemberGroupChat) => {
    setNewMembers((prev) => [...prev].filter((mem) => mem._id !== member._id));
  };

  // Submit
  const handleAddMembers = async () => {
    try {
      // onClose();
    } catch (error) {
      showErrorToast(error);
    }
  };

  return (
    <Box height={"100%"}>
      <Typography variant="h4" textAlign={"center"}>
        Add new members
      </Typography>
      <AddMembers existUsers={[...members, ...newMembers]} onAdd={onAddNewMembers} />
      <Stack gap={2} mt={2} mb={2} flexDirection={"row"} flexWrap={"wrap"}>
        {newMembers.map((member) => {
          return (
            <Chip
              key={member._id}
              label={member.username}
              avatar={<Avatar src={member.avatar.uri} />}
              onDelete={() => onDeleteMember(member)}
            />
          );
        })}
      </Stack>
      <Button
        variant="contained"
        disabled={loading}
        sx={{ display: "block", ml: "auto" }}
        onClick={handleAddMembers}
      >
        Add members
      </Button>
    </Box>
  );
};

export default memo(AddNewMembers);
