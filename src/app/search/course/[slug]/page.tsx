import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import DetailCourse from "./_components/Page";
import serverAxios from "@/config/axios/server-side";
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const regexRemoveHTMLTags = /<\/?[^>]+(>|$)/g;
  const slug = params.slug;
  // fetch data
  const res = await serverAxios.get<ICourse>("/search/courses/" + slug);
  const course = res.data;
  const thumbnail = course.thumbnail?.uri;
  return {
    title: course.name,
    description: course.intro.replace(regexRemoveHTMLTags, "") + "for job: " + course.suitableJob,

    openGraph: {
      images: thumbnail ? [thumbnail] : [],
    },
  };
}

const DetailCoursePage = ({ params }: { params: { slug: string } }) => {
  return <DetailCourse slug={params.slug} />;
};

export default DetailCoursePage;
