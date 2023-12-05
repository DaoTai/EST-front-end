import clientSideAxios from "@/config/axios/client-side";

class ApiNotify {
  async markRead(listIds: string[]) {
    await clientSideAxios.patch("/notify/user", {
      listIds,
    });
  }
}

const notfiyService = new ApiNotify();

export default notfiyService;
