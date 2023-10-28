"use client";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import StoreIcon from "@mui/icons-material/Store";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";

import { SvgIconTypeMap, SxProps, Theme } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type NavType = {
  href: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  title: string;
};

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const pathName = usePathname();
  const { data: session } = useSession();

  const listNavs: NavType[] = useMemo(() => {
    let navs: NavType[] = [];

    if (session?.roles.includes("admin")) {
      navs.push(
        {
          href: "/admin/dashboard",
          Icon: DashboardIcon,
          title: "Dashboard",
        },
        {
          href: "/admin/courses",
          Icon: MenuBookIcon,
          title: "Courses",
        }
      );
    }

    if (session?.roles.includes("teacher")) {
      navs.push({
        href: "/teacher",
        Icon: ModelTrainingIcon,
        title: "Teacher",
      });
    }

    navs = [
      ...navs,
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

    return navs;
  }, [session]);

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
    <Stack p={1} spacing={2} boxShadow={1} flexShrink={0} sx={styleNavBar}>
      {listNavs.map(({ href, Icon, title }, i) => (
        <IconButton
          key={i}
          LinkComponent={Link}
          href={href}
          sx={{
            display: "flex",
            gap: "0 !important",
            flexDirection: "column",
            background: pathName.startsWith(href) ? theme.palette.gradient.main : "inherit",
            color: pathName.startsWith(href) ? "#fff !important" : "inherit",
          }}
        >
          <Icon fontSize="large" />
          {!isMobile && <Typography variant="subtitle2">{title}</Typography>}
        </IconButton>
      ))}
    </Stack>
  );
};

export default Navbar;
