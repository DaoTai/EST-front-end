"use client";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useParams } from "next/navigation";
import { ForwardRefRenderFunction, forwardRef, memo, useImperativeHandle, useMemo } from "react";
import { Fetcher, KeyedMutator } from "swr";
import useSWRInfinite from "swr/infinite";
import Comment from "./Comment";

export type IResponseFetchComments = {
  listComments: ILessonComment[];
  total: number;
  maxPage: number;
};

export type IListCommentsRef = { mutate: KeyedMutator<IResponseFetchComments[]> };
type IProps = {
  idLesson: string;
};

const fetcher: Fetcher<IResponseFetchComments, string> = (url: string) =>
  fetch(url).then((res) => res.json());

const ListComments: ForwardRefRenderFunction<Partial<IListCommentsRef>, IProps> = (
  { idLesson },
  ref
) => {
  const { data, size, setSize, mutate, isValidating, isLoading, error } = useSWRInfinite(
    (page: number) => {
      return `/api/user/my-lessons/${idLesson}/comments?page=${page + 1}`;
    },
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
      onSuccess(data, key, config) {
        // console.log("data: ", data);
      },
    }
  );

  const res = useMemo(() => {
    if (data) {
      const values = data.reduce(
        (acc, item) => {
          return {
            maxPage: item.maxPage,
            total: item.total,
            listComments: [...acc.listComments, ...item.listComments],
          };
        },
        {
          listComments: [],
          maxPage: 0,
          total: 0,
        }
      );
      return values;
    }
    return null;
  }, [data]);

  useImperativeHandle(
    ref,
    () => {
      return {
        mutate: mutate,
      };
    },
    [mutate, data]
  );

  if (error) {
    return (
      <Typography variant="body1" textAlign={"center"}>
        Having error
      </Typography>
    );
  }

  if (isLoading) {
    return (
      <Typography variant="body1" textAlign={"center"}>
        Loading ...
      </Typography>
    );
  }

  if (res?.listComments?.length === 0 && !isLoading)
    return (
      <Typography variant="body1" textAlign={"center"}>
        No comment
      </Typography>
    );

  return (
    <>
      <Typography gutterBottom variant="body2" fontWeight={500}>
        ({res?.total || 0} comments)
      </Typography>
      <Stack mt={2} gap={2}>
        {res?.listComments.map((comment) => {
          return (
            <Comment
              key={comment._id}
              idLesson={idLesson as string}
              comment={comment}
              mutate={mutate}
            />
          );
        })}
      </Stack>
      {size < (res?.maxPage ?? 0) && (
        <Stack mt={2} flexDirection={"row"} justifyContent={"center"}>
          <Chip
            label="Load more"
            disabled={isLoading || isValidating}
            sx={{
              bgcolor: (theme) => theme.palette.action.focus,
              pl: 2,
              pr: 2,
            }}
            onClick={() => setSize(size + 1)}
          />
        </Stack>
      )}
    </>
  );
};

export default memo(forwardRef(ListComments));
