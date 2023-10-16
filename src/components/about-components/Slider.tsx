"use client";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";

import { useRef, useState } from "react";

type Quote = {
  title: string;
  content: string;
};

const quotes: Quote[] = [
  {
    title: "Encourage",
    content: "Chances are always expanding for you in IT",
  },
  {
    title: "Self-learning",
    content: '"Education is the kindling of a flame, not the filling of a vessel"-Socrates',
  },
  {
    title: "Together",
    content: "If you want to go far, let's go together",
  },
];

const Slider = () => {
  const [index, setIndex] = useState<number>(1);
  const next = useRef<boolean>(true);
  const lastIndex = useRef<number>();
  const onNext = () => {
    setIndex((prev) => {
      lastIndex.current = prev;
      return prev === 3 ? 1 : prev + 1;
    });
    next.current = true;
  };

  const onPrev = () => {
    setIndex((prev) => {
      lastIndex.current = prev;
      return prev === 1 ? 3 : prev - 1;
    });
    next.current = false;
  };
  return (
    <Box
      display="flex"
      overflow="hidden"
      borderRadius={2}
      boxShadow={2}
      position="relative"
      sx={{
        backgroundImage: `url("/intro-${lastIndex.current || 1}.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Slide intro */}
      {[1, 2, 3].map((item) => (
        <Slide
          key={item}
          direction={next.current ? "left" : "right"}
          in={!!lastIndex.current && index === item}
          timeout={1000}
        >
          <Paper
            sx={{
              backgroundImage: `url("/intro-${item}.jpg")`,
              flex: index === item ? "2 1 auto" : "1 1 ",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "70vh",
              width: "100%",
              filter: "contrast(1.3) brightness(1.1)",
            }}
          />
        </Slide>
      ))}

      {/* Quotes */}
      <Box
        position="absolute"
        p={2}
        sx={{
          top: "50%",
          left: "3%",
          width: "100%",
          transform: "translate(-3%, -50%)",
          ".MuiTypography-root.MuiTypography-h1": {
            fontSize: "5.2rem",
            letterSpacing: 2,
            textShadow: "6px 3px 12px #333",
            color: "#fff",
            fontWeight: 500,
            "&:first-letter": {
              color: "#58a9eb",
              textShadow: "1px 2px 1px #fff",
            },
            "&:nth-child(odd) ": {
              "&:first-letter": {
                color: "#aa99ff",
                textShadow: "1px 2px 1px #fff",
              },
            },
          },
        }}
      >
        <Grid container spacing={2} rowSpacing={3} justifyContent={"center"}>
          <Grid item lg={5} md={12}>
            {quotes.map(({ title }, i) => (
              <Typography key={i} variant="h1" textAlign="right">
                {title}
              </Typography>
            ))}
          </Grid>
          <Grid item lg={7} md={12} display="flex" justifyContent="center" width="100%">
            {quotes.map(({ content }, i) => (
              <Grow key={i} in={i + 1 === index} timeout={1500}>
                <Typography
                  variant="h5"
                  key={i}
                  className={i + 1 === index ? "show" : ""}
                  letterSpacing={1}
                  sx={{
                    pl: 2,
                    pr: 2,
                    pt: 1,
                    pb: 1,
                    color: "#333",
                    bgcolor: "rgba(255,255,255,0.8)",
                    height: "fit-content",
                    borderRadius: 12,
                    lineHeight: 1.5,
                    boxShadow: 4,
                    display: "none",
                    "&.show": {
                      display: "block",
                    },
                  }}
                >
                  {content}
                </Typography>
              </Grow>
            ))}
          </Grid>
        </Grid>
      </Box>

      {/* Control slide */}
      <>
        <Fab
          size="medium"
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            bgcolor: "rgba(255,255,255,0.4)",
            "&:hover": {
              bgcolor: "unset",
            },
          }}
          onClick={onPrev}
        >
          <ArrowBackIosIcon />
        </Fab>
        <Fab
          size="medium"
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            bgcolor: "rgba(255,255,255,0.4)",
            "&:hover": {
              bgcolor: "unset",
            },
          }}
          onClick={onNext}
        >
          <ArrowForwardIosIcon />
        </Fab>
      </>
    </Box>
  );
};

export default Slider;
