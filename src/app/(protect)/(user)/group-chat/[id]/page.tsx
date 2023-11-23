"use client";
import React, { useEffect } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  useEffect(() => {}, [params]);

  const fetchInforGroupChat = () => {
    fetch("/api/user/group-chat/" + params.id)
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
      })
      .catch((err) => console.log("error: ", err));
  };

  return <div>Page</div>;
};

export default Page;
