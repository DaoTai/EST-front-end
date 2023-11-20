"use client";
import Button from "@mui/material/Button";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";

type IProps = {
  role: string;
  status: string;
};
const ExportListUserToCSV = ({ role, status }: IProps) => {
  const [headers, setHeaders] = useState<{ label: string; key: string }[]>([]);
  const [download, setDowload] = useState<any[]>([]);
  useEffect(() => {
    fetchAllUsers();
  }, [role, status]);

  // Fetch all users with role & status
  const fetchAllUsers = async () => {
    try {
      const res = await axios.get<IProfile[]>(
        `/api/admin/users?}&role=${role}&status=${status}&getAll=${true}`
      );
      const users = res.data;
      const selectedField = [
        "_id",
        "roles",
        "fullName",
        "username",
        "email",
        "gender",
        "dob",
        "school",
        "city",
        "favouriteProrammingLanguages",
        "avatar",
        "createdAt",
      ];
      const selectedHeaders = selectedField.map((key) => ({ label: key, key }));
      setHeaders(selectedHeaders);
      setDowload(
        users.map((user) => ({
          ...user,
          avatar: user.avatar.uri,
        }))
      );
    } catch (error) {
      toast.error("Fetch all users failed");
    }
  };
  return (
    <CSVLink data={download} headers={headers} filename={role + "s" + "_" + status + ".csv"}>
      <Button disabled={download.length === 0} variant="contained" color="success">
        Export to CSV
      </Button>
    </CSVLink>
  );
};

export default memo(ExportListUserToCSV);
