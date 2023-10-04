import authAxios from "@/config/axios/authAxios";
import { IEditProfile } from "@/types/IProfile";

export const editProfile = async (value: Partial<IEditProfile>) => {
  try {
    const res = await authAxios.put("/user/profile/edit", value);
    console.log("res: ", res);

    return res;
  } catch (error) {
    console.log("Error: ", error);
  }
};
