"use client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import SearchBox from "@/components/common/SearchBox";
import GroupChat from "@/components/group-chat-components/GroupChat";
import NewGroup from "@/components/group-chat-components/NewGroupIcon";
import useListGroupChatContext from "@/hooks/useListGroupChatContext";
import { Divider, IconButton, useMediaQuery } from "@mui/material";

import useTheme from "@mui/material/styles/useTheme";

import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";

const ToggleModeTheme = dynamic(() => import("@/components/common/ToggleModeTheme"), {
  ssr: false,
});

const ListGroupChats = () => {
  const params = useParams();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isLoadingInitial, isValidating, listGroupChats, search, setSearch } =
    useListGroupChatContext();

  const handleExit = () => {
    router.replace("/");
  };

  return (
    <Box p={1} pb={4}>
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <IconButton sx={{ border: 1, borderColor: "divider" }} onClick={handleExit}>
          <ArrowBackIcon />
        </IconButton>
        <ToggleModeTheme />
      </Stack>
      <Divider>
        <Typography variant="h5" textAlign={"center"} fontWeight={600} gutterBottom>
          Group chat
        </Typography>
      </Divider>
      {/* Search & Actions */}
      <Stack
        gap={2}
        mb={1}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          input: {
            padding: "12px",
          },
          ".MuiInputBase-root": {
            borderRadius: 12,
          },
        }}
      >
        <SearchBox
          placeholder="Search name group chat"
          value={search}
          onChange={(val) => setSearch(val)}
          onClear={() => setSearch("")}
        />
        <NewGroup />
      </Stack>

      {/* List group */}
      <>
        <Stack gap={1} mt={2}>
          {listGroupChats.map((groupChat) => {
            const isActive = groupChat._id === params.id;
            return <GroupChat key={groupChat._id} groupChat={groupChat} isActive={isActive} />;
          })}
        </Stack>
        {isValidating && !isLoadingInitial && (
          <Typography variant="body1" textAlign={"center"} mt={1}>
            Loading ...
          </Typography>
        )}
      </>
    </Box>
  );
};

export default ListGroupChats;
