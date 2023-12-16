import clientSideAxios from "@/config/axios/client-side";

class ApiGroupChat {
  async deleteMember({ idGroupChat, idMember }: { idGroupChat: string; idMember: string }) {
    await clientSideAxios.delete(`/group-chat/${idGroupChat}/members/${idMember}`);
  }
}

const groupChatService = new ApiGroupChat();

export default groupChatService;
