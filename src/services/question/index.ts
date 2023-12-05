import clientSideAxios from "@/config/axios/client-side";

class ApiQuestion {
  async deleteQuestion(idQuestion: string) {
    await clientSideAxios.delete("/admin/questions/" + idQuestion);
  }
}

const questionService = new ApiQuestion();

export default questionService;
