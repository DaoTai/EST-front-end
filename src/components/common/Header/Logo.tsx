import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";
const Logo = () => {
  return (
    <Box
      p={0.5}
      sx={{
        borderRadius: 1,
      }}
    >
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={42} height={42} />
      </Link>
    </Box>
  );
};

export default Logo;
