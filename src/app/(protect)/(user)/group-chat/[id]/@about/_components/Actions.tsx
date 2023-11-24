"use client";

import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import ExitToApp from "@mui/icons-material/ExitToApp";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { KeyedMutator } from "swr";
import { useCallback, useMemo, useState } from "react";

import MyDialog from "@/components/custom/Dialog";
import MyModal from "@/components/custom/Modal";
import Spinner from "@/components/custom/Spinner";
import { useListGroupChatContext } from "@/providers/ListGroupChatContext";
import { showErrorToast } from "@/utils/functions";
import AddNewMembers from "./Add";
import EditGroupChat from "./Edit";

type IProps = {
  groupChat: IGroupChat;
  mutate: KeyedMutator<IGroupChat>;
};

const Actions = ({ groupChat, mutate }: IProps) => {
  const { revalidate } = useListGroupChatContext();

  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog, seOpenDialog] = useState<"exit" | "delete" | null>(null);
  const [openModal, setOpenModal] = useState<"edit" | "add" | null>(null);

  const isHost = useMemo(() => {
    return groupChat?.host._id === session?._id;
  }, [groupChat, session]);

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
    setLoading(true);
  };

  //   Handle delete group
  const handleDelete = () => {
    setLoading(true);
    axios
      .delete("/api/user/group-chat/" + groupChat._id)
      .then(() => {
        router.replace("/group-chat");
        revalidate();
      })
      .catch((err) => showErrorToast(err))
      .finally(() => {
        setLoading(false);
      });
  };

  //   Handle delete group
  const handleAddMembers = async () => {
    try {
      console.log("delete");
    } catch (error) {}
  };

  //   Handle edit group
  const handleEdit = async (newName: string) => {
    setLoading(true);
    axios
      .patch("/api/user/group-chat/" + groupChat._id, {
        name: newName.trim(),
      })
      .then(() => {
        revalidate();
        mutate();
      })
      .catch((err) => {
        showErrorToast(err);
      })
      .finally(() => {
        setLoading(false);
      });
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
        {/* Edit icon  */}
        <Tooltip title="Edit name">
          <IconButton color="primary" onClick={onOpenEditModal}>
            <Edit />
          </IconButton>
        </Tooltip>
        {/* Add icon  */}
        <Tooltip title="Add members">
          <IconButton color="success" onClick={onOpenAddModal}>
            <Add />
          </IconButton>
        </Tooltip>
        {/* Exit icon  */}
        <Tooltip title="Exit group">
          <IconButton color="error" onClick={onOpenExitDialog}>
            <ExitToApp />
          </IconButton>
        </Tooltip>
        {/* Delete icon  */}
        {isHost && (
          <Tooltip title="Delete group" onClick={onOpenDeleteDialog}>
            <IconButton color="error">
              <Delete />
            </IconButton>
          </Tooltip>
        )}
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
            onEdit={handleEdit}
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

      {/* Spinner */}
      {loading && <Spinner />}
    </>
  );
};

export default Actions;
