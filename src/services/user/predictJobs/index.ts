import clientSideAxios from "@/config/axios/client-side";

class ApiPredict {
  async predictSuitableJobs() {
    const res = await clientSideAxios.get("/user/predict");
    return res.data;
  }
}

const predictService = new ApiPredict();

export default predictService;
