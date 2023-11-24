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
}
