import { IEditProfile } from "@/types/IProfile";
import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";

export const searchProfile = async (
  axios: AxiosInstance,
  query: { page?: number; search?: string; role?: string }
) => {
  try {
    const res = await axios.get<{
      users: IProfile[];
      maxPage: number;
      total: number;
    }>("/user/profile", {
      params: query,
    });
    return res.data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

// export const editProfile = async (
//   axios: AxiosInstance,
//   value: Partial<IEditProfile> | { avatar: File }
// ) => {
//   try {
//     const res = await axios.patch<IProfile>("/user/profile", value, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     toast.success("Update profile successfully");
//     return res.data;
//   } catch (error) {
//     toast.error("Update profile failed");
//   }
// };

export const editProfile = async (value: Partial<IEditProfile> | { avatar: File }) => {
  try {
    const res = await axios.patch<IProfile>("/api/user/profile", value, {
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
