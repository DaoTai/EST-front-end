interface ICourse {
  _id: string;
  name: string;
  category: string;
  consumer: string;
  status: "pending" | "approved";
  deleted: boolean;
  type: "public" | "private";
  slug: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  members: any[];
  lessons: any[];
  intro: string;
  thumbnail: IAttachment;
  openDate?: string;
  closeDate?: string;
  roadmap?: IAttachment;
}
