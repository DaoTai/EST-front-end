import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { memo } from "react";

const CardMember = ({ data }: { data: IProfile }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia component="img" alt="green iguana" height="220" image={data?.avatar.uri} />
      <CardContent sx={{ flexGrow: 2 }}>
        <Typography variant="h6" gutterBottom>
          {data.username}
        </Typography>
        <Typography variant="body1" gutterBottom>
          School: {data.school}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={"/profile/" + data._id} className="btn-link">
          More
        </Link>
      </CardActions>
    </Card>
  );
};

export default memo(CardMember);
