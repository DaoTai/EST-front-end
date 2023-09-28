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
          className="text-gradient"
          sx={{ ml: 1 }}
        >
          EST Edu
        </Typography>
      )}
    </>
  );
};

export default Title;
