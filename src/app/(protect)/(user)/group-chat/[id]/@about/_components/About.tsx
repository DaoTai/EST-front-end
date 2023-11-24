"use client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar, Box, Chip, Divider, Paper, Stack } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import NextLink from "next/link";
import { useParams } from "next/navigation";
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
  const { data, mutate } = useSWR("/api/user/group-chat/" + params.id, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    onSuccess(data, key, config) {
      // console.log("data: ", data);
    },
  });

  if (data) {
    return (
      <Paper elevation={5} sx={{ p: 1, height: "100vh", overflowY: "auto" }}>
        {/* Actions */}
        <Actions groupChat={data} mutate={mutate} />
        <Typography
          mt={1}
          fontWeight={600}
          letterSpacing={1}
          gutterBottom
          textAlign={"center"}
          variant="h6"
          alignSelf={"center"}
        >
          {data.name}
        </Typography>
        <Divider />

        {/* Information */}
        <Stack gap={1}>
          <Stack mt={1} gap={2} flexDirection={"row"} alignItems={"stretch"}>
            <Typography gutterBottom variant="body1" fontWeight={600}>
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

          <Typography gutterBottom variant="body1">
            Total members:<b> {data.members.length}</b>
          </Typography>

          {/* Blocked members */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Blocked members</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {data.members.map((member) => {
                return <BlockedMember key={member._id} member={member} />;
              })}
            </AccordionDetails>
          </Accordion>

          {/* Members */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Members</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {data.members.map((member) => {
                return (
                  <Stack
                    key={member._id}
                    gap={2}
                    borderBottom={1}
                    pb={0.5}
                    flexDirection={"row"}
                    alignItems={"center"}
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
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Paper>
    );
  }
  return <></>;
};

export default About;
