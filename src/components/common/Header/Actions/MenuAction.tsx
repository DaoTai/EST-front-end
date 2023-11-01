import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import MyList from "@/components/custom/MyList";
import ToggleModeTheme from "../../ToggleModeTheme";

const MenuAction = ({ onClose }: { onClose: () => void }) => {
  const { data: session } = useSession();
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Stack gap={1}>
      {/* Basic info */}
      <Stack gap={3} p={2} pb={0} flexDirection={"row"} alignItems={"center"}>
        <Box>
          {session?.avatar && (
            <Image
              src={session?.avatar?.uri as string}
              alt="avatar"
              width={54}
              height={54}
              style={{ borderRadius: "50%" }}
            />
          )}
        </Box>
        <Stack>
          <Typography variant="h6">{session?.fullName}</Typography>
          <Typography variant="body2" color="GrayText">
            @{session?.username}
          </Typography>
        </Stack>
      </Stack>

      {isMedium && (
        <Divider>
          <ToggleModeTheme />
        </Divider>
      )}

      {/* List action */}
      <MyList sx={{ pt: 0, pb: 0 }}>
        {session?.roles.includes("admin") && (
          <>
            <ListItem component={Link} href="/admin/dashboard" divider onClick={onClose}>
              Dashboard
            </ListItem>
            <ListItem component={Link} href="/admin/courses" divider onClick={onClose}>
              Courses
            </ListItem>
          </>
        )}
        <ListItem component={Link} href="/my-courses" divider onClick={onClose}>
          My courses
        </ListItem>
        <ListItem component={Link} href="/profile" divider onClick={onClose}>
          Profile
        </ListItem>
        <ListItem divider>
          <ListItemText primary="Sign out" onClick={() => signOut()} />
        </ListItem>
      </MyList>
    </Stack>
  );
};

export default MenuAction;
