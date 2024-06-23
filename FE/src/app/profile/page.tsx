'use client'

import { useEffect, useState } from 'react'
import ProgressBar from './_components/ProgressBar'
import Accordion from './_components/Accordion'
import '../globals.css'
import instance from '../_lib/axios'

interface codeResponse {
  id: number
  original_code: string
  merged_code: string
  original_fp: number
  merged_fp: number
  date: Date
}

interface history {
  user_id: string
  codes: Array<codeResponse>
}

const getLevel = (carbonEmission: number): number => {
  if (carbonEmission <= 0) {
    return 1
  }
  return Math.floor(carbonEmission / 10) + 1
}

const getMinCarbonForLevel = (level: number): number => {
  if (level < 1) return 0
  return (level - 1) * 10
}

export default function Home() {
  const [counter, setCounter] = useState(0)
  const [username, setUsername] = useState('')
  const [level, setLevel] = useState(1)
  const [experience, setExperience] = useState(0)
  const [target, setTarget] = useState(0)
  const [accordions, setAccordions] = useState([])
  const [accessToken, setAccessToken] = useState('')

  const fetchData = async () => {
    const result: history = (
      await instance.get('/history', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    ).data

    let total_diff = 0
    const newAccordions =
      result.codes.length > 0
        ? result.codes.map((item, index) => {
            const diff = Math.round((item.original_fp - item.merged_fp) * 100) / 100
            total_diff += diff

            return (
              <Accordion
                key={index}
                title={`Code ${index + 1}`}
                date={new Date(item.date).toISOString().split('T')[0]}
                details={`${new Date(item.date).toISOString().split('T')[0]} ${item.original_fp} ${
                  item.merged_fp
                } ${diff}`}
                code={`${item.merged_code}`}
              />
            )
          })
        : [
            <Accordion
              key={0}
              title={`No Codes Available`}
              date={new Date().toISOString().split('T')[0]}
              details={`X X X X`}
              code={`Code를 먼저 입력해주세요`}
            />,
          ]
    setAccordions(newAccordions)
    setTarget(total_diff)
  }

  useEffect(() => {
    setAccessToken(sessionStorage.getItem('accessToken'))
  }, [])

  useEffect(() => {
    // get user info
    if (!accessToken) return
    const payload = JSON.parse(window.atob(accessToken.split('.')[1]))
    setUsername(payload.data.user_name)

    fetchData()
  }, [accessToken])

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

    setExperience(target)

    const counterInterval = setInterval(updateCounter, interval)

    return () => clearInterval(counterInterval)
  }, [target])

  useEffect(() => {
    setLevel(getLevel(experience))
  }, [experience])

  const curLevelExp = getMinCarbonForLevel(level)
  const nextLevelExp = getMinCarbonForLevel(level + 1)
  const neededForNextLevel = Math.ceil(nextLevelExp - experience)

  let userImageSrc = 'images/userImages/Sprout.png'
  if (level >= 5 && level < 10) {
    userImageSrc = 'images/userImages/Stem.png'
  } else if (level >= 10) {
    userImageSrc = 'images/userImages/tree.png'
  }

  const levelExp = nextLevelExp - curLevelExp
  const curAccExp = experience - curLevelExp

  return (
    <main>
      <section className="grid grid-cols-3 gap-2 m-4">
        <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <img className="w-48 h-48" src={userImageSrc} alt="User Level Image" />
        </div>

        <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <div className="text-5xl" id="level">
            Level: {level}
          </div>
          <div className="text-3xl" id="username">
            {username} 님
          </div>
          <div id="progessBarName">
            <div className="flex justify-between w-full space-x-5">
              <div className="text-right text-lg">다음 레벨까지 {neededForNextLevel} mg</div>
            </div>
          </div>
          <ProgressBar dealt={(curAccExp / levelExp) * 100} />
        </div>
        <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <div className="text-2xl">총 탄소 배출 절감량</div>
          <div
            className="counter bg-gray-200 text-gray-800 text-10xl font-semibold p-6 rounded-full"
            id="counter"
          >
            <div>{counter} mg</div>
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-center large-cell bg-white p-5 rounded-lg shadow-lg border border-gray-200"
          id="history"
        >
          {accordions}
        </div>
      </section>
    </main>
  )
}
