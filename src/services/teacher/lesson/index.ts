import clientSideAxios from "@/config/axios/client-side";

class ApiTeacherLesson {
  async create(idLesson: string, formData: any) {
    const res = await clientSideAxios.post("/lessons/" + idLesson, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }

  async edit(idLesson: string, formData: any) {
    const res = await clientSideAxios.post(`/lessons/detail/${idLesson}/edit`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }
}

const teacherLessonService = new ApiTeacherLesson();

export default teacherLessonService;
