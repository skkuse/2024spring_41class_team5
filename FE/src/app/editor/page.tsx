"use client";

import { useState } from "react";
import EditorModal from "./_components/EditorModal";

export default function Page() {
  const [isView, setIsView] = useState(true);
  const [runtime, setRuntime] = useState(0);

  return (
    <main className="flex-1 flex flex-col gap-4">
      <h1>Dashboard</h1>
      {isView && <EditorModal setIsView={setIsView} setRuntime={setRuntime} />}
    </main>
  );
}
