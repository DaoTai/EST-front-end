import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";
const Logo = () => {
  return (
    <Box
      p={0.5}
      sx={{
        borderRadius: 1,
        boxShadow: "0px 0px 2px #999",
        a: {
          height: 50,
          borderRadius: "50%",
          display: "block",
        },
      }}
    >
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={48} height={48} />
      </Link>
    </Box>
  );
};

export default Logo;
