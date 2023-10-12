interface ICourse {
  _id: string;
  name: string;
  category: string;
  consumer: string;
  status: "pending" | "approved";
  deleted: boolean;
  type: "public" | "private";
  slug: string;
  thumbnail: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  members: any[];
  lessons: any[];
  intro?: string;
  openDate?: string;
  closeDate?: string;
  roadmap?: string;
}
