"use client";
import AddMembers from "@/components/group-chat-components/AddMembers";
import { Avatar, Box, Button, Chip, Stack, Typography } from "@mui/material";
import { memo, useState } from "react";

type IProps = Pick<IGroupChat, "members"> & {
  loading: boolean;
  onClose: () => void;
  onAdd: (id: string[]) => Promise<void>;
};

const AddNewMembers = ({ loading, members, onClose, onAdd }: IProps) => {
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
    const listIds = newMembers.map((mem) => mem._id);
    listIds && (await onAdd(listIds));
    onClose();
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
        disabled={loading || newMembers.length === 0}
        sx={{ display: "block", ml: "auto" }}
        onClick={handleAddMembers}
      >
        Add members
      </Button>
    </Box>
  );
};

export default memo(AddNewMembers);
