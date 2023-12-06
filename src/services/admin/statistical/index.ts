import clientSideAxios from "@/config/axios/client-side";

class ApiAdminStastical {
  async getProgrammingLanguages() {
    const res = await clientSideAxios.get<{ _id: string; name: string; total: number }[]>(
      "/admin/statistical/programming-languages"
    );
    return res.data;
  }
  async getRegisterByProgrammingLanguages() {
    const res = await clientSideAxios.get<{ _id: string; name: string; total: number }[]>(
      "/admin/statistical/register-by-programming-languages"
    );
    return res.data;
  }

  async getAllUsers() {
    const res = await clientSideAxios.get<IProfile[]>("/admin/statistical/users");
    return res.data;
  }
}

const statisticalService = new ApiAdminStastical();

export default statisticalService;
