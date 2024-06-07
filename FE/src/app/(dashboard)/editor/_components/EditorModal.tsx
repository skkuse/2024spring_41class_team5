'use client'

import EditorWrapper from './EditorWrapper'
import DiffEditorWrapper from './DiffEditorWrapper'
import { useEffect, useState } from 'react'
import { getSuggestedCode, getGreenCodeRuntime } from '../_lib/api'
import { useRouter } from 'next/navigation'

export default function EditorModal() {
  const router = useRouter()
  const [code, setCode] = useState('') // user typed code
  const [suggestedCode, setSuggestedCode] = useState('') // suggested code by LLM
  const [greenCode, setGreenCode] = useState('') // user merged code

  useEffect(() => {
    if (code == '') return
    alert('user typed code: ' + code)
    const suggestedCode = getSuggestedCode(code)
    setSuggestedCode(suggestedCode)
    alert('LLM suggested code: ' + suggestedCode)
  }, [code])

  useEffect(() => {
    if (greenCode == '') return
    alert('user submitted green code: ' + greenCode)
    const runtime = getGreenCodeRuntime(greenCode)
    alert("green code's runtime: " + runtime)
    window.location.href = '/dashboard' // redirect with refresh
  }, [greenCode])

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
        {code == '' ? (
          <EditorWrapper setCode={setCode} />
        ) : (
          <DiffEditorWrapper code={code} suggestion={suggestedCode} setGreenCode={setGreenCode} />
        )}
      </div>
    </>
  )
}
