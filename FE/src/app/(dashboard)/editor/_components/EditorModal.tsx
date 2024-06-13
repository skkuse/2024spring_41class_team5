'use client'

import EditorWrapper from './EditorWrapper'
import DiffEditorWrapper from './DiffEditorWrapper'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditorModal() {
  const router = useRouter()
  const [originalCode, setOriginalCode] = useState('') // user typed code
  const [modifiedCode, setModifiedCode] = useState('') // suggested code by LLM

  const onClose = () => {
    router.back() // redirect without refresh
  }

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken')
    if (!accessToken) router.push('/login')

    if (document.getElementById('overlay') && document.getElementById('modal')) {
      document.getElementById('overlay').classList.remove('opacity-0')
      document.getElementById('overlay').classList.add('opacity-50')
      document.getElementById('modal').classList.remove('translate-y-96')
      document.getElementById('modal').classList.add('-translate-y-1/2')
      document.getElementById('modal').classList.remove('scale-75')
      document.getElementById('modal').classList.add('scale-100')
    }
  }, [])

  return (
    <>
      <div
        id="overlay"
        className="fixed top-0 left-0 w-dvw h-dvh bg-black opacity-0 cursor-default z-10 transition-all duration-1000"
        onClick={onClose}
      />
      <div
        id="modal"
        className="fixed top-[50%] left-[50%] -translate-x-1/2 translate-y-96 scale-75 w-10c p-4 bg-white rounded-xl z-20 transition-all duration-1000"
      >
        {originalCode == '' ? (
          <EditorWrapper setCode={setOriginalCode} setModifiedCode={setModifiedCode} />
        ) : (
          <DiffEditorWrapper originalCode={originalCode} modifiedCode={modifiedCode} />
        )}
      </div>
    </>
  )
}
