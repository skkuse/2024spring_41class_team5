import Script from 'next/script'
import './style.css'
import './dashboard/_styles/style.scss'

export default function Page() {
  return (
    <>
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
            <div className="green-card card1">
              <img src="images/banners/carbon_graph.png" alt="" />
            </div>
          </div>
          <div className="col-4">
            <div className="green-card card2">
              <img src="images/banners/tree.webp" alt="" />
            </div>
          </div>
          <div className="col-4">
            <div className="green-card card3">
              <img src="images/banners/carbon_emission.webp" alt="" />
            </div>
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
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="our-team">
                <div className="picture">
                  <img className="img-fluid" src="images/banners/user_profile.webp" />
                </div>
                <div className="team-content">
                  <h3 className="name">김주영</h3>
                  <h4 className="title">Web Developer</h4>
                </div>
                <ul className="social">
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-envelope"
                      aria-hidden="true"
                    />
                  </li>
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-github"
                      aria-hidden="true"
                    />
                  </li>
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-instagram"
                      aria-hidden="true"
                    />
                  </li>
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-linkedin"
                      aria-hidden="true"
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="our-team">
                <div className="picture">
                  <img className="img-fluid" src="images/banners/user_profile.webp" />
                </div>
                <div className="team-content">
                  <h3 className="name">배정우</h3>
                  <h4 className="title">Web Developer</h4>
                </div>
                <ul className="social">
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-envelope"
                      aria-hidden="true"
                    />
                  </li>
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-github"
                      aria-hidden="true"
                    />
                  </li>
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-instagram"
                      aria-hidden="true"
                    />
                  </li>
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-linkedin"
                      aria-hidden="true"
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="our-team">
                <div className="picture">
                  <img className="img-fluid" src="images/banners/user_profile.webp" />
                </div>
                <div className="team-content">
                  <h3 className="name">이송목</h3>
                  <h4 className="title">Web Developer</h4>
                </div>
                <ul className="social">
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-envelope"
                      aria-hidden="true"
                    />
                  </li>
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-github"
                      aria-hidden="true"
                    />
                  </li>
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-instagram"
                      aria-hidden="true"
                    />
                  </li>
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-linkedin"
                      aria-hidden="true"
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="our-team">
                <div className="picture">
                  <img className="img-fluid" src="images/banners/user_profile.webp" />
                </div>
                <div className="team-content">
                  <h3 className="name">이병철</h3>
                  <h4 className="title">Web Developer</h4>
                </div>
                <ul className="social">
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-envelope"
                      aria-hidden="true"
                    />
                  </li>
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-github"
                      aria-hidden="true"
                    />
                  </li>
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-instagram"
                      aria-hidden="true"
                    />
                  </li>
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-linkedin"
                      aria-hidden="true"
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="our-team">
                <div className="picture">
                  <img className="img-fluid" src="images/banners/user_profile.webp" />
                </div>
                <div className="team-content">
                  <h3 className="name">이원영</h3>
                  <h4 className="title">Web Developer</h4>
                </div>
                <ul className="social">
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-envelope"
                      aria-hidden="true"
                    />
                  </li>
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-github"
                      aria-hidden="true"
                    />
                  </li>
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-instagram"
                      aria-hidden="true"
                    />
                  </li>
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-linkedin"
                      aria-hidden="true"
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="our-team">
                <div className="picture">
                  <img className="img-fluid" src="images/banners/user_profile.webp" />
                </div>
                <div className="team-content">
                  <h3 className="name">황정민</h3>
                  <h4 className="title">Web Developer</h4>
                </div>
                <ul className="social">
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-envelope"
                      aria-hidden="true"
                    />
                  </li>
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-github"
                      aria-hidden="true"
                    />
                  </li>
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-instagram"
                      aria-hidden="true"
                    />
                  </li>
                  <li>
                    <a
                      href="https://github.com/skkuse/2024spring_41class_team5"
                      className="fa fa-linkedin"
                      aria-hidden="true"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Script src="/scripts/index.js" />
    </>
  )
}
