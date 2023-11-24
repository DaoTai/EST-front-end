"use client";
import { Box } from "@mui/material";
import React, { useEffect } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  useEffect(() => {
    fetchInforGroupChat();
  }, [params]);

  const fetchInforGroupChat = () => {
    fetch("/api/user/group-chat/" + params.id)
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
      })
      .catch((err) => console.log("error: ", err));
  };

  return <Box></Box>;
};

export default Page;
