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
    try {
      await axios.delete("/api/user/group-chat/" + groupChat._id + "/cancel");
      router.replace("/group-chat");
      revalidate();
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  //   Handle delete group
  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete("/api/user/group-chat/" + groupChat._id);
      router.replace("/group-chat");
      revalidate();
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  //   Handle add new members to group
  const handleAddMembers = useCallback(async (idMembers: string[]) => {
    if (idMembers.length > 0) {
      setLoading(true);
      try {
        await axios.post("/api/user/group-chat/" + groupChat._id + "/members", {
          idMembers,
        });
        mutate();
        revalidate();
      } catch (error) {
        showErrorToast(error);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  //   Handle edit name group
  const handleEditName = useCallback(async (newName: string) => {
    setLoading(true);
    try {
      await axios.patch("/api/user/group-chat/" + groupChat._id, {
        name: newName.trim(),
      });
      revalidate();
      mutate();
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle block member
  const handleStatusMember = useCallback(
    async ({ idMember, option }: { idMember: string; option: "block" | "unblock" }) => {
      setLoading(true);
      try {
        await axios.patch(
          `/api/user/group-chat/${groupChat._id}/members/${idMember}?option=${option}`,
          {
            idMember,
          }
        );
        mutate();
      } catch (error) {
        showErrorToast(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

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

        {/* Exit icon  */}
        <Tooltip title="Exit group">
          <IconButton color="error" onClick={onOpenExitDialog}>
            <ExitToApp />
          </IconButton>
        </Tooltip>
        {/* Delete icon  */}
        {isHost && (
          <>
            {/* Add icon  */}
            <Tooltip title="Add members">
              <IconButton color="success" onClick={onOpenAddModal}>
                <Add />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete group" onClick={onOpenDeleteDialog}>
              <IconButton color="error">
                <Delete />
              </IconButton>
            </Tooltip>
          </>
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
          <Box minWidth={"35vw"}>
            <EditGroupChat
              loading={loading}
              groupChat={groupChat}
              onClose={onCloseModal}
              onEditName={handleEditName}
              onHandleStatus={handleStatusMember}
            />
          </Box>
        </MyModal>
      }
      {/* Add */}
      {
        <MyModal open={openModal === "add"} onClose={onCloseModal}>
          <Box minHeight={"60vh"}>
            <AddNewMembers
              loading={loading}
              members={groupChat.members}
              onClose={onCloseModal}
              onAdd={handleAddMembers}
            />
          </Box>
        </MyModal>
      }

      {/* Spinner */}
      {loading && <Spinner />}
    </>
  );
};

export default Actions;
