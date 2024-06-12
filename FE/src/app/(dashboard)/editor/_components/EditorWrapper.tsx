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

    const genCode = await getCode(code)
    if (genCode) setModifiedCode(genCode)
  }

  return (
    <form action="#" onSubmit={handleSubmit} className="flex flex-col gap-4 items-end">
      <label htmlFor="comment" className="sr-only">
        Add your code
      </label>
      <Editor
        height="calc(100dvh - 246px)"
        defaultLanguage="java"
        value={`public class UselessLoop {
    public static void main(String[] args) {
        long startTime = System.currentTimeMillis();
        for (int i = 0; i < 1000000; i++)
        long endTime = System.currentTimeMillis();
        System.out.println("실행 시간: " + (endTime - startTime) + " 밀리초");
    }
}`}
      />
      <button type="submit" className="rounded px-4 py-2 bg-teal-900 text-white hover:bg-teal-800">
        Submit
      </button>
    </form>
  )
}
