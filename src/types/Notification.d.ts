interface INotification {
  _id: string;
  content: string;
  avatar?: IAttachment;
  field: "lesson-comment" | "lesson-comment" | "my-course" | "others" | "approved-course";
  sender: string | IProfile;
  receiver: string | IProfile;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  endpoint?: string;
}
