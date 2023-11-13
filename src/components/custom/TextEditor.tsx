"use client";
import dynamic from "next/dynamic";
import type ReactQuill from "react-quill";
import { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
const QuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    ssr: false,
    loading: () => <p>Loadding ...</p>,
  }
) as typeof ReactQuill;

const TextEditor = (props: ReactQuillProps) => {
  return <QuillWrapper {...props} theme="snow" />;
};

export default TextEditor;
