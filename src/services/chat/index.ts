import clientSideAxios from "@/config/axios/client-side";

class ApiChat {
  async deleteChat(idChat: string) {
    await clientSideAxios.delete("/chat/" + idChat);
  }
}

const chatService = new ApiChat();

export default chatService;
