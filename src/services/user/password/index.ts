import { IEditPassword } from "@/types/IProfile";
import { AxiosError, AxiosInstance } from "axios";
import { toast } from "react-toastify";

export const changePassword = async (axios: AxiosInstance, data: IEditPassword) => {
  try {
    await axios.patch("/user/change-password", data);
    toast.success("Change password successfully");
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status !== 500) {
        toast.error(error.response?.data);
      }
    }
  }
};
