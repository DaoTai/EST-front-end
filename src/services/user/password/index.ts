import { IEditPassword } from "@/types/IProfile";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
export const changePassword = async (data: IEditPassword) => {
  try {
    await axios.patch("/api/user/change-password", data);
    toast.success("Changed password");
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data);
    }
  }
};
