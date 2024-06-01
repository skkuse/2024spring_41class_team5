
'use client'; // 클라이언트 컴포넌트로 지정
import React, { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import ProgressBar from '../_components/ProgressBar';
import Accordion from '../_components/Accordion';
import styled, { ThemeProvider } from 'styled-components';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 10px;
  margin: 20px 20px; /* 양 옆에 20px 마진 추가 */
`;

const GridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: white;
  flex-direction: column; /* 세로 정렬을 위해 추가 */
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const LeftAlignedText = styled.div`
  text-align: left; /* 텍스트를 왼쪽으로 정렬 */
`;

const RightAlignedText = styled.div`
  text-align: right; /* 텍스트를 오른쪽으로 정렬 */
`;

const theme = {
  redColor: 'red',
};

const InfoTable = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoCell = styled.div`
  padding: 5px 10px;
`;

const getNextLevelExperience = (lev: number): number => {
  return Math.floor(100 * Math.pow(1.1, lev - 1)); // 경험치 요구량을 점차 증가시키는 공식
};

export default function Home() {
  const [counter, setCounter] = useState(0);
  const [username, setUsername] = useState('');
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [target, setTarget] = useState(450); // 서버에서 받아와야 하는 값

  useEffect(() => {
    // User 이름 받아오기
    setUsername('황정민');
  }, []);

  useEffect(() => {
    // Dial 표현
    const duration = 2000;
    const interval = 10;
    const increment = target / (duration / interval);
    let count = 0;

    const updateCounter = () => {
      count += increment;
      if (count >= target) {
        count = target;
        clearInterval(counterInterval);
      }
      setCounter(Math.floor(count));
    };

    const counterInterval = setInterval(updateCounter, interval);
    
    return () => clearInterval(counterInterval);
  }, [target]); // target 값이 변경될 때 실행

  // 경험치 증가 및 레벨 업 체크
  useEffect(() => {
    if (counter > 0) {
      setExperience(counter);
    }
  }, [counter]);

  useEffect(() => {
    const nextLevelExp = getNextLevelExperience(level);
    if (experience >= nextLevelExp) {
      setExperience((prevExperience) => prevExperience - nextLevelExp);
      setLevel((prevLevel) => prevLevel + 1);
    }
  }, [experience, level]);

  const nextLevelExp = getNextLevelExperience(level);
  const neededForNextLevel = nextLevelExp - experience;
  const neededCarbonReduction = Math.floor(neededForNextLevel); // 필요한 경험치를 탄소 배출량으로 변환

  return (
    <ThemeProvider theme={theme}>
      <div className={inter.className}>
        <GridContainer>
          <GridItem id="userIcon" style={{  }}>
            새싹 이미지
          </GridItem>

          <GridItem id="userInfo" style={{ }}>
            <div id="level">Level: {level}</div>
            <div id="username" style={{ textAlign: 'left', color: 'black' }}>{username} 님</div>
            <div id="progessBarName">
              <FlexContainer>
                <LeftAlignedText>탄소배출 저감량</LeftAlignedText>
                <RightAlignedText>다음 레벨까지 {neededCarbonReduction} tC</RightAlignedText>
              </FlexContainer>
            </div>
            <ProgressBar dealt={((experience - getNextLevelExperience(level - 1)) / (getNextLevelExperience(level) - getNextLevelExperience(level - 1))) * 100} />
          </GridItem>

          <GridItem id="carbonEmission" style={{ }}>
            <div className="counter" id="counter">{counter}</div>
          </GridItem>
          
          <GridItem className="large-cell" id="history" style={{padding: '10px' }}>
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
            
            
          </GridItem>

        </GridContainer>
      </div>
    </ThemeProvider>
  );
}
