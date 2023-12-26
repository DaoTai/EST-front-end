"use client";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import predictService from "@/services/user/predictJobs";
import { showErrorToast } from "@/utils/functions";

type IPercentage = {
  job: string;
  percentage: string;
};

const Main = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [jobPercentTages, setJobPercentages] = useState<IPercentage[]>([]);
  const getPercent = (arr: string[]): IPercentage[] => {
    const totalItems = arr.length;
    const counts = {} as any;

    // Đếm số lần item xuất hiện trong mảng
    arr.forEach((item) => {
      if (counts[item]) {
        counts[item] += 1;
      } else {
        counts[item] = 1;
      }
    });

    const listPercentages = [];
    // Tính tỉ lệ % xuất hiện
    for (const key in counts) {
      const percent = (counts[key] / totalItems) * 100;
      const formatPercent = percent < 100 ? percent.toFixed(2) : String(percent);
      listPercentages.push({
        job: key,
        percentage: formatPercent + "%",
      });
    }

    return listPercentages;
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const result = await predictService.predictSuitableJobs();
      const percent = getPercent(result);
      setJobPercentages(percent);
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack width={"100%"} height={"100%"} gap={2} alignItems={"center"} p={1}>
      <Typography textAlign={"center"} variant="h4" gutterBottom>
        Predict suitable jobs
      </Typography>
      <Button disabled={loading} variant="contained" onClick={handlePredict}>
        Predict
      </Button>
      {loading && <Typography variant="body1">Predicting...</Typography>}
      {jobPercentTages.length > 0 && (
        <Stack
          className="bg-gradient"
          boxShadow={5}
          borderRadius={1}
          p={2}
          border={1}
          flexDirection="row"
          gap={2}
          flexWrap={"wrap"}
        >
          {jobPercentTages.map((jobPercent, index) => {
            return (
              <Stack key={index} flexDirection={"row"} gap={2} width={"100%"}>
                <Typography variant="body1" fontWeight={500} gutterBottom>
                  {jobPercent.job}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {jobPercent.percentage}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
};

export default Main;
