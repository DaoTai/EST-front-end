"use client";
import clientSideAxios from "@/config/axios/client-side";
import React, { useState } from "react";
import useSWR, { Fetcher } from "swr";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
type IResponse = {
  _id: string;
  totalAnswerRecords: number;
  avgScore: number;
  user: Partial<IProfile>;
}[];

const fetcher: Fetcher<IResponse, string> = (url: string) => {
  return clientSideAxios.get(url).then((res) => res.data);
};

const AvgScoreChart = ({ id }: { id: string }) => {
  const [chartOptions, setChartOptions] = useState({});
  const { isLoading, error, isValidating, data } = useSWR(`/courses/${id}/avg-scores`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    onSuccess(data, key, config) {
      const usernames = data.map((item) => item.user.username);
      const scores = data.map((item) => item.avgScore);
      const options = {
        chart: {
          type: "column",
        },
        title: {
          text: "Average score of members",
          align: "left",
        },
        xAxis: {
          categories: usernames,
          crosshair: true,
          accessibility: {
            description: "Username of member",
          },
        },
        yAxis: {
          min: 0,
          max: 10,
          title: {
            text: "Average Score",
          },
        },

        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },

        series: [
          {
            name: "Average score",
            colorByPoint: true,
            data: scores,
          },
        ],
      };

      setChartOptions(options);
    },
  });

  if (error) {
    return (
      <Typography variant="body1" textAlign={"center"}>
        Having errors
      </Typography>
    );
  }

  if (data && data?.length > 0) {
    return (
      <Typography variant="body1" textAlign={"center"}>
        No any average scores
      </Typography>
    );
  }

  return (
    <Paper>
      {(isLoading || isValidating) && (
        <Typography variant="body1" textAlign={"center"}>
          Loading ...
        </Typography>
      )}
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </Paper>
  );
};

export default AvgScoreChart;
