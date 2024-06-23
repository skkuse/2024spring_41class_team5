'use client'
import './style.css'
import './(dashboard)/dashboard/_styles/style.scss'
import { useState, useEffect } from 'react'
import Latex from 'react-latex-next'
import 'katex/dist/katex.min.css'
import Image from 'next/image'
import instance from './_lib/axios'

interface ApiResponse {
  total_original_fp: number
  total_merged_fp: number
  total_users: number
}
interface CardProps {
  children: React.ReactNode
}
interface CardContentProps {
  children: React.ReactNode
}
interface CardOverlayProps {
  position: 'before' | 'after'
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="relative w-full max-w-md border-4 border-teal-900 transition-transform duration-[4000ms] ease-in overflow-hidden">
      {children}
    </div>
  )
}

const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div className="group">{children}</div>
}

const CardOverlay: React.FC<CardOverlayProps> = ({ position, children }) => {
  const positionClass =
    position === 'before'
      ? 'transform -translate-y-full group-hover:translate-y-0'
      : 'transform translate-y-full group-hover:translate-y-0'

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full flex justify-center items-center text-center text-2xl text-white bg-green-900 bg-opacity-30 z-10 transition-transform duration-[400ms] ease-in${positionClass}`}
    >
      {children}
    </div>
  )
}

export default function Page() {
  const teamMembers = [
    {
      name: '김주영',
      role: 'Front-End Developer',
      email: 'mailto:illuminoplanet@gmail.com',
      github: 'https://github.com/illuminoplanet',
    },
    {
      name: '배정우',
      role: 'Front-End Developer',
      email: 'mailto:bae.jungwoo@gmail.com',
      github: 'https://github.com/BaeJungWoo',
    },
    {
      name: '이송목',
      role: 'Front-End Developer',
      email: 'mailto:lsm3645@g.skku.edu',
      github: 'https://github.com/fine-pine',
    },
    {
      name: '이병철',
      role: 'Front-End Developer',
      email: 'mailto:bc6817@gmail.com',
      github: 'https://github.com/2btlFe',
    },
    {
      name: '이원영',
      role: ['Back-End Developer', 'Green Pattern Developer'],
      email: 'mailto:lwy970327@gmail.com',
      github: 'https://github.com/wonleeyoung',
    },
    {
      name: '황정민',
      role: 'Back-End Developer',
      email: 'mailto:minnie_00@naver.com',
      github: 'https://github.com/yaongmeow',
    },
  ]

  const [data, setData] = useState<ApiResponse | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      setData((await instance.get('/statistics')).data)
    }

    fetchData()
  }, [])

  useEffect(() => {
    const script = document.createElement('script')
    script.src = '/scripts/index.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const reduced_fp = data
    ? Math.round((data.total_original_fp - data.total_merged_fp) * 100) / 100
    : null
  const total_user = data ? data.total_users : null

  return (
    <>
      {/* product-description */}
      <section className="w-full flex items-center justify-between p-8 bg-customBlue max-w-12c shadow-xl rounded-xl overflow-hidden">
        <div className="flex flex-col gap-4 text-white">
          <h1 className="text-3xl font-bold">Eco Merge</h1>
          <p className="leading-7">
            에코 머지(Eco Merge)는 웹 기반 그린 코드 제안 코드 에디터로
            <br />
            프로그래머가 작성한 코드를 입력하면, 코드를 분석하여 그린 코드를 제안하고,
            <br />
            Git Merge의 형식으로 간편하게 그린 코드를 적용하는
            <br />
            프로그래머 친화적인 웹 서비스입니다.
            <br />
            우리 웹 서비스를 통해 개선 코드를 통한 탄소배출량 감소를 확인하고,
            <br />
            그린코드 작성법을 익히세요.
          </p>
        </div>
        <canvas />
      </section>
      {/* Effect */}
      <section className="flex flex-col text-center gap-4 max-w-12c p-4 bg-emerald-500 shadow-xl rounded-xl">
        <h1 className="text-3xl font-bold text-white">Why should you use Eco-Merge</h1>
        <div className="flex gap-4 items-center justify-center">
          <div className="w-full md:w-1/3">
            <Card>
              <CardContent>
                <img
                  src="images/banners/carbon_emission.webp"
                  alt="Tree"
                  className="w-full object-cover transition-transform duration-1000 ease-in transform group-hover:scale-105"
                />
                <CardOverlay position="before">
                  매년 <br /> 비효율적인 코드로 인한 <br /> 탄소 배출량이 <br /> 증가하고 있습니다
                </CardOverlay>
                <CardOverlay position="after">
                  매년 <br /> 비효율적인 코드로 인한 <br /> 탄소 배출량이 <br /> 증가하고 있습니다
                </CardOverlay>
              </CardContent>
            </Card>
          </div>
          <div className="w-full md:w-1/3">
            <Card>
              <CardContent>
                <img
                  src="images/banners/tree.webp"
                  alt="Tree"
                  className="w-full object-cover transition-transform duration-1000 ease-in transform group-hover:scale-105"
                />
                <CardOverlay position="before">
                  Eco-Merge로 <br /> {reduced_fp}mg CO2e의 <br /> 탄소 배출 절감을 <br />{' '}
                  이뤄냈습니다
                </CardOverlay>
                <CardOverlay position="after">
                  Eco-Merge로 <br /> {reduced_fp}mg CO2e의 <br /> 탄소 배출 절감을 <br />{' '}
                  이뤄냈습니다
                </CardOverlay>
              </CardContent>
            </Card>
          </div>
          <div className="w-full md:w-1/3">
            <Card>
              <CardContent>
                <img
                  src="images/banners/nature_protector.webp"
                  alt="Tree"
                  className="w-full object-cover transition-transform duration-1000 ease-in transform group-hover:scale-105"
                />
                <CardOverlay position="before">
                  현재 {total_user}명이 <br /> Eco-Merge를 이용해서 <br /> 탄소 배출 절감에 <br />{' '}
                  참여하고 있습니다
                </CardOverlay>
                <CardOverlay position="after">
                  현재 {total_user}명이 <br /> Eco-Merge를 이용해서 <br /> 탄소 배출 절감에 <br />{' '}
                  참여하고 있습니다
                </CardOverlay>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* user-manual */}
      <section className="flex flex-col text-center gap-4 max-w-12c p-4 bg-lime-200 shadow-xl rounded-xl">
        <h1 className="text-3xl font-bold text-green-700">User's guide of Eco Merge</h1>
        <div className="user-manual justify-center bg-green-50">
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
              <article className="code-editor">
                <div className="flex flex-col gap-4 justify-center w-[33%] max-w-3c p-4">
                  <h2 className="text-2xl font-bold">Step 1</h2>
                  <p className="text-xl font-thin leading-7">
                    코드 에디터에 <br /> 코드를 입력하고 <br /> 제안 버튼을 <br /> 클릭하세요
                  </p>
                </div>
              </article>
              <article className="code-green">
                <div className="flex flex-col gap-4 justify-center w-[33%] max-w-3c p-4">
                  <h2 className="text-2xl font-bold">Step 2</h2>
                  <p className="text-xl font-thin leading-7">
                    제안된 코드 중 <br /> 반영할 부분을 <br /> 선택하세요
                  </p>
                </div>
              </article>
              <article className="code-analysis">
                <div className="flex flex-col gap-4 justify-center w-[33%] max-w-3c p-4">
                  <h2 className="text-2xl font-bold">Step 3</h2>
                  <p className="text-xl font-thin leading-7">
                    최종 개선된 <br /> 코드로 인한 <br /> 탄소 배출량 감소를 <br /> 확인하세요
                  </p>
                </div>
              </article>
              <article className="code-history">
                <div className="flex flex-col gap-4 justify-center w-[33%] max-w-3c p-4">
                  <h2 className="text-2xl font-bold">Step 4</h2>
                  <p>
                    히스토리를 통해 <br /> 이전에 저장했던 <br /> 개선 코드를 확인하세요
                  </p>
                </div>
              </article>
            </section>
          </header>
        </div>
      </section>

      {/* Server Info */}
      <section className="flex flex-col gap-4 text-center max-w-12c p-4 bg-green-50 shadow-xl rounded-xl">
        <h1 className="text-3xl font-bold text-green-700">Information</h1>
        <div className="flex items-center justify-around p-4 bg-white rounded-lg">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">Server Information</h2>
            <p>
              <strong>OS:</strong> Ubuntu 20.04 LTS (Focal Fossa)
              <br />
              <strong>CPU:</strong> Intel(R) Xeon(R) Gold 5220 CPU @ 2.20GHz 2EA
              <br />
              <strong>Memory:</strong> 8GB
            </p>
          </div>
          <Image
            className="object-cover"
            width={300}
            height={70}
            src="/images/banners/naver_platform.png"
            alt="server"
          />
        </div>
        <div className="flex flex-col rounded-lg">
          <div className="flex flex-col gap-2 p-4 bg-white">
            <h2 className="text-2xl font-bold">Carbon Calculator</h2>
            <p>
              <Latex>{`$Energy \\hspace{1mm} needed = t \\times (n_c \\times P_c \\times u_c + n_m \\times P_m) \\times PUE \\times PSF$`}</Latex>
              <br />
              <Latex>{`$Carbon \\hspace{1mm} footprint = energy \\hspace{1mm} needed \\times carbon \\hspace{1mm} intensity$`}</Latex>
            </p>
          </div>

          <table className="bg-teal-50 rounded-lg">
            <tbody>
              <tr>
                <td>
                  <Latex>{`$t$`}</Latex> : code execution time(s)
                </td>
                <td>
                  <Latex>{`$n_c$`}</Latex> : number of cores
                </td>
                <td>
                  <Latex>{`$P_c$`}</Latex> : power draw of computing core
                </td>
              </tr>
              <tr>
                <td>
                  <Latex>{`$u_c$`}</Latex> : core usage factor
                </td>
                <td>
                  <Latex>{`$N_m$`}</Latex> : size of memory available
                </td>
                <td>
                  <Latex>{`$P_m$`}</Latex> : power draw of memory
                </td>
              </tr>
              <tr>
                <td>
                  <Latex>{`$PUE$`}</Latex> : efficiency coefficient of the data center
                </td>
                <td>
                  <Latex>{`$PSF$`}</Latex> : pragmatic scaling factor
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Team page */}
      <section className="flex flex-col gap-4 text-center max-w-12c p-4 bg-green-50 shadow-xl rounded-xl">
        <h1 className="text-3xl font-bold text-green-700">Team 5</h1>
        <div className="container">
          <div className="row">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-4">
                <div className="our-team">
                  <div className="picture">
                    <img
                      className="img-fluid"
                      src="images/banners/user_profile.webp"
                      alt={member.name}
                    />
                  </div>
                  <div className="flex flex-col gap-2 py-4">
                    <h3 className="name text-xl font-bold">{member.name}</h3>
                    <h4 className="title">
                      {typeof member.role === 'string'
                        ? member.role
                        : member.role.map((role, index) => (
                            <span key={index}>
                              {role}
                              {index !== member.role.length - 1 && <br />}
                            </span>
                          ))}
                    </h4>
                  </div>
                  <ul className="social">
                    <li>
                      <a href={member.email} className="fa fa-envelope" aria-hidden="true"></a>
                    </li>
                    <li>
                      <a href={member.github} className="fa fa-github" aria-hidden="true"></a>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
