import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GroupIcon from "@mui/icons-material/Group";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import CopyrightIcon from "@mui/icons-material/Copyright";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BookIcon from "@mui/icons-material/Book";
import GroupsIcon from "@mui/icons-material/Groups";
import Image from "next/image";
import Link from "next/link";

export const business: { name: string; value: JSX.Element | string; icon: any }[] = [
  {
    name: "Tel: ",
    icon: <PhoneIcon color="primary" />,
    value: <a href="tel:0868968681">0868968681</a>,
  },
  {
    name: "Email: ",
    icon: <EmailIcon color="primary" />,
    value: <a href="mailto:daotaicv2001@gmail.com">daotaicv2001@gmail.com</a>,
  },
  {
    name: "Address: ",
    icon: <BusinessIcon color="primary" />,
    value: "HaNoi, VietNam",
  },
  {
    name: "Copy right by",
    icon: <CopyrightIcon color="primary" />,
    value: <b>DaoTai</b>,
  },
];

export const abouts: { name: string; url: string; icon: any }[] = [
  {
    name: "Courses",
    url: "/user/courses",
    icon: <LibraryBooksIcon color="primary" />,
  },
  {
    name: "Blogs",
    url: "/user/blogs",
    icon: <BookIcon color="primary" />,
  },
  {
    name: "Teachers",
    url: "/user/teachers",
    icon: <GroupsIcon color="primary" />,
  },
];

export const socials: { name: string; url: string; icon: any }[] = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/ESTEDU01",
    icon: <FacebookIcon color="info" />,
  },
  {
    name: "Group",
    url: "https://www.facebook.com/groups/estedu",
    icon: <GroupIcon color="secondary" />,
  },
  {
    name: "Youtube",
    url: "https://www.youtube.com/@YoungTee01",
    icon: <YouTubeIcon color="error" />,
  },
];

const Footer = () => {
  return (
    <>
      <Grid
        container
        rowSpacing={3}
        borderTop={1}
        pt={1}
        pb={4}
        sx={{
          borderColor: "#ccc",
          a: {
            textDecoration: "none",
          },
          ".MuiTypography-root": {
            fontWeight: 500,
            lineHeight: 1.2,
            width: "fit-content",
          },
        }}
      >
        {/* Infomation business */}
        <Grid
          item
          lg={4}
          md={6}
          sm={6}
          xs={12}
          display="flex"
          flexDirection={"column"}
          gap={1}
          p={1}
          overflow={"hidden"}
        >
          <Typography variant="h6" gutterBottom>
            EST Edu
          </Typography>

          {business.map(({ name, value, icon }, i) => (
            <Stack key={i} flexDirection={"row"} alignItems={"center"} gap={1.5}>
              {icon}
              <Typography variant="body1">
                <b>{name} </b> {value}
              </Typography>
            </Stack>
          ))}
        </Grid>

        {/* Social */}
        <Grid
          item
          lg={4}
          md={6}
          sm={6}
          xs={12}
          display="flex"
          flexDirection={"column"}
          gap={1}
          p={1}
          overflow={"hidden"}
        >
          <Typography variant="h6" gutterBottom>
            Social Media
          </Typography>

          {socials.map(({ name, url, icon }, i) => (
            <Stack key={i} flexDirection={"row"} gap={1.5} alignItems="center">
              {icon}
              <Typography variant="body1" gutterBottom>
                <b>{name}: </b>
                <a href={url}>{url}</a>
              </Typography>
            </Stack>
          ))}
        </Grid>

        {/* Donate */}
        <Grid
          item
          lg={4}
          md={6}
          sm={6}
          xs={12}
          display="flex"
          flexDirection={"column"}
          gap={1}
          p={1}
          overflow={"hidden"}
        >
          <Typography variant="h6" gutterBottom>
            Donate
          </Typography>

          <Image
            unoptimized
            src="/qr-donate-banking.jpg"
            alt="qr-bank"
            width={100}
            height={100}
            style={{ width: "100%", height: 200, objectPosition: "left", objectFit: "contain" }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
