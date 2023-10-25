"use client";

import GroupsIcon from "@mui/icons-material/Groups";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import SchoolIcon from "@mui/icons-material/School";
import StoreIcon from "@mui/icons-material/Store";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";

import { SvgIconTypeMap, SxProps, Theme } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Link from "next/link";
import { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";

type NavType = {
  href: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  title: string;
};

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const pathName = usePathname();

  const listNavs: NavType[] = useMemo(() => {
    return [
      {
        href: "/teacher",
        Icon: ModelTrainingIcon,
        title: "Teacher",
      },

      // {
      //   href: "/teacher",
      //   Icon: SchoolIcon,
      //   title: "Mine",
      // },
      {
        href: "/search/course",
        Icon: StoreIcon,
        title: "Courses",
      },
      {
        href: "/explore",
        Icon: GroupsIcon,
        title: "Members",
      },
    ];
  }, []);

  const styleNavBar: SxProps<Theme> = useMemo(() => {
    let style: SxProps<Theme> = {
      bgcolor: "white.main",
      ".MuiButtonBase-root": {
        position: "relative",
        transition: "all ease 0.2s",
        borderRadius: 2,
        display: "flex",
        gap: 2,
        justifyContent: "space-between",
        color: "text.primary",
        "&:hover": {
          color: "text.primary",
          bgcolor: "rgba(0,0,0,0.1)",
          svg: {
            transform: "scale(1.1)",
          },
        },
      },
    };
    if (isMobile) {
      style = {
        ...style,
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: theme.zIndex.appBar,
        maxHeight: "88px",
        p: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        borderTop: 1,
        ".MuiButtonBase-root": {
          gap: 0,
          borderRadius: 1,
          flex: "1 1",
          mt: 0,
        },
      };
    }

    return style;
  }, [isMobile]);

  return (
    <Stack p={2} spacing={2} boxShadow={2} flexShrink={0} sx={styleNavBar}>
      {listNavs.map(({ href, Icon, title }, i) => (
        <IconButton
          key={i}
          LinkComponent={Link}
          href={href}
          sx={{
            display: "flex",
            flexDirection: "column",
            background: pathName === href ? theme.palette.gradient.main : "inherit",
          }}
        >
          <Icon fontSize="large" color="action" />
          <Typography variant="subtitle2">{title}</Typography>
        </IconButton>
      ))}
    </Stack>
  );
};

export default Navbar;
