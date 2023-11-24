"use client";

import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import ExitToApp from "@mui/icons-material/ExitToApp";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

import { useCallback, useState } from "react";
import MyDialog from "@/components/custom/Dialog";
import MyModal from "@/components/custom/Modal";
import AddNewMembers from "./Add";
import EditGroupChat from "./Edit";
import { Box } from "@mui/material";

const Actions = ({ groupChat }: { groupChat: IGroupChat }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog, seOpenDialog] = useState<"exit" | "delete" | null>(null);
  const [openModal, setOpenModal] = useState<"edit" | "add" | null>(null);

  const onCloseDialog = useCallback(() => {
    seOpenDialog(null);
  }, []);

  const onCloseModal = useCallback(() => {
    setOpenModal(null);
  }, []);

  const onOpenExitDialog = () => seOpenDialog("exit");
  const onOpenDeleteDialog = () => seOpenDialog("delete");
  const onOpenEditModal = () => setOpenModal("edit");
  const onOpenAddModal = () => setOpenModal("add");

  //   Handle exit group
  const handleExit = async () => {
    try {
      console.log("exit");
    } catch (error) {}
  };

  //   Handle delete group
  const handleDelete = async () => {
    try {
      console.log("delete");
    } catch (error) {}
  };

  //   Handle delete group
  const handleAddMembers = async () => {
    try {
      console.log("delete");
    } catch (error) {}
  };

  return (
    <>
      {/* Actions */}
      <Stack
        pb={1}
        className="underline-gradient"
        width={"100%"}
        flexDirection={"row"}
        alignItems={"center"}
        gap={1}
        justifyContent={"space-evenly"}
      >
        <Tooltip title="Edit name">
          <IconButton color="primary" onClick={onOpenEditModal}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add members">
          <IconButton color="success" onClick={onOpenAddModal}>
            <Add />
          </IconButton>
        </Tooltip>
        <Tooltip title="Exit group">
          <IconButton color="error" onClick={onOpenExitDialog}>
            <ExitToApp />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete group" onClick={onOpenDeleteDialog}>
          <IconButton color="error">
            <Delete />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* ========= Confirm dialog =========*/}
      {/* Exit */}
      {openDialog === "exit" && (
        <MyDialog
          title="Exit group"
          content="Do you want to exit group?"
          onClose={onCloseDialog}
          onSubmit={handleExit}
        />
      )}

      {/* Delete */}
      {openDialog === "delete" && (
        <MyDialog
          title="Delete group"
          content="Everything about group chat will be deleted forever"
          onClose={onCloseDialog}
          onSubmit={handleDelete}
        />
      )}

      {/* ========= Modals =========*/}
      {/* Edit */}
      {
        <MyModal open={openModal === "edit"} onClose={onCloseModal}>
          <EditGroupChat
            name={groupChat.name}
            blockedMembers={groupChat.blockedMembers}
            members={groupChat.members}
            onClose={onCloseModal}
          />
        </MyModal>
      }
      {/* Add */}
      {
        <MyModal open={openModal === "add"} onClose={onCloseModal}>
          <Box minHeight={"60vh"}>
            <AddNewMembers members={groupChat.members} onClose={onCloseModal} />
          </Box>
        </MyModal>
      }
    </>
  );
};

export default Actions;
