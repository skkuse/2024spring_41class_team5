"use client";

import EditorWrapper from "./EditorWrapper";
import DiffEditorWrapper from "./DiffEditorWrapper";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getSuggestedCode, getGreenCodeRuntime } from "../_lib/api";

interface Props {
  setIsView: Dispatch<SetStateAction<boolean>>;
  setRuntime: Dispatch<SetStateAction<number>>;
}

export default function EditorModal({ setIsView, setRuntime }: Props) {
  const [code, setCode] = useState(""); // user typed code
  const [suggestedCode, setSuggestedCode] = useState(""); // suggested code by LLM
  const [greenCode, setGreenCode] = useState(""); // user merged code

  useEffect(() => {
    if (code == "") return;
    alert("user typed code: " + code);
    const suggestedCode = getSuggestedCode(code);
    setSuggestedCode(suggestedCode);
    alert("LLM suggested code: " + suggestedCode);
  }, [code]);

  useEffect(() => {
    if (greenCode == "") return;
    alert("user submitted green code: " + greenCode);
    const runtime = getGreenCodeRuntime(greenCode);
    setRuntime(runtime);
    alert("green code's runtime: " + runtime);
    setIsView(false);
  }, [greenCode]);

  return (
    <div className="flex-1 flex flex-col gap-4">
      {code == "" ? (
        <EditorWrapper setCode={setCode} />
      ) : (
        <DiffEditorWrapper
          code={code}
          suggestion={suggestedCode}
          setGreenCode={setGreenCode}
        />
      )}
    </div>
  );
}
