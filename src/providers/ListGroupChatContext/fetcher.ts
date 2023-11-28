import { Fetcher } from "swr";
import { IResponse } from "./interfaces";

export const fetcher: Fetcher<IResponse, string> = (url: string) =>
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Fetch group chat failed");
    }
  });
