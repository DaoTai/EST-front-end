"use client";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Chip, Collapse, Fab, Fade, Grid, Grow, Slide, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type Quote = {
  title: string;
  content: string;
};

const quotes: Quote[] = [
  {
    title: "Encourage",
    content: "Chances are always expanding with ITer",
  },
  {
    title: "Self-learning",
    content: '"Education is the kindling of a flame, not the filling of a vessel." - Socrates',
  },
  {
    title: "Together",
    content: "If you want to go far, go together",
  },
];

const Slider = () => {
  const theme = useTheme();
  const [index, setIndex] = useState<number>(1);
  const next = useRef<boolean>(true);
  const lastIndex = useRef<number>(3);
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
      sx={{
        position: "relative",
        backgroundImage: `url("/intro-${lastIndex.current}.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {[1, 2, 3].map((item) => (
        <Slide
          key={item}
          direction={next.current ? "left" : "right"}
          in={index === item}
          timeout={1000}
        >
          <Paper
            sx={{
              backgroundImage: `url("/intro-${item}.jpg")`,
              flex: index === item ? "2 1 auto" : "1 1 ",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "65vh",
              width: "100%",
              filter: "contrast(1.3) brightness(1.1)",
            }}
          ></Paper>
        </Slide>
      ))}

      <Box
        position="absolute"
        sx={{
          top: "50%",
          left: "3%",
          width: "100%",
          transform: "translate(-3%, -50%)",
          ".MuiTypography-root.MuiTypography-h1": {
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
        <Grid container>
          <Grid item md={6}>
            {quotes.map(({ title }, i) => (
              <Typography key={i} variant="h1" textAlign="center">
                {title}
              </Typography>
            ))}
          </Grid>
          <Grid item md={6} display="flex" justifyContent={"center"}>
            {quotes.map(({ content }, i) => (
              <Grow in={i + 1 === index} timeout={1500}>
                <Typography
                  variant="h5"
                  key={i}
                  className={i + 1 === index ? "show" : ""}
                  sx={{
                    color: "#000",
                    bgcolor: "rgba(255,255,255,0.9)",
                    height: "fit-content",
                    p: 2,
                    borderRadius: 12,
                    boxShadow: 2,
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

      {/* <Box
        position="absolute"
        sx={{
          top: "50%",
          right: "5%",
          transform: "translate(5%, -50%)",
          ".MuiTypography-root": {
            letterSpacing: 2,
            textShadow: "6px 3px 12px #333",
            color: "#fff",
            display: "none",
            "&.show": {
              display: "block",
            },
          },
        }}
      >
        {quotes.map(({ content }, i) => (
          <Typography
            key={i}
            variant="body1"
            component="article"
            className={i + 1 === index ? "show" : ""}
          >
            {content}
          </Typography>
        ))}
      </Box> */}

      <Fab
        size="medium"
        sx={{ position: "absolute", top: "50%", left: 0, transform: "translateY(-50%)" }}
        onClick={onPrev}
      >
        Prev
      </Fab>
      <Fab
        size="medium"
        sx={{ position: "absolute", top: "50%", right: 0, transform: "translateY(-50%)" }}
        onClick={onNext}
      >
        Next
      </Fab>
    </Box>
  );
};

export default Slider;
