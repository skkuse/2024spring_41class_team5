'use client'

import { Editor } from '@monaco-editor/react'
import { Dispatch, FormEvent, SetStateAction } from 'react'
import { getCode } from '../_lib/api'

interface Props {
  setCode: Dispatch<SetStateAction<string>>
  setModifiedCode: Dispatch<SetStateAction<string>>
}

export default function EditorWrapper({ setCode, setModifiedCode }: Props) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const lines = event.currentTarget.querySelector('.view-lines')
    const code = Array.from(lines!.children)
      .map((line: any) => line.textContent)
      .join('\n')

    setCode(code)

    alert('user typed code: ' + code)
    const genCode = await getCode(code)
    if (genCode) setModifiedCode(genCode)
    alert('LLM suggested code: ' + genCode)
  }

  return (
    <form action="#" onSubmit={handleSubmit} className="flex flex-col gap-4 items-end">
      <label htmlFor="comment" className="sr-only">
        Add your code
      </label>
      <Editor
        height="calc(100dvh - 246px)"
        defaultLanguage="java"
        value={`class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`}
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
