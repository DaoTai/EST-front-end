import { Socket } from "socket.io-client";

export interface IResponse {
  listGroupChats: IGroupChat[];
  total: number;
  maxPage: number;
}

export interface ListGroupChatContextProps {
  isLoadingInitial: boolean;
  isValidating: boolean;
  search: string;
  listGroupChats: IGroupChat[];
  revalidate: () => void;
  setSearch: (value: string) => void;
  handleJoinGroup: ({ newGroupId }: { newGroupId: string }) => void;
  socket: Socket | undefined;
  updateLatestMessage: (newChat: IChat) => void;
  appendToLatestRead: (idGroupChat: string) => void;
}
