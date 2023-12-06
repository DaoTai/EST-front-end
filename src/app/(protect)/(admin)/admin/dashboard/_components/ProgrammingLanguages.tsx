"use client";
import statisticalService from "@/services/admin/statistical";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";

const ProgrammingLanguages = () => {
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    statisticalService.getProgrammingLanguages().then((programmingLanguages) => {
      const categories = programmingLanguages.map((item) => item.name);
      const data = programmingLanguages.map((item, index) => ({
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
            data: data,
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
    });
  }, []);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default ProgrammingLanguages;
