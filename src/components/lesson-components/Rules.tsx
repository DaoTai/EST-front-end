import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const Rules = () => {
  return (
    <>
      <Typography variant="subtitle1" fontWeight={500}>
        Lesson should be followed by these rules:
      </Typography>
      <Box component={"ul"} m={0}>
        <Typography variant="subtitle1" component={"li"}>
          Fulfill required information{" "}
        </Typography>
        <Typography variant="subtitle1" component={"li"}>
          Length of video should range of 20-25 minutes{" "}
        </Typography>
        <Typography variant="subtitle1" component={"li"}>
          Offer questions involve lesson which should be uploaded full before launching lesson
        </Typography>
        <Typography variant="subtitle1" component={"li"}>
          You need ussually give score for member in each <b>code</b> question
        </Typography>
      </Box>
    </>
  );
};

export default Rules;
