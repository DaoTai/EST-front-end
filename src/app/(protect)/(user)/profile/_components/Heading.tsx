import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Image from "next/image";

const HeadingProfile = async (data: Partial<Pick<IUser, "avatar" | "username" | "roles">>) => {
  return (
    <Stack
      p={2}
      gap={2}
      boxShadow={1}
      flexDirection={"row"}
      flexWrap={"wrap"}
      alignItems={"center"}
      className="bg-gradient"
      borderRadius={1}
    >
      <Avatar
        sx={{
          width: 210,
          height: 210,
          background: "white",
        }}
      >
        {data?.avatar ? (
          <Image
            src={data.avatar.uri}
            alt="avatar"
            width={200}
            height={200}
            style={{ borderRadius: 99 }}
          />
        ) : (
          data?.username && data?.username[0]
        )}
      </Avatar>
      <Box>
        <Typography variant="h4" fontWeight={500}>
          {data?.username}
        </Typography>
        <Stack flexDirection="row" mt={1} gap={1}>
          {data?.roles?.map((role, i) => (
            <Chip
              key={i}
              label={role}
              color="default"
              sx={{ pr: 1, pl: 1, fontSize: 15, letterSpacing: 1 }}
            />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default HeadingProfile;
