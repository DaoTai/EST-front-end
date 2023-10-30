import MyList from "@/components/custom/MyList";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const MenuAction = ({ onClose }: { onClose: () => void }) => {
  const { data: session } = useSession();
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

      {/* List action */}
      <MyList sx={{ pb: 0 }}>
        <Divider light />
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
        <ListItem component={Link} href="/courses" divider onClick={onClose}>
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
