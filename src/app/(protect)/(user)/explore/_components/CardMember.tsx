import { Avatar, Chip, Divider, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
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
      {/* <CardMedia component="img" alt="card member" height="240" image={data?.avatar.uri} /> */}
      <CardContent sx={{ flexGrow: 2 }}>
        <Avatar
          alt="Avatar"
          src={data?.avatar.uri}
          sx={{ width: 220, height: 220, margin: "auto" }}
        />
        <Typography variant="h6">{data.username}</Typography>
        {data.school && (
          <Typography variant="body1" gutterBottom>
            {data.school}
          </Typography>
        )}

        <Stack flexDirection="row" gap={1}>
          {data?.favouriteProrammingLanguages.map((lang, i) => (
            <Chip key={i} label={lang} />
          ))}
        </Stack>
      </CardContent>
      <Divider />
      <CardActions
        sx={{
          justifyContent: "end",
        }}
      >
        <Link href={"/profile/" + data._id} className="btn-link">
          More
        </Link>
      </CardActions>
    </Card>
  );
};

export default memo(CardMember);
