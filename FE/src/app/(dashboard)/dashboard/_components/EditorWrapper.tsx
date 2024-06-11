"use client";

import { Editor } from "@monaco-editor/react";
import { Dispatch, FormEvent, SetStateAction } from "react";

interface Props {
  setCode: Dispatch<SetStateAction<string>>;
}

export default function EditorWrapper({ setCode }: Props) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const lines = event.currentTarget.querySelector(".view-lines");
    const code = Array.from(lines!.children)
      .map((line: any) => line.textContent)
      .join("\n");

    setCode(code);
  };

  return (
    <form
      action="#"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-end flex-1"
    >
      <label htmlFor="comment" className="sr-only">
        Add your code
      </label>
      <Editor
        height="calc(100dvh - 246px)"
        defaultLanguage="java"
        value={`public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`}
      />
      <button
        type="submit"
        className="inline-flex items-center rounded-md px-4 py-2 text-sm bg-green-900 text-white hover:bg-green-800"
      >
        Submit
      </button>
    </form>
  );
}
