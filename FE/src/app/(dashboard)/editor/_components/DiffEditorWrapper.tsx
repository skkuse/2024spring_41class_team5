'use client'

import { DiffEditor } from '@monaco-editor/react'
import { Dispatch, FormEvent, SetStateAction } from 'react'

interface Props {
  code: string
  suggestion: string
  setGreenCode: Dispatch<SetStateAction<string>>
}

export default function DiffEditorWrapper({ code, suggestion, setGreenCode }: Props) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const lines = event.currentTarget.querySelectorAll('.view-lines')[1]
    const code = Array.from(lines.children)
      .map((line: any) => line.textContent)
      .join('\n')

    setGreenCode(code)
  }

  return (
    <form action="#" onSubmit={handleSubmit} className="flex flex-col gap-4 items-end">
      <label htmlFor="comment" className="sr-only">
        Add your code
      </label>
      <DiffEditor
        height="calc(100dvh - 246px)"
        language="java"
        original={code}
        modified={suggestion}
        options={{ glyphMargin: true }}
      />
      <button
        type="submit"
        className="rounded px-4 py-2 bg-green-900 text-white hover:bg-green-800"
      >
        Submit
      </button>
    </form>
  )
}
