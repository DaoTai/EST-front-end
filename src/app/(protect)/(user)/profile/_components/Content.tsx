import CakeIcon from "@mui/icons-material/Cake";
import CelebrationIcon from "@mui/icons-material/Celebration";
import SchoolIcon from "@mui/icons-material/School";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import dayjs from "dayjs";
const Content = async ({ user }: { user: IUser }) => {
  return (
    <Grid container mt={1} spacing={2}>
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
                  {user?.bio}
                </Typography>
              </Box>
              <Divider />
              {/* List basic information */}
              <List
                sx={{
                  ".MuiListItem-root": {
                    p: 0,
                    pb: 1,
                  },
                  ".MuiListItemIcon-root": {
                    minWidth: 32,
                  },
                }}
              >
                <ListItem>
                  <ListItemIcon>
                    <CakeIcon />
                  </ListItemIcon>
                  <ListItemText primary={dayjs(user?.dob).format("DD/MM/YYYY")} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText primary={user?.school} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CelebrationIcon />
                  </ListItemIcon>

                  <ListItemText
                    primary={"Started " + dayjs(user?.createdAt).format("DD/MM/YYYY")}
                  />
                </ListItem>
              </List>
              <Divider />
              <Stack gap={1} flexDirection={"row"} flexWrap={"wrap"}>
                {user?.favouriteProrammingLanguages.map((lang, i) => (
                  <Chip key={i} className="bg-gradient" label={lang} />
                ))}
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid item md={9}>
        Haha
      </Grid>
    </Grid>
  );
};

export default Content;
