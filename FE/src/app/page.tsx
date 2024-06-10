"use client"
import Script from 'next/script'
import './style.css'
import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ApiResponse {
  total_original_fp: number;
  total_merged_fp: number;
  total_users: number;
}

const Card = styled.div`
  margin-top: 100px !important;
  width: 400px;
  margin: auto;
  height: 400px;
  position: relative;
  transition: transform 4s ease-in;
  overflow: hidden;
  border: 4px solid #fff;
`;

const CardContent = styled.div`
  &:hover .before,
  &:hover .after {
    transform: translateY(0%);
  }
`;

const CardOverlay = styled.div<{ $position: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 25px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: rgba(2, 60, 40, 0.3);
  z-index: 1;
  transition: transform 0.4s ease-in;
  border: 4px solid #04380f;
  box-sizing: border-box;
  transform: ${({ $position }) => ($position === 'before' ? 'translateY(-100%)' : 'translateY(100%))')};
  transform: ${({ $position }) => ($position === 'after' ? 'translateY(+100%)' : 'translateY(+100%))')};
`;

export default function Page() {
  const teamMembers = [
    {
      name: "김주영",
      email: "mailto:illuminoplanet@gmail.com",
      github: "https://github.com/illuminoplanet",
    },
    {
      name: "배정우",
      email: "mailto:bae.jungwoo@gmail.com",
      github: "https://github.com/BaeJungWoo",
    },
    {
      name: "이송목",
      email: "mailto:lsm3645@g.skku.edu",
      github: "https://github.com/fine-pine",
    },
    {
      name: "이병철",
      email: "mailto:bc6817@gmail.com",
      github: "https://github.com/2btlFe",
    },
    {
      name: "이원영",
      email: "mailto:lwy970327@gmail.com",
      github: "https://github.com/wonleeyoung",
    },
    {
      name: "황정민",
      email: "mailto:minnie_00@naver.com",
      github: "https://github.com/yaongmeow",
    },
  ];

  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://223.130.143.176/statistics');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: ApiResponse = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/scripts/index.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }
  const reduced_fp = data ? Math.round((data.total_original_fp - data.total_merged_fp)*100)/100 : null;
  const total_user = data ? data.total_users : null;

  return (
    <>
    {/* api test */}
    {/* <div>
      <h1>Data from API</h1>
      <h1>Total Users: {data ? data.total_users : 'Loading...'}</h1>
      <h1>reduced_fp: {reduced_fp !== null ? reduced_fp : 'Loading...'}</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        'Loading...'
      )}
    </div> */}

      {/* product-description */}
      <div className="product-description">
        <div className="container mt-5">
          <div className="row align-items-center bg-light p-4 rounded">
            <div className="col-md-8">
              <h1>Eco Merge</h1>
              <p>
                에코 머지(Eco Merge)는 웹 기반 그린 코드 제안 코드 에디터로 프로그래머가 작성한
                코드를 입력하면, 코드를 분석하여 그린 코드를 제안하고,
                <br />
                Git Merge의 형식으로 간편하게 그린 코드를 적용하는 프로그래머 친화적인 웹
                서비스입니다.
                <br />
                우리 웹 서비스를 통해 개선 코드를 통한 탄소배출량 감소를 확인하고, 그린코드 작성법을
                익히세요.
              </p>
            </div>
            <div className="col-md-4 text-center">
              {/* <img src="images/banners/earth.png" alt="Eco Merge" class="img-fluid rounded"> */}
              <canvas />
            </div>
          </div>
        </div>
      </div>

      {/* Effect */}
      <div className="green-effect">
        <div className="row position-relative">
          <div className="col-12">
            <h1 className="green-title">Why should you use Eco-Merge</h1>
          </div>
          <div className="col-4">
            <Card>
              <CardContent>
                <img src="images/banners/carbon_emission.webp" alt="Tree" style={{ width: '100%', height: '400px', transition: 'transform 1s ease-in' }} />
                <CardOverlay className="before" $position="before">
                  매년 비효율적인 코드로 인한 <br /> 탄소 배출량이 증가하고 있습니다
                </CardOverlay>
                <CardOverlay className="after" $position="after">
                  매년 비효율적인 코드로 인한 <br /> 탄소 배출량이 증가하고 있습니다
                </CardOverlay>
              </CardContent>
            </Card>
          </div>
          <div className="col-4">
            <Card>
              <CardContent>
                <img src="images/banners/tree.webp" alt="Tree" style={{ width: '100%', height: '400px', transition: 'transform 1s ease-in' }} />
                <CardOverlay className="before" $position="before">
                  Eco-Merge로 지구 상에서  <br /> {reduced_fp}g의 탄소 배출 절감을 <br />  이뤄냈습니다 
                </CardOverlay>
                <CardOverlay className="after" $position="after">
                  Eco-Merge로 지구 상에서  <br /> {reduced_fp}g의 탄소 배출 절감을 <br />  이뤄냈습니다 
                </CardOverlay>
              </CardContent>
            </Card>
          </div>
          <div className="col-4">
            <Card>
              <CardContent>
                <img src="images/banners/nature_protector.webp" alt="Tree" style={{ width: '100%', height: '400px', transition: 'transform 1s ease-in' }} />
                <CardOverlay className="before" $position="before">
                  현재 {total_user}명이 <br /> Eco-Merge를 이용해서 <br /> 탄소 배출 절감에 <br /> 참여하고 있습니다
                </CardOverlay>
                <CardOverlay className="after" $position="after">
                  현재 {total_user}명이 <br /> Eco-Merge를 이용해서 <br /> 탄소 배출 절감에 <br /> 참여하고 있습니다
                </CardOverlay>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* user-manual */}
      <div className="title">
        <h1>How to Use</h1>
      </div>
      <div className="user-manual">
        <header>
          <input type="radio" id="code-editor" defaultValue={1} name="tractor" defaultChecked />
          <label htmlFor="code-editor">1</label>
          <input type="radio" id="code-green" defaultValue={2} name="tractor" />
          <label htmlFor="code-green">2</label>
          <input type="radio" id="code-analysis" defaultValue={3} name="tractor" />
          <label htmlFor="code-analysis">3</label>
          <input type="radio" id="code-history" defaultValue={4} name="tractor" />
          <label htmlFor="code-history">4</label>
          <section className="visor">
            <article className="unidad code-editor">
              <div>
                <h2>Step 1</h2>
                <p>코드 에디터에 코드를 입력하고 제안 버튼을 클릭하세요</p>
              </div>
            </article>
            <article className="unidad code-green">
              <div>
                <h2>Step 2</h2>
                <p>제안된 코드 중 반영할 부분을 선택하세요</p>
              </div>
            </article>
            <article className="unidad code-analysis">
              <div>
                <h2>Step 3</h2>
                <p>최종 개선된 코드로 인한 탄소 배출량 감소를 확인하세요</p>
              </div>
            </article>
            <article className="unidad code-history">
              <div>
                <h2>Step 4</h2>
                <p>히스토리를 통해 이전에 저장했던 개선 코드를 확인하세요</p>
              </div>
            </article>
          </section>
        </header>
      </div>
      {/* Team page */}
      <div className="title">
        <h1>Team 5</h1>
      </div>
      <div className="team-page">
        <div className="container">
          <div className="row">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-4">
                <div className="our-team">
                  <div className="picture">
                    <img className="img-fluid" src="images/banners/user_profile.webp" alt={member.name} />
                  </div>
                  <div className="team-content">
                    <h3 className="name">{member.name}</h3>
                    <h4 className="title">Web Developer</h4>
                  </div>
                  <ul className="social">
                    <li><a href={member.email} className="fa fa-envelope" aria-hidden="true"></a></li>
                    <li><a href={member.github} className="fa fa-github" aria-hidden="true"></a></li>
                  </ul>
                </div>
              </div>
              ))}
          </div>
        </div>
      </div>
      {/* <Script src="/scripts/index.js" /> */}
    </>
  )
}
