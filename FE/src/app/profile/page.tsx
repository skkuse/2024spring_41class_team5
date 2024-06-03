'use client' // 클라이언트 컴포넌트로 지정

import { useEffect, useState } from 'react'
import ProgressBar from './_components/ProgressBar'
import Accordion from './_components/Accordion'
import '../globals.css'

const getNextLevelExperience = (lev: number): number => {
  return Math.floor(100 * Math.pow(1.1, lev - 1)) // 경험치 요구량을 점차 증가시키는 공식
}

export default function Home() {
  const [counter, setCounter] = useState(0)
  const [username, setUsername] = useState('')
  const [level, setLevel] = useState(1)
  const [experience, setExperience] = useState(0)
  const [target, setTarget] = useState(450) // 서버에서 받아와야 하는 값

  useEffect(() => {
    // User 이름 받아오기
    setUsername('황정민')
  }, [])

  useEffect(() => {
    // Dial 표현
    const duration = 2000
    const interval = 10
    const increment = target / (duration / interval)
    let count = 0

    const updateCounter = () => {
      count += increment
      if (count >= target) {
        count = target
        clearInterval(counterInterval)
      }
      setCounter(Math.floor(count))
    }

    const counterInterval = setInterval(updateCounter, interval)

    return () => clearInterval(counterInterval)
  }, [target]) // target 값이 변경될 때 실행

  // 경험치 증가 및 레벨 업 체크
  useEffect(() => {
    if (counter > 0) {
      setExperience(counter)
    }
  }, [counter])

  useEffect(() => {
    const nextLevelExp = getNextLevelExperience(level)
    if (experience >= nextLevelExp) {
      setExperience((prevExperience) => prevExperience - nextLevelExp)
      setLevel((prevLevel) => prevLevel + 1)
    }
  }, [experience, level])

  const nextLevelExp = getNextLevelExperience(level)
  const neededForNextLevel = nextLevelExp - experience
  const neededCarbonReduction = Math.floor(neededForNextLevel) // 필요한 경험치를 탄소 배출량으로 변환

  return (
    <main>
      <section className="grid grid-cols-3 gap-2 m-4">
        <div className="flex flex-col items-center justify-center" id="userIcon">
          새싹 이미지
        </div>

        <div className="flex flex-col items-center justify-center" id="userInfo">
          <div id="level">Level: {level}</div>
          <div id="username">{username} 님</div>
          <div id="progessBarName">
            <div className="flex justify-between w-full">
              <div className="text-left">탄소배출 저감량</div>
              <div className="text-right">다음 레벨까지 {neededCarbonReduction} tC</div>
            </div>
          </div>
          <ProgressBar
            dealt={
              ((experience - getNextLevelExperience(level - 1)) /
                (getNextLevelExperience(level) - getNextLevelExperience(level - 1))) *
              100
            }
          />
        </div>

        <div className="flex flex-col items-center justify-center" id="carbonEmission">
          <div className="counter" id="counter">
            {counter}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center large-cell" id="history">
          <Accordion
            title="아코디언 제목"
            date="2024-05-29"
            details="아코디언 2024-05-29 110tC  25tC  -85tC"
            code={`<div>
  // 예시 코드
  console.log('Hello, world!');
</div>`}
          />
          <Accordion
            title="아코디언 제목"
            date="2024-05-29"
            details="아코디언 2024-05-29 110tC  25tC  -85tC"
            code={`<div>
  // 예시 코드
  console.log('Hello, world!');
</div>`}
          />
        </div>
      </section>
    </main>
  )
}
