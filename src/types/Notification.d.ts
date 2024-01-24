interface INotification {
  _id: string;
  content: string;
  avatar?: IAttachment;
  field:
    | "lesson-comment"
    | "my-course"
    | "others"
    | "approved-course"
    | "answer-code-question"
    | "detail-course";
  sender: string | IProfile;
  receiver: string | IProfile;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  endpoint?: string;
}
