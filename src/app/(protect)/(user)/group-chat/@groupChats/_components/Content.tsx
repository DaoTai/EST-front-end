"use client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import SearchBox from "@/components/common/SearchBox";
import GroupChat from "@/components/group-chat-components/GroupChat";
import NewGroup from "@/components/group-chat-components/NewGroupIcon";
import { useListGroupChatContext } from "@/providers/ListGroupChatContext";
import { Divider, IconButton } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const ToggleModeTheme = dynamic(() => import("@/components/common/ToggleModeTheme"), {
  ssr: false,
});

const GroupChats = () => {
  const params = useParams();
  const router = useRouter();
  const {
    isLoadingInitial,
    isValidating,
    listGroupChats,
    maxPage,
    size,
    search,
    setSize,
    setSearch,
  } = useListGroupChatContext();

  return (
    <Box p={1} pb={4}>
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <IconButton sx={{ border: 1, borderColor: "divider" }} onClick={() => router.back()}>
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
        {isLoadingInitial ? (
          <Typography variant="body1" textAlign={"center"}>
            Loading ...
          </Typography>
        ) : (
          <Stack gap={1} mt={2}>
            {listGroupChats.length > 0 ? (
              listGroupChats.map((groupChat) => {
                const isActive = groupChat._id === params.id;
                console.log("groupChat: ", groupChat);

                return <GroupChat key={groupChat._id} groupChat={groupChat} isActive={isActive} />;
              })
            ) : (
              <Typography variant="body1" textAlign={"center"}>
                No group chat
              </Typography>
            )}
          </Stack>
        )}
        {isValidating && !isLoadingInitial && (
          <Typography variant="body1" textAlign={"center"} mt={1}>
            Loading ...
          </Typography>
        )}
      </>

      {size < maxPage && (
        <Stack mt={2} mb={1} flexDirection={"row"} justifyContent={"center"}>
          <Chip
            variant="outlined"
            clickable
            disabled={isValidating}
            label="More"
            sx={{ width: "100%" }}
            onClick={() => setSize(size + 1)}
          />
        </Stack>
      )}
    </Box>
  );
};

export default GroupChats;
