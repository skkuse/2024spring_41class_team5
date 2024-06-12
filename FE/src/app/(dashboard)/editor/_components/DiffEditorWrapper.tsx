'use client'

import { DiffEditor } from '@monaco-editor/react'
import { FormEvent, MouseEvent } from 'react'
import { submitCode } from '../_lib/api'

interface Props {
  originalCode: string
  modifiedCode: string
}

export default function DiffEditorWrapper({ originalCode, modifiedCode }: Props) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const lines = event.currentTarget.querySelectorAll('.view-lines')[1]
    const mergedCode = Array.from(lines.children)
      .map((line: any) => line.textContent)
      .join('\n')

    const runtime = await submitCode(originalCode, mergedCode)
    if (!isNaN(runtime)) alert("merged code's runtime: " + runtime)
    window.location.href = '/dashboard' // redirect with refresh
  }

  return (
    <form action="#" onSubmit={handleSubmit} className="flex flex-col gap-4 items-end">
      <label htmlFor="comment" className="sr-only">
        Add your code
      </label>
      <DiffEditor
        height="calc(100dvh - 246px)"
        language="java"
        original={originalCode}
        modified={modifiedCode}
        options={{ glyphMargin: true }}
      />
      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="rounded px-4 py-2 bg-green-900 text-white hover:bg-green-800"
        >
          Submit
        </button>
      </div>
    </form>
  )
}
