import { Socket } from "socket.io-client";

export interface IResponse {
  listGroupChats: IGroupChat[];
  total: number;
  maxPage: number;
}

export interface ListGroupChatContextProps {
  isLoadingInitial: boolean;
  isValidating: boolean;
  maxPage: number;
  size: number;
  search: string;
  listGroupChats: IGroupChat[];
  revalidate: () => void;
  setSearch: (value: string) => void;
  setSize: (size: number | ((_size: number) => number)) => Promise<IResponse[] | undefined>;
  handleJoinGroup: ({ newGroupId }: { newGroupId: string }) => void;
  socket: Socket | undefined;
  updateLatestMessage: ({ idGroup, newChat }: { idGroup: string; newChat: IChat }) => void;
}
