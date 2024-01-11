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
      <CardContent sx={{ flexGrow: 2 }}>
        <Avatar
          alt="Avatar"
          src={data?.avatar.uri}
          sx={{ width: 220, height: 220, margin: "auto", filter: "drop-shadow(0px 0px 4px #999)" }}
        />
        <Typography variant="h6">{data.username}</Typography>
        {data.school && (
          <Typography variant="body1" fontWeight={500} gutterBottom>
            {data.school}
          </Typography>
        )}

        <Stack flexDirection="row" flexWrap={"wrap"} gap={1}>
          {data?.favouriteProrammingLanguages.map((lang, i) => (
            <Chip size="small" className="bg-gradient" key={i} label={lang} />
          ))}
        </Stack>
      </CardContent>
      <Divider />
      <CardActions
        sx={{
          justifyContent: "end",
          a: {
            border: 1,
            borderColor: "primary.main",
            p: 0.5,
            pl: 2,
            pr: 2,
            borderRadius: 1,
          },
        }}
      >
        <Link href={"/profile/" + data._id}>View</Link>
      </CardActions>
    </Card>
  );
};

export default memo(CardMember);
