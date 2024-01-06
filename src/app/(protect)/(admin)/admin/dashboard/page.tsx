import Typography from "@mui/material/Typography";
import Users from "./_components/Users";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
const BarRaceChart = () => {
  return (
    <Paper>
      <Divider>
        <Typography variant="h4" fontWeight={500} gutterBottom>
          Members
        </Typography>
      </Divider>
      <Users />
    </Paper>
  );
};

export default BarRaceChart;
