"use client";

import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Fetcher } from "swr";
import useSWRInfinite from "swr/infinite";

import MyList from "@/components/custom/MyList";
import clientSideAxios from "@/config/axios/client-side";
import notfiyService from "@/services/notification";
import { showErrorToast } from "@/utils/functions";
import { Tooltip } from "@mui/material";
type IResponse = {
  maxPage: number;
  totalUnRead: number;
  listNotifications: INotification[];
};

const fetcher: Fetcher<IResponse, string> = (url: string) => {
  return clientSideAxios.get(url).then((res) => res.data);
};

const Notifications = () => {
  const [anchorElNotify, setAnchorElNotify] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const { data, size, setSize, mutate, isValidating, isLoading, error } = useSWRInfinite(
    (page: number) => {
      return `/notify/user?page=${page + 1}`;
    },
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 10 * 60 * 1000, //  10 phút sẽ recall
      onSuccess(data, key, config) {
        // console.log("data: ", data);
      },
    }
  );
  //   listNotifications
  const listNotifications = useMemo(() => {
    if (data) {
      const values = data.reduce((acc: INotification[], item) => {
        return [...acc, ...item.listNotifications];
      }, []);
      return values;
    }
    return [];
  }, [data]);

  //   maxPage
  const maxPage = useMemo(() => {
    return data ? data[0].maxPage : 0;
  }, [data]);

  //   Total unread
  const totalUnRead = useMemo(() => {
    return data ? data[0].totalUnRead : 0;
  }, [data]);

  const handleLoadMore = () => {
    if (size < maxPage) {
      setSize(size + 1);
    }
  };

  const handleClickNofity = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotify(event.currentTarget);
  };

  const handleCloseNotify = () => {
    setAnchorElNotify(null);
  };

  const handleNavigate = (notification: INotification) => {
    if (notification.endpoint) {
      switch (notification.field) {
        case "my-course":
          router.push("/my-courses/" + notification.endpoint);
          break;
        case "lesson-comment":
          router.push("/my-courses/" + notification.endpoint + "?openComment=true");
          break;
        case "approved-course":
          router.push("/teacher/course/" + notification.endpoint);
          break;
        case "answer-code-question":
          router.push("/teacher/lessons/" + notification.endpoint);
          break;
      }
    }
    handleCloseNotify();
  };

  //   Read all notify
  const handleReadAll = async () => {
    try {
      await notfiyService.markRead(listNotifications.map((notify) => notify._id));
      mutate();
    } catch (error) {
      showErrorToast(error);
    }
  };

  return (
    <>
      {/* Notifycation */}
      <Box onClick={handleClickNofity} mr={1}>
        <Badge
          badgeContent={totalUnRead}
          color="info"
          sx={{
            ".MuiBadge-badge": {
              background: (theme) => theme.palette.gradient.main,
            },
          }}
        >
          <NotificationsIcon
            color="action"
            cursor={"pointer"}
            fontSize="large"
            sx={{
              transition: "all ease-out 0.3s",
              ":hover": {
                color: "text.primary",
              },
            }}
          />
        </Badge>
      </Box>

      {/* Display data */}
      <Popover
        disableScrollLock
        open={!!anchorElNotify}
        anchorEl={anchorElNotify}
        onClose={handleCloseNotify}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ maxHeight: "80vh" }}
      >
        <Paper
          sx={{
            p: 1,
            minWidth: "20vw",
            maxWidth: "25vw",
            overflow: "hidden",
            bgcolor: "background.paper",
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          {/* Options */}
          <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Chip
              label="Mark all as read"
              variant="outlined"
              color="info"
              clickable
              size="small"
              onClick={handleReadAll}
            />
            <Chip
              label="Exit"
              variant="outlined"
              color="default"
              clickable
              size="small"
              onClick={handleCloseNotify}
            />
          </Stack>

          <MyList>
            <Divider />

            <Box mt={1}>
              <Stack gap={0.5}>
                {listNotifications.map((notification) => {
                  return (
                    <ListItem
                      key={notification._id}
                      divider
                      className={notification.endpoint ? "" : "no-endpoint"}
                      sx={{
                        background: (theme) =>
                          notification.isRead ? "inherit" : theme.palette.divider,
                        "&.no-endpoint": {
                          cursor: "text",
                        },
                      }}
                      onClick={() => handleNavigate(notification)}
                    >
                      <ListItemAvatar>
                        <Avatar src={notification?.avatar?.uri || "/logo.png"} alt="avatar" />
                      </ListItemAvatar>
                      <Tooltip arrow title={notification.content} placement="left">
                        <ListItemText
                          primary={notification.content}
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          secondary={dayjs(notification.createdAt).format("DD/MM/YYYY")}
                        />
                      </Tooltip>
                    </ListItem>
                  );
                })}
              </Stack>
              {(isLoading || isValidating) && (
                <Typography variant="body2" textAlign={"center"}>
                  Loading ...
                </Typography>
              )}
              {!isValidating && listNotifications.length === 0 && (
                <Typography variant="body2" textAlign={"center"}>
                  No notification
                </Typography>
              )}
            </Box>
          </MyList>

          {/* Load more */}

          {size < maxPage && (
            <Box display={"flex"} justifyContent={"center"}>
              <Chip clickable label="View more" size="small" onClick={handleLoadMore} />
            </Box>
          )}
        </Paper>
      </Popover>
    </>
  );
};

export default Notifications;
