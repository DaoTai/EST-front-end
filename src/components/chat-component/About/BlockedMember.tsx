import MyDialog from "@/components/custom/Dialog";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

import Typography from "@mui/material/Typography";
import { memo, useState } from "react";

type IProps = {
  disabled?: boolean;
  member: IMemberGroupChat;
  onUnblock?: (idMember: string) => Promise<void>;
};

const BlockedMember = ({ member, onUnblock, disabled = false }: IProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const toggleDialog = () => setOpenDialog(!openDialog);

  const handleUnLock = async () => {
    await onUnblock?.(member._id);
  };

  return (
    <>
      <Stack
        gap={2}
        borderBottom={1}
        pb={0.5}
        flexDirection={"row"}
        flexWrap={"wrap-reverse"}
        alignItems={"center"}
        borderColor={"divider"}
      >
        <Avatar src={member.avatar.uri} />
        <Typography variant="body1" flexGrow={2} style={{ textDecoration: "line-through" }}>
          {member.username}
        </Typography>
        {(onUnblock || disabled) && (
          <Tooltip title="Unblock">
            <IconButton onClick={toggleDialog}>
              <LockOpenIcon />
            </IconButton>
          </Tooltip>
        )}
      </Stack>

      {/* Dialog */}
      {openDialog && (
        <MyDialog
          title="Unblock member"
          content={"Do you want to unblock " + member.username + "?"}
          onClose={toggleDialog}
          onSubmit={handleUnLock}
        />
      )}
    </>
  );
};

export default memo(BlockedMember);
