import clientSideAxios from "@/config/axios/client-side";

class ApiTeacherCourse {
  async appendMember({ idCourse, idUser }: { idCourse: string; idUser: string }) {
    await clientSideAxios.post("/courses/" + idCourse, {
      idUser,
    });
  }
}

const teacherCourseService = new ApiTeacherCourse();

export default teacherCourseService;
