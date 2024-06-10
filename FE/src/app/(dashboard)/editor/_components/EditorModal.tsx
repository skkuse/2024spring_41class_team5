'use client'

import EditorWrapper from './EditorWrapper'
import DiffEditorWrapper from './DiffEditorWrapper'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditorModal() {
  const router = useRouter()
  const [originalCode, setOriginalCode] = useState('') // user typed code
  const [modifiedCode, setModifiedCode] = useState('') // suggested code by LLM

  const onClose = () => {
    router.back() // redirect without refresh
  }

  return (
    <>
      <div
        className="fixed top-0 left-0 w-dvw h-dvh bg-black opacity-50 cursor-default z-10"
        onClick={onClose}
      />
      <div className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-10c p-4 bg-white z-20">
        {originalCode == '' ? (
          <EditorWrapper setCode={setOriginalCode} setModifiedCode={setModifiedCode} />
        ) : (
          <DiffEditorWrapper originalCode={originalCode} modifiedCode={modifiedCode} />
        )}
      </div>
    </>
  )
}
