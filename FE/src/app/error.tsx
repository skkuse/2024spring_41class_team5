'use client'

import FullScreenLoader from '../app/_components/loader/FullScreenLoader'

export default function Page() {
  const onClick = () => {
    history.back()
  }

  return (
    <>
      <FullScreenLoader />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500 text-xl">
        <h1>오류가 발생했습니다.</h1>
        <button onClick={onClick}>되돌아가기</button>
      </div>
    </>
  )
}
