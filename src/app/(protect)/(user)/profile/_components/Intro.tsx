import CakeIcon from "@mui/icons-material/Cake";
import CelebrationIcon from "@mui/icons-material/Celebration";
import SchoolIcon from "@mui/icons-material/School";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import dayjs from "dayjs";

const Intro = async ({ user }: { user: IProfile }) => {
  return (
    <Stack gap={1}>
      {/* Bio */}
      {user?.bio && (
        <>
          <Typography variant="h6">Bio</Typography>
          <Typography variant="body1" component="article" gutterBottom>
            {user?.bio}
          </Typography>
        </>
      )}
      <Divider />
      {/* List basic information */}
      <List
        sx={{
          ".MuiListItem-root": {
            p: 0,
            pb: 0.5,
            alignItems: "flex-start",
          },
          ".MuiListItemIcon-root": {
            minWidth: 32,
          },
        }}
      >
        {user?.dob && (
          <ListItem>
            <ListItemIcon>
              <CakeIcon />
            </ListItemIcon>
            <ListItemText primary={dayjs(user?.dob).format("DD/MM/YYYY")} />
          </ListItem>
        )}
        {user?.school && (
          <ListItem>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary={user?.school} />
          </ListItem>
        )}
        <ListItem>
          <ListItemIcon>
            <CelebrationIcon />
          </ListItemIcon>
          <ListItemText primary={"Started " + dayjs(user?.createdAt).format("DD/MM/YYYY")} />
        </ListItem>
      </List>
      <Divider />
      <Stack gap={1} flexDirection={"row"} flexWrap={"wrap"}>
        {user?.favouriteProrammingLanguages.map((lang, i) => (
          <Chip key={i} className="bg-gradient" label={lang} />
        ))}
      </Stack>
    </Stack>
  );
};

export default Intro;
