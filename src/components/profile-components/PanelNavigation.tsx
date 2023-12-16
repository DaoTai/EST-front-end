import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { options } from "@/config/next-auth";
const PanelNavigation = async () => {
  const session = await getServerSession(options);
  return (
    <Stack
      flexDirection={"row"}
      mt={2}
      pb={1}
      gap={1}
      flexWrap={"wrap"}
      sx={{
        a: {
          display: "block",
          pl: 2,
          pr: 2,
          border: 1,
          borderColor: "mainBlue.main",
          ":hover": {
            bgcolor: "mainBlue.main",
          },
        },
      }}
    >
      <Button variant="text" LinkComponent={Link} href="/profile/edit">
        Edit
      </Button>
      {!session?.provider && (
        <Button variant="text" LinkComponent={Link} href="/profile/change-password">
          Password
        </Button>
      )}
      <Button variant="text" LinkComponent={Link} href="/profile/cv">
        CV
      </Button>
    </Stack>
  );
};

export default PanelNavigation;
