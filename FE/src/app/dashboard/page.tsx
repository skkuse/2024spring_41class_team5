"use client";

import { useState } from "react";
import EditorModal from "./_components/EditorModal";

export default function Page() {
  const [isView, setIsView] = useState(true);

  return (
    <main className="flex-1 flex flex-col gap-4">
      {isView && <EditorModal setIsView={setIsView} />}
    </main>
  );
}
