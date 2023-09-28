"use client";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Title = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {!isMobile && (
        <Typography
          variant="h4"
          fontWeight={500}
          color="text.primary"
          letterSpacing={2}
          sx={{
            ml: 1,
            position: "relative",
            "&:before": {
              content: '""',
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: 3,
              borderRadius: 2,
              background: theme.palette.gradient.main,
            },
          }}
        >
          EST Edu
        </Typography>
      )}
    </>
  );
};

export default Title;
