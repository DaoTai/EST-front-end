import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
const Logo = () => {
  return (
    <Stack
      flexDirection={"row"}
      alignItems={"center"}
      gap={1}
      pl={0.2}
      pr={0.2}
      sx={{
        textDecoration: "none",
        a: {
          height: 50,
          borderRadius: "50%",
          display: "block",
          img: {
            transition: "all linear 0.3",
          },
          "&:hover": {
            img: {
              filter: "contrast(150%)",
            },
          },
        },
      }}
    >
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={50} height={50} />
      </Link>
      <Typography variant="h4" color="white" sx={{ textShadow: "4px 1px 8px #333" }}>
        EST Edu
      </Typography>
    </Stack>
  );
};

export default Logo;
