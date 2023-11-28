import { ListGroupChatContextProps } from "@/providers/ListGroupChatContext/interfaces";
import { createContext, useContext } from "react";
export const ListGroupChatContext = createContext<ListGroupChatContextProps | undefined>(undefined);

const useListGroupChatContext = (): ListGroupChatContextProps => {
  const context = useContext(ListGroupChatContext);
  if (!context) {
    throw new Error("useListGroupChatContext must be used within a ListGroupChatProvider");
  }
  return context;
};

export default useListGroupChatContext;
