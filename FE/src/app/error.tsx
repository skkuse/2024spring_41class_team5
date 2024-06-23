'use client'

import FullScreenLoader from '../app/_components/loader/FullScreenLoader'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <>
      <FullScreenLoader />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center text-gray-500 text-xl">
        <h1>오류가 발생했습니다. </h1>
        <button
          className="underline"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          되돌아가기
        </button>
      </div>
    </>
  )
}
