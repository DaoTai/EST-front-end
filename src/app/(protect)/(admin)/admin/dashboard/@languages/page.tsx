"use client";
import clientSideAxios from "@/config/axios/client-side";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react";
import useSWR, { Fetcher } from "swr";

type IResponse = {
  _id: string;
  name: string;
  total: number;
}[];

const fetcher: Fetcher<IResponse, string> = (url: string) => {
  return clientSideAxios.get(url).then((res) => res.data);
};
const ProgrammingLanguages = () => {
  const [chartOptions, setChartOptions] = useState({});
  const { isLoading, error, isValidating } = useSWR(
    "/admin/statistical/programming-languages",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess(data, key, config) {
        const categories = data.map((item) => item.name);
        const result = data.map((item, index) => ({
          name: item.name,
          y: item.total,
          color: `rgb(${index * 20}, 100, 200)`, // Màu sắc cho từng thanh
        }));

        const options = {
          chart: {
            type: "bar",
          },
          title: {
            text: "Programming Languages / Teachnologies in Courses",
          },
          xAxis: {
            categories,
            title: {
              text: "Programming Languages",
            },
          },
          yAxis: {
            title: {
              text: "Total",
            },
            labels: {
              enabled: false, // Ẩn các nhãn trên trục x
            },
          },
          series: [
            {
              name: "Amount",
              data: result,
            },
          ],
          plotOptions: {
            series: {
              animation: {
                duration: 1000, // Điều chỉnh tốc độ biểu đồ đua thanh
              },
              dataLabels: {
                enabled: true,
                color: "#FFFFFF",
              },
            },
          },
        };

        setChartOptions(options);
      },
    }
  );

  if (error) {
    return (
      <Typography variant="body1" textAlign={"center"}>
        Having error
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

export default ProgrammingLanguages;
