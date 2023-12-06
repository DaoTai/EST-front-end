"use client";
import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import statisticalService from "@/services/admin/statistical";
const RegisterByProrammingLanguages = () => {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    statisticalService.getRegisterByProgrammingLanguages().then((programmingLanguages) => {
      const data = programmingLanguages.map((item, index) => ({
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
            data: data,
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
    });
  }, []);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default RegisterByProrammingLanguages;
