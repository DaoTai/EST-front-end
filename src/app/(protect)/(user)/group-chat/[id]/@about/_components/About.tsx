"use client";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Avatar, Box, Chip, Divider, IconButton, Link, Paper, Stack, Tooltip } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { notFound, useParams } from "next/navigation";
import React from "react";
import NextLink from "next/link";
import useSWR, { Fetcher } from "swr";
import Edit from "@mui/icons-material/Edit";
import ExitToApp from "@mui/icons-material/ExitToApp";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
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
  const { data } = useSWR("/api/user/group-chat/" + params.id, fetcher, {
    onSuccess(data, key, config) {
      console.log("data: ", data);
    },
  });
  if (data) {
    return (
      <Paper sx={{ p: 1, height: "100vh", overflowY: "auto" }}>
        <Stack
          pb={1}
          className="underline-gradient"
          width={"100%"}
          flexDirection={"row"}
          alignItems={"center"}
          gap={1}
          justifyContent={"space-evenly"}
        >
          <Tooltip title="Edit name">
            <IconButton color="primary">
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add members">
            <IconButton color="success">
              <Add />
            </IconButton>
          </Tooltip>
          <Tooltip title="Exit group">
            <IconButton color="error">
              <ExitToApp />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete group">
            <IconButton color="error">
              <Delete />
            </IconButton>
          </Tooltip>
        </Stack>

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
                return (
                  <Stack
                    key={member._id}
                    flexDirection={"row"}
                    alignItems={"center"}
                    gap={2}
                    borderBottom={1}
                    pb={0.5}
                    borderColor={"divider"}
                  >
                    <Avatar src={member.avatar.uri} />
                    <Typography
                      variant="body1"
                      flexGrow={2}
                      style={{ textDecoration: "line-through" }}
                    >
                      {member.username}
                    </Typography>
                    <Tooltip title="Unblock">
                      <IconButton>
                        <LockOpenIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                );
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
