import { IEditProfile } from "@/types/IProfile";
import { AxiosInstance } from "axios";
import { toast } from "react-toastify";

export const editProfile = async (
  axios: AxiosInstance,
  value: Partial<IEditProfile> | { avatar: File }
) => {
  try {
    const res = await axios.patch<Omit<IUser, "accessToken">>("/user/profile/edit", value, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Update profile successfully");
    return res.data;
  } catch (error) {
    toast.error("Update profile failed");
  }
};
