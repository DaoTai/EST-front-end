"use client";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import Toolbar from "@mui/material/Toolbar";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const ToggleModeTheme = dynamic(() => import("@/components/common/ToggleModeTheme"), {
  ssr: false,
});
const NormalHeader = () => {
  const router = useRouter();
  return (
    <>
      <Toolbar
        sx={{
          bgcolor: "white.main",
          justifyContent: "space-between",
          pl: "8px !important",
        }}
      >
        <Fab
          size="small"
          sx={{
            background: "#fff",
            boxShadow: "0px 0px 4px rgba(0,0,0,0.5)",
            color: "#333",
          }}
          onClick={() => router.push("/")}
        >
          <ArrowBackIosIcon />
        </Fab>
        <ToggleModeTheme />
      </Toolbar>
      <Divider />
    </>
  );
};

export default NormalHeader;
