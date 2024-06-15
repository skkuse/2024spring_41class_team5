'use client' // 클라이언트 컴포넌트로 지정

import { useEffect, useState } from 'react'
import ProgressBar from './_components/ProgressBar'
import Accordion from './_components/Accordion'
import '../globals.css'

const getLevel = (carbonEmission: number): number => {
  if (carbonEmission <= 0) {
    return 1; 
  }
  const level = Math.floor(carbonEmission / 10) + 1
  return Math.floor(level); 
}

const getMinCarbonForLevel = (lev: number): number => {
  if (lev < 1) {
    return 0;
  }
  return (lev - 1) * 10
}

export default function Home() {
  const [counter, setCounter] = useState(0)
  const [username, setUsername] = useState('')
  const [level, setLevel] = useState(1)
  const [experience, setExperience] = useState(0)
  const [target, setTarget] = useState(0) // 서버에서 받아와야 하는 값
  const [code, setCode] = useState<codeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [accordions, setAccordions] = useState([]);
  const [accessToken, setAccessToken] = useState('')
  const url = "http://223.130.143.176/";

  interface codeResponse {
    id: number,
    original_code: string,
    merged_code: string,
    original_fp: number,
    merged_fp: number,
    date: Date,
  } 

  interface history {
    user_id: string,
    codes: Array<codeResponse>;
  }

  interface name {
    user_id: string,
    user_name: string,
    student_id: string
  }


  useEffect(()=> {
    setAccessToken(sessionStorage.getItem('accessToken'))



  }, [])


  // Use 
  useEffect(() => {
    if(!accessToken) {
      return
    }
    
    const payload = JSON.parse(window.atob(accessToken.split('.')[1]))
        

    const fetchData = async () => {
      try {
        const response = await fetch(url + "history", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: history = await response.json();
        console.log(result);

        let total_diff = 0;
        const newAccordions = result.codes.length > 0 ? (
          result.codes.map((item, index) => {
            const diff = Math.round((item.original_fp - item.merged_fp) * 100) / 100;
            total_diff += diff;
            
            return (
              <Accordion
                key={index}
                title={`Code ${index + 1}`}
                date={new Date(item.date).toISOString().split('T')[0]}
                details={`${new Date(item.date).toISOString().split('T')[0]} ${item.original_fp} ${item.merged_fp} ${diff}`}
                code={`${item.merged_code}`}
              />
            );
          })
        ) : (
            [<Accordion
            key={0}
            title={`No Codes Available`}
            date={new Date().toISOString().split('T')[0]}
            details={`X X X X`}
            code={`Code를 먼저 입력해주세요`}
          />]
        );

        setUsername(payload.data.user_name)
        setAccordions(newAccordions);
        setTarget(total_diff);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    // const fetchName = async () => {
    //   try {
    //     const response = await fetch(url + "my_info", {
    //       method: 'GET',
    //       headers: {
    //         'Authorization': `Bearer ${token}`,
    //       }
    //     });

    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }

    //     const result: name = await response.json();
    //     console.log(result);

    //     setUsername(result.user_name);
    //   } catch (error) {
    //     console.error('Fetch error:', error);
    //   }
    // };



    fetchData();
    // fetchName();
  }, [accessToken]);
  

  // const reduced_fp = data ? Math.round((data.total_original_fp - data.total_merged_fp)*100)/100 : null;
  // const total_user = data ? data.total_users : null;

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
  }, [target]) // target 값이 변경될 때 실행

  // 경험치 증가 및 레벨 업 체크
  // useEffect(() => {
  //   if (counter > 0) {
  //     setExperience(counter)
  //   }
  // }, [counter])

  useEffect(() => {
    setLevel(getLevel(experience))
    
  }, [experience])

  const curLevelExp = getMinCarbonForLevel(level)
  const nextLevelExp = getMinCarbonForLevel(level+1)
  const neededForNextLevel = Math.ceil(nextLevelExp - experience)  

  let userImageSrc = 'images/userImages/Sprout.png'
  if (level >= 5 && level < 10) {
    userImageSrc = 'images/userImages/Stem.png';
  } else if (level >= 10) {
    userImageSrc = 'images/userImages/tree.png';
  }

  const levelExp = nextLevelExp - curLevelExp
  const curAccExp = experience - curLevelExp

  return (
    <main>
      <section className="grid grid-cols-3 gap-2 m-4">
        <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg border border-gray-200" id="userIcon">
          <img className="w-48 h-48"  src={userImageSrc} alt="User Level Image" /> 
        </div>

        <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg border border-gray-200" id="userInfo">
          <div className="text-5xl" id="level">Level: {level}</div>
          <div className="text-3xl" id="username">{username} 님</div>
          <div id="progessBarName">
            <div className="flex justify-between w-full space-x-5">
              <div className="text-right text-lg">다음 레벨까지 {neededForNextLevel} mg</div>
            </div>
          </div>
          <ProgressBar
            dealt={
              (curAccExp/levelExp) * 100
            }
          />
        </div>

        <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-3" id="carbonEmission">
          <div className="text-2xl">총 탄소 배출 절감량</div>
          <div className="counter bg-gray-200 text-gray-800 text-10xl font-semibold p-6 rounded-full" id="counter">
            <div>{counter} mg</div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center large-cell bg-white p-5 rounded-lg shadow-lg border border-gray-200" id="history">
          {accordions} 
        </div>
      </section>
    </main>
  )
}
