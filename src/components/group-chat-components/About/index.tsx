"use client";
import CameraIndoorIcon from "@mui/icons-material/CameraIndoor";
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

import useListGroupChatContext from "@/hooks/useListGroupChatContext";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import { Drawer, IconButton, Tooltip } from "@mui/material";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";
import Actions from "./Actions";
import BlockedMember from "./BlockedMember";
import MyDialog from "@/components/custom/Dialog";
// import { Helmet } from "react-helmet";

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
  const { data: session } = useSession();
  const router = useRouter();
  const { appendToLatestRead, socket } = useListGroupChatContext();
  const [toggle, setToggle] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const { data, mutate, isValidating, error } = useSWR(
    "/api/user/group-chat/" + params.id,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess(data, key, config) {},
    }
  );

  useEffect(() => {
    if (data && session) {
      if (data.latestReadBy.includes(session._id as any)) {
        appendToLatestRead(data._id);
      }
    }
  }, [data, session]);

  // Toggle display options
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleOpenConfirmJoinVideo = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleJoinRoom = () => {
    // router.push("/group-chat/" + params.id + "/video");
    router.push("/video-room/" + params.id);
  };

  if (error) {
    return (
      <Typography variant="body1" textAlign={"center"}>
        {String(error)}
      </Typography>
    );
  }

  if (!data && isValidating) {
    return (
      <Typography variant="body1" textAlign={"center"}>
        Loading ...
      </Typography>
    );
  }

  if (!data) {
    return <Typography textAlign={"center"}>No information in group chat</Typography>;
  }

  return (
    <>
      {/* <Helmet>
          <title>{data.name}</title>
        </Helmet> */}
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        pt={1}
        pb={1}
        sx={{ bgcolor: (theme) => theme.palette.white.main }}
      >
        <Typography fontWeight={600} letterSpacing={0.5} variant="h5" ml={2}>
          {data.name}
        </Typography>

        <Box>
          {/* Icon join video room */}
          <Tooltip title="Video room">
            <IconButton className="bg-gradient" sx={{ mr: 2 }} onClick={handleOpenConfirmJoinVideo}>
              <CameraIndoorIcon />
            </IconButton>
          </Tooltip>

          {/* Toggle display options*/}
          <IconButton size="large" onClick={handleToggle}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* List edit */}
        <Drawer open={toggle} anchor="right" onClose={handleToggle}>
          <Paper
            elevation={5}
            sx={{ p: 1, pb: 4, height: "100%", minWidth: "25vw", overflowY: "auto" }}
          >
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
                  // console.log("onlineIds: ", onlineIds);
                  // console.log("Id member: ", member._id);

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

      {openConfirm && (
        <MyDialog
          title="Confirm"
          content="Do you want to join video room"
          onClose={handleCloseConfirm}
          onSubmit={handleJoinRoom}
        />
      )}
    </>
  );
};

export default About;
