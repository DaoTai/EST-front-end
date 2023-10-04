import { options } from "@/config/next-auth";
import CakeIcon from "@mui/icons-material/Cake";
import CelebrationIcon from "@mui/icons-material/Celebration";
import SchoolIcon from "@mui/icons-material/School";
import { Avatar, Box, Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

const Profile = async () => {
  const session = await getServerSession(options);
  return (
    <>
      {/* Heading */}
      <Stack
        p={2}
        boxShadow={1}
        gap={4}
        flexDirection={"row"}
        alignItems={"center"}
        className="bg-gradient"
        sx={{ background: "gradient", borderBottomLeftRadius: 2, borderBottomRightRadius: 8 }}
      >
        <Avatar
          sx={{
            width: 215,
            height: 215,
            background: "white",
            img: {
              borderRadius: 99,
            },
          }}
        >
          {session?.avatar ? (
            <Image src={session.avatar.uri} alt="avatar" width={200} height={200} />
          ) : (
            session?.username[0]
          )}
        </Avatar>
        <Typography variant="h4" fontWeight={500}>
          {session?.username}
        </Typography>
      </Stack>

      {/* Menu */}
      <Stack
        flexDirection={"row"}
        gap={2}
        mt={2}
        pb={1}
        pt={1}
        sx={{
          a: {
            display: "block",
            p: 2,
            pt: 1,
            pb: 1,
            borderRadius: 1,
            bgcolor: "background.default",
            textDecoration: "none",
            border: 1,
            ":hover": {
              bgcolor: "rgba(0,0,0,0.1)",
            },
          },
        }}
      >
        <Box component={Link} href="/profile/edit">
          Edit
        </Box>
        <Box component={Link} href="/profile/change-password">
          Password
        </Box>
        <Box component={Link} href="/profile">
          Blog
        </Box>
      </Stack>
      <Divider />

      {/* Content */}
      <Grid container mt={1}>
        <Grid item md={3}>
          <Card>
            <CardContent>
              <Stack gap={1}>
                {/* Bio */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Bio
                  </Typography>
                  <Typography variant="body1" component="article" gutterBottom>
                    {/* {session?.bio} */}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt obcaecati
                    officia, ratione commodi quod rerum ipsum temporibus quam quidem pariatur
                    laudantium, ad assumenda error et magni sapiente inventore est. Repudiandae!
                  </Typography>
                </Box>
                <Divider />
                {/* List basic information */}
                <List
                  sx={{
                    ".MuiListItemIcon-root": {
                      minWidth: 32,
                    },
                  }}
                >
                  <ListItem disablePadding>
                    <ListItemIcon>
                      <CakeIcon />
                    </ListItemIcon>
                    <ListItemText primary="24/10/2001" />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary="Đại học Thuỷ Lợi" />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon>
                      <CelebrationIcon />
                    </ListItemIcon>

                    <ListItemText primary="Start: 29/9/2023" />
                  </ListItem>
                </List>
                <Divider />
                <Stack gap={1} flexDirection={"row"} flexWrap={"wrap"}>
                  <Chip className="bg-gradient" label="Java" />
                  <Chip className="bg-gradient" label="Javscript" />
                  <Chip className="bg-gradient" label="HTML" />
                  <Chip className="bg-gradient" label="Java" />
                  <Chip className="bg-gradient" label="Javscript" />
                  <Chip className="bg-gradient" label="HTML" />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
