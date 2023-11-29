"use client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import { Drawer, IconButton } from "@mui/material";
import axios from "axios";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import useSWR, { Fetcher } from "swr";
import Actions from "./Actions";
import BlockedMember from "./BlockedMember";

const fetcher: Fetcher<IGroupChat, string> = (url: string) =>
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Fetch group chat failed");
    }
  });

const About = () => {
  const params = useParams();

  const [toggle, setToggle] = useState<boolean>(false);
  const { data, mutate, isValidating } = useSWR("/api/user/group-chat/" + params.id, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    onSuccess(data, key, config) {
      // console.log("detail group-chat: ", data);
    },
  });

  // console.log("About group chat: ", data);

  const handleSeenLatestMessage = async () => {
    await axios.put("/api/user/group-chat/" + params.id);
  };

  if (!data && isValidating) {
    return (
      <Typography variant="body1" textAlign={"center"}>
        Loading ...
      </Typography>
    );
  }

  const handleToggle = () => {
    setToggle(!toggle);
  };

  if (data) {
    return (
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ bgcolor: (theme) => theme.palette.white.main }}
      >
        <Typography fontWeight={500} letterSpacing={0.5} variant="h6" ml={2}>
          {data.name}
        </Typography>
        {/* Toggle display */}
        <IconButton onClick={handleToggle}>
          <MenuIcon />
        </IconButton>

        {/* List edit */}
        <Drawer open={toggle} anchor="right" onClose={handleToggle}>
          <Paper elevation={5} sx={{ p: 1, height: "100%", pb: 4, overflowY: "auto" }}>
            <IconButton onClick={handleToggle}>
              <ArrowBackIos />
            </IconButton>
            <Divider />
            {/* Actions */}
            <Actions groupChat={data} mutate={mutate} />
            {/* Name group chat */}
            <Typography
              mt={1}
              fontWeight={500}
              letterSpacing={0.5}
              gutterBottom
              variant="h6"
              textAlign={"center"}
              alignSelf={"center"}
            >
              {data.name}
            </Typography>
            <Divider />

            {/* Information */}
            <Stack gap={1}>
              <Stack mt={1} gap={2} flexDirection={"row"} alignItems={"stretch"}>
                {/* Host */}
                <Typography gutterBottom variant="subtitle1" fontWeight={500}>
                  Host
                </Typography>
                <Chip
                  clickable
                  size="small"
                  className="bg-gradient"
                  component={NextLink}
                  href={"/profile/" + data.host._id}
                  label={data.host.username}
                />
              </Stack>

              <Typography gutterBottom variant="subtitle1" fontWeight={500}>
                Total members: {data.members.length}
              </Typography>

              {/* Blocked members */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1" fontWeight={500}>
                    Blocked members ({data.blockedMembers.length})
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {data.blockedMembers.map((member) => {
                    return <BlockedMember key={member._id} member={member} />;
                  })}
                </AccordionDetails>
              </Accordion>

              {/* Members */}
              <Typography gutterBottom variant="subtitle1" fontWeight={500}>
                Members
              </Typography>
              <Stack gap={2}>
                {data.members.map((member) => {
                  return (
                    <Stack
                      key={member._id}
                      gap={2}
                      borderBottom={1}
                      pb={0.5}
                      flexDirection={"row"}
                      alignItems={"start"}
                      borderColor={"divider"}
                    >
                      <Avatar src={member.avatar.uri} />
                      <Box>
                        <Chip
                          clickable
                          size="small"
                          color="info"
                          component={NextLink}
                          href={"/profile/" + member._id}
                          label={member.username}
                        />
                        <Stack gap={1} mt={1} flexDirection={"row"} flexWrap={"wrap"}>
                          {member.favouriteProrammingLanguages?.map((lang, i) => (
                            <Chip size="small" key={i} label={lang} />
                          ))}
                        </Stack>
                      </Box>
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
          </Paper>
        </Drawer>
      </Stack>
    );
  }
};

export default About;
