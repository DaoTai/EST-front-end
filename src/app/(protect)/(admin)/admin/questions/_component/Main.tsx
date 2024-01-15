"use client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Delete from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useSWR, { Fetcher } from "swr";
import SearchBox from "@/components/common/SearchBox";
import MyDialog from "@/components/custom/Dialog";
import clientSideAxios from "@/config/axios/client-side";
import useDebounce from "@/hooks/useDebounce";
import questionService from "@/services/question";
import { showErrorToast } from "@/utils/functions";
import Spinner from "@/components/custom/Spinner";
import Divider from "@mui/material/Divider";

type IResponse = {
  maxPage: number;
  listQuestions: IQuestion[];
  total: number;
};

const fetcher: Fetcher<IResponse, string> = (url: string) => {
  return clientSideAxios.get(url).then((res) => res.data);
};

const Questions = () => {
  const [content, setContent] = useState<string>("");
  const [idQuestion, setIdQuestion] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<IQuestion["category"]>("choice");

  const debounce = useDebounce(content);
  const { data, mutate, isLoading, isValidating } = useSWR(
    `/admin/questions?page=${page}&content=${debounce}&category=${category}`,
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess(data, key, config) {},
    }
  );

  //   Delete question
  const handleDelete = async () => {
    try {
      await questionService.deleteQuestion(idQuestion);
      mutate();
      toast.success("Delete question successfully");
    } catch (error) {
      showErrorToast(error);
    }
  };

  const handleOpen = (id: string) => {
    setIdQuestion(id);
    handleToggleOpen();
  };

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  const handleChangeSearch = (val: string) => {
    setContent(val);
  };

  const handleClear = () => {
    setContent("");
  };

  const handleSelect = (event: SelectChangeEvent) => {
    setCategory(event.target.value as IQuestion["category"]);
  };

  if (data)
    return (
      <>
        <Divider>
          <Typography gutterBottom fontWeight={500} variant="h4" textAlign={"center"}>
            Questions
          </Typography>
        </Divider>
        <Stack flexDirection={"row"} gap={1} mb={2}>
          <SearchBox value={content} onChange={handleChangeSearch} onClear={handleClear} />

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              MenuProps={{
                disableScrollLock: true,
              }}
              onChange={handleSelect}
            >
              <MenuItem value="choice">Choice</MenuItem>
              <MenuItem value="multiple-choice">Multiple choice</MenuItem>
              <MenuItem value="code">Code</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Typography variant="body1" gutterBottom fontWeight={500}>
          Total: {data.total}
        </Typography>

        {(isLoading || isValidating) && <Spinner />}

        {!isValidating && data.listQuestions.length === 0 && (
          <Typography variant="body1" textAlign={"center"}>
            No question
          </Typography>
        )}

        {/* Questions */}
        <Stack gap={1}>
          {data.listQuestions.map((question) => {
            return (
              <Stack key={question._id} flexDirection={"row"} alignItems={"center"} gap={1}>
                {/* content + correct answers +  answers*/}
                <Accordion sx={{ flex: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="body1">{question.content}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Chip label="Correct answers" color="success" />
                    <Box component={"ul"}>
                      {question.correctAnswers?.map((correct, i) => {
                        return (
                          <Typography component={"li"} key={i} variant="body1">
                            {correct}
                          </Typography>
                        );
                      })}
                    </Box>
                    <Chip label="Answers" color="info" />
                    <Box component={"ul"}>
                      {question.answers?.map((answer, i) => {
                        return (
                          <Typography component={"li"} key={i} variant="body1">
                            {answer}
                          </Typography>
                        );
                      })}
                    </Box>

                    <Typography variant="body1" gutterBottom>
                      <b>Lesson:</b> {question.lesson?.name}
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                {/* Delete */}
                <IconButton onClick={() => handleOpen(question._id)}>
                  <Delete />
                </IconButton>
              </Stack>
            );
          })}
        </Stack>

        {/* Controls */}
        <Stack mt={2} flexDirection={"row"} alignItems={"center"} justifyContent={"center"}>
          <Pagination
            variant="outlined"
            color="primary"
            page={page}
            count={data?.maxPage}
            onChange={(event: React.ChangeEvent<unknown>, value: number) => {
              setPage(value);
            }}
          />
        </Stack>

        {/* Dialog */}
        {open && (
          <MyDialog
            content="Delete question"
            title="Question"
            onClose={handleToggleOpen}
            onSubmit={handleDelete}
          />
        )}
      </>
    );
};

export default Questions;
