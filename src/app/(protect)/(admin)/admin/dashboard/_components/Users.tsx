"use client";
import statisticalService from "@/services/admin/statistical";
import React, { useEffect, useState } from "react";
import RoleUser from "./RoleUser";

const Users = () => {
  const [profiles, setProfiles] = useState<IProfile[]>([]);

  useEffect(() => {
    statisticalService.getAllUsers().then((data) => {
      setProfiles(data);
    });
  }, []);
  return (
    <div>
      <RoleUser data={profiles} />
    </div>
  );
};

export default Users;
