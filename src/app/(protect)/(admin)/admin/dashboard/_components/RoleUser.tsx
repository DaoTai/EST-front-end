"use client";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
const RoleUser = ({ data }: { data: IProfile[] }) => {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // Tạo một đối tượng để lưu trữ số lượng người dùng theo role
    const roleCount: any = {};

    // Duyệt qua mỗi user và tính số lượng người dùng cho mỗi role
    data.forEach((user) => {
      user.roles.forEach((role) => {
        if (roleCount[role]) {
          roleCount[role] += 1; // Nếu role đã tồn tại, tăng số lượng người dùng
        } else {
          roleCount[role] = 1; // Nếu role chưa tồn tại, khởi tạo với số lượng là 1
        }
      });
    });

    const output = Object.keys(roleCount).map((key) => {
      return {
        name: key,
        y: roleCount[key],
      };
    });

    const options = {
      chart: {
        type: "pie",
      },
      title: {
        text: "Roles",
      },
      series: [
        {
          name: "Proramming",
          data: output,
        },
      ],
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.y} ",
          },
          showInLegend: true,
        },
      },
    };
    setChartOptions(options);
  }, [data]);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default RoleUser;
