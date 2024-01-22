"use client";
import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import dayjs from "dayjs";
import useSWR, { Fetcher } from "swr";
import FormAnswerRecord from "./FormAnswerRecord";

const fetcher: Fetcher<IAnswerRecord[], string> = (url: string) =>
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Fetch answers failed");
    }
  });

const ListAnswerRecords = ({ question }: { question: IQuestion }) => {
  const { data: listAnswerRecords, isLoading } = useSWR(
    "/api/teacher/answer-records/" + question._id,
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess(data, key, config) {},
    }
  );

  // const download = useMemo(() => {
  //   return listAnswerRecords?.map((record, i) => ({
  //     order: i + 1,
  //     user: record.user.username,
  //     answer: record.answers[0],
  //     score: record.score,
  //     comment: record.comment,
  //   }));
  // }, [listAnswerRecords]);

  // const headers = useMemo(() => {
  //   if (download && download.length > 0) {
  //     return Object.keys(download[0]).map((key) => ({
  //       label: key,
  //       key,
  //     }));
  //   }
  //   return null;
  // }, [download]);

  return (
    <Box p={1}>
      {/* {headers && download && (
        <CSVLink headers={headers} data={download} filename={question._id + ".csv"}>
          <Button variant="contained" color="success" sx={{ mb: 2 }}>
            Export to CSV
          </Button>
        </CSVLink>
      )} */}
      <Typography gutterBottom variant="body1" fontWeight={500}>
        <b>Question:</b> {question.content}
      </Typography>
      <Typography gutterBottom variant="body1" fontWeight={500}>
        <b>Total answer:</b> {listAnswerRecords?.length}
      </Typography>

      {isLoading ? (
        <Typography variant="body1" textAlign={"center"}>
          Loading ...
        </Typography>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ overflowX: "auto", mt: 1, mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Comment</TableCell>
                  <TableCell>Answer</TableCell>
                  <TableCell>Latest update time</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listAnswerRecords?.map((record, i) => {
                  return (
                    <TableRow key={record._id} sx={{ maxHeight: "30px" }}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{record.user.username}</TableCell>
                      <TableCell>{record.score ?? "Pending"}</TableCell>
                      <TableCell sx={{ maxWidth: "30%", textAlign: "justify" }}>
                        {record.comment ?? "No comment"}
                      </TableCell>
                      <TableCell sx={{ maxWidth: "30%" }}>
                        {record.answers[0] ? (
                          <Link target="_blank" href={record.answers[0]}>
                            {record.answers[0]}
                          </Link>
                        ) : (
                          "No answer"
                        )}
                      </TableCell>
                      <TableCell>{dayjs(record.updatedAt).format("MMMM D, YYYY h:mm A")}</TableCell>

                      <TableCell>
                        <FormAnswerRecord idQuestion={question._id} idAnswerRecord={record._id} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default ListAnswerRecords;
