'use client'; // 클라이언트 컴포넌트로 지정
import React, { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import ProgressBar from '../components/ProgressBar';
import Accordion from '../components/Accordion';
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

export default function Home() {
  const [counter, setCounter] = useState(0);
  const [username, setUsername] = useState('');
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [restExperience, setRestExperience] = useState(0);

  // 다음 레벨에 필요한 경험치 계산 함수
  const getNextLevelExperience = (lev: number): number => {
    return 100 * Math.pow(1.1, lev - 1); // 경험치 요구량을 점차 증가시키는 공식
  };

  useEffect(() => {
    // User 이름 받아오기
    setUsername('황정민');
    
    // Dial 표현
    const target = 450;
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
  }, []);

  // 경험치 증가 및 레벨 업 체크
  useEffect(() => {
    if (counter > 0) {
      setExperience((prev) => prev + counter);
    }
  }, [counter]);

  useEffect(() => {
    const nextLevelExp = getNextLevelExperience(level);
    if (experience >= nextLevelExp) {
      setExperience(experience - nextLevelExp);
      setLevel((prev) => prev + 1);
    }
    setRestExperience(nextLevelExp - experience);
  }, [experience, level]);

  return (
    <ThemeProvider theme={theme}>
      <div className={inter.className}>
        <GridContainer>
          <GridItem id="userIcon" style={{ backgroundColor: 'red' }}>
            새싹 이미지
          </GridItem>

          <GridItem id="userInfo" style={{ backgroundColor: 'yellow' }}>
            <div id="level">Level: {level}</div>
            <div id="username" style={{ textAlign: 'left', color: 'black' }}>{username} 님</div>
            <div id="progessBarName">
              <FlexContainer>
                <LeftAlignedText>탄소배출 저감량</LeftAlignedText>
                <RightAlignedText>다음 레벨까지 {restExperience}</RightAlignedText>
              </FlexContainer>
            </div>
            <ProgressBar dealt={((experience - getNextLevelExperience(level - 1)) / (getNextLevelExperience(level) - getNextLevelExperience(level - 1))) * 100} />
          </GridItem>

          <GridItem id="carbonEmission" style={{ backgroundColor: 'blue' }}>
            <div className="counter" id="counter">{counter}</div>
          </GridItem>
          <GridItem className="large-cell" id="history" style={{ backgroundColor: 'green', padding: '10px' }}>
            <Accordion
              title="아코디언 제목"
              details="src: 110tC tgt: 25tC -> -85tC"
              code={`<div>
  // 예시 코드
  console.log('Hello, world!');
</div>`}
            />
            <Accordion
              title="아코디언 제목"
              details="src: 110tC tgt: 25tC -> -85tC"
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
