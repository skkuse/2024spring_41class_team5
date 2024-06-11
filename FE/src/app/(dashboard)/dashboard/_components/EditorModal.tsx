"use client";

import EditorWrapper from "./EditorWrapper";
import DiffEditorWrapper from "./DiffEditorWrapper";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  setIsView: Dispatch<SetStateAction<boolean>>;
}

export default function EditorModal({ setIsView }: Props) {
  const [code, setCode] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [greenCode, setGreenCode] = useState("");
  const [runtime, setRuntime] = useState(null);

  useEffect(() => {
    if (code == "") return;
    alert(code);
    // TODO: LLM 호출
  }, [code]);

  useEffect(() => {
    if (greenCode == "") return;
    alert(greenCode);
    // TODO: 코드 실행
  }, [greenCode]);

  useEffect(() => {
    // TODO: 탄소배출량 계산
  }, [runtime]);

  return (
    <div className="flex-1 flex flex-col gap-4">
      {code == "" ? (
        <EditorWrapper setCode={setCode} />
      ) : (
        <DiffEditorWrapper
          code={code}
          suggestion={suggestion}
          setGreenCode={setGreenCode}
        />
      )}
    </div>
  );
}
