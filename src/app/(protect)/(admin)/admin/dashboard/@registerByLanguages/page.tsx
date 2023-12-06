"use client";
import clientSideAxios from "@/config/axios/client-side";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react";
import useSWR, { Fetcher } from "swr";

type IResponse = { _id: string; name: string; total: number }[];

const fetcher: Fetcher<IResponse, string> = (url: string) => {
  return clientSideAxios.get(url).then((res) => res.data);
};

const RegisterByProrammingLanguages = () => {
  const [chartOptions, setChartOptions] = useState({});
  const { isLoading, error, isValidating } = useSWR(
    "/admin/statistical/register-by-programming-languages",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess(data, key, config) {
        const result = data.map((item, index) => ({
          name: item.name,
          y: item.total,
        }));

        const options = {
          chart: {
            type: "pie",
          },
          title: {
            text: "Trending Register User Programming Languages / Teachnologies ",
          },
          series: [
            {
              name: "Amount",
              data: result,
            },
          ],
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              dataLabels: {
                enabled: true,
                format: "<b>{point.name}</b>: {point.percentage:.1f} %",
              },
              showInLegend: true,
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

export default RegisterByProrammingLanguages;
