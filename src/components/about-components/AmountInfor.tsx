import React from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, Paper } from "@mui/material";
import Link from "next/link";
const AmountInfor = () => {
  return (
    <Grid
      container
      spacing={1}
      sx={{
        ".MuiCardContent-root": {
          position: "relative",
        },
        ".btn": {
          position: "absolute",
          bottom: 16,
          right: 16,
          display: "block",
          padding: "8px 16px",
          borderRadius: 2,
          bgcolor: "primary.main",
          color: "#fff",
          textDecoration: "none",
          width: "fit-content",
          mt: "auto",
          "&:hover": {
            opacity: 0.8,
          },
        },
      }}
    >
      <Grid item md={4} xs={12}>
        <Paper elevation={4} sx={{ height: "100%" }}>
          <CardContent sx={{ height: "100%" }}>
            <Box pb={4}>
              <Divider>
                <Typography variant="h4" gutterBottom fontWeight={500}>
                  User
                </Typography>
              </Divider>
              <Typography variant="h5">We have 99+ members</Typography>
            </Box>
            <Link href="/" className="btn">
              Watch
            </Link>
          </CardContent>
        </Paper>
      </Grid>
      <Grid item md={4} xs={12}>
        <Paper elevation={4} sx={{ height: "100%" }}>
          <CardContent sx={{ height: "100%" }}>
            <Box pb={4}>
              <Divider>
                <Typography variant="h4" gutterBottom fontWeight={500}>
                  Course
                </Typography>
              </Divider>
              <Typography variant="h5">
                We have 99+ courses with multiple type course for users
              </Typography>
            </Box>
            <Link href="/" className="btn">
              Watch
            </Link>
          </CardContent>
        </Paper>
      </Grid>
      <Grid item md={4} xs={12}>
        <Paper elevation={4} sx={{ height: "100%" }}>
          <CardContent sx={{ height: "100%" }}>
            <Box pb={4}>
              <Divider>
                <Typography variant="h4" gutterBottom fontWeight={500}>
                  Blog
                </Typography>
              </Divider>
              <Typography variant="h5">
                There are 100+ blogs about questions, experiences, ...
              </Typography>
            </Box>
            <Link href="/" className="btn">
              Watch
            </Link>
          </CardContent>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AmountInfor;
