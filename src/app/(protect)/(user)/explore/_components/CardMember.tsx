import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const CardMember = () => {
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
      <CardMedia component="img" alt="green iguana" height="200" image="/intro-1.jpg" />
      <CardContent sx={{ flexGrow: 2 }}>
        <Typography variant="h6" gutterBottom>
          Đào Tài
        </Typography>
        <Typography variant="body1" gutterBottom>
          School: ThuyLoi University 121212122121212
        </Typography>
      </CardContent>
      <CardActions>
        <Link href="/profile/123" className="btn-link">
          More
        </Link>
      </CardActions>
    </Card>
  );
};

export default CardMember;
