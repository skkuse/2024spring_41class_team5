'use client'

import { CChart } from '@coreui/react-chartjs'
import {
  CContainer,
  CCol,
  CRow,
  CImage,
  CCard,
  CCardBody,
  CCardTitle,
  CCarousel,
  CCarouselItem,
} from '@coreui/react'
import './_styles/style.scss'

export default function Page() {
  const cardTitleStyle = {
    marginTop: '16px',
    fontSize: '24px',
  }
  const plantImages = [
    'images/icons/lavender.png',
    'images/icons/maple.png',
    'images/icons/pine.png',
  ]
  const plantData = [1.6, 2.2, 6.7]

  const transportImages = [
    'images/icons/bicycle.png',
    'images/icons/car.png',
    'images/icons/airplane.png',
  ]
  const transportData = [1.6, 2.2, 6.7]

  const foodImages = [
    'images/icons/coffee.png',
    'images/icons/chicken.png',
    'images/icons/hamburger.png',
  ]
  const foodData = [1.6, 2.2, 6.7]

  return (
    <CContainer fluid>
      <CRow style={{height: '500px'}}>
        <CCol md="6">
          <CCard className='card-container large' style={{backgroundImage: 'url(images/backgrounds/eco.jpg)', backgroundSize: 'cover'}}>
            <CCardTitle style={cardTitleStyle}>탄소 배출 절감량</CCardTitle>
            <CCardBody>
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: '100%' }}
              >
                <div className="d-flex flex-column justify-content-center align-items-center"
                  style={{ position: 'relative'}}
                >
                  <CChart
                    type="doughnut"
                    style={{ height: '100%' }}
                    data={{
                      datasets: [
                        {
                          data: [75, 25],
                          backgroundColor: ['#36A2EB', '#FFFFFF'],
                          hoverBackgroundColor: ['#36A2EB', '#FFFFFF'],
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        tooltip: {
                          enabled: false,
                        },
                      },
                      cutout: '90%',
                      radius: '90%',
                      maintainAspectRatio: false,
                    }}
                  />
                  <div className="percentage">75%</div>
                </div>
                <h5 style={{ marginBottom: '24px' }}> 탄소 배출량을 75% 절감했습니다! </h5>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md="3">
          <CCard className='card-container large'>
            <CCardTitle style={cardTitleStyle}>Before & After</CCardTitle>
            <CCardBody style={{ height: '100%' }}>
              <CChart
                type="bar"
                data={{
                  labels: ['Before', 'After'],
                  datasets: [
                    {
                      backgroundColor: ['#01565b', '#E2F397'],
                      data: [40, 20],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: false,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  maintainAspectRatio: false,
                }}
                style={{ height: '100%' }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md="3">
          <CCard className='card-container' style={{backgroundColor: '#E2F397', border: '0px', borderRadius: '16px'}}>
            <CCardTitle className="card-title">Comparing to Plant</CCardTitle>
            <CCardBody style={{padding: '0px'}}>
              <CCarousel controls dark style={{height: '100%'}}>
                <CCarouselItem>
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{ marginTop: '20px'}}
                  >
                    <div className="carousel-container-item d-flex flex-column justify-content-center align-items-center">
                      <CImage
                        src={plantImages[0]}
                        alt="lavender"
                        style={{ height: '56px', width: '56px', marginTop: '20px'}}
                      />
                      <h5 style={{ marginTop: '4px', marginBottom: '0px'}}> {plantData[0]}</h5>
                      <p style={{color: '#686D76'}}>Lavenders</p>
                    </div>
                  </div>
                </CCarouselItem>
                <CCarouselItem>
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{ marginTop: '20px'}}
                  >
                    <div className="carousel-container-item d-flex flex-column justify-content-center align-items-center">
                      <CImage
                        src={plantImages[1]}
                        alt="mapletree"
                        style={{ height: '56px', width: '56px', marginTop: '20px'}}
                      />
                      <h5 style={{ marginTop: '4px', marginBottom: '0px'}}> {plantData[1]}</h5>
                      <p style={{color: '#686D76'}}>Maple Trees</p>
                    </div>
                  </div>
                </CCarouselItem>
                <CCarouselItem>
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{ marginTop: '20px'}}
                  >
                    <div className="carousel-container-item d-flex flex-column justify-content-center align-items-center">
                      <CImage
                        src={plantImages[2]}
                        alt="pinetree"
                        style={{ height: '56px', width: '56px', marginTop: '20px'}}
                      />
                      <h5 style={{ marginTop: '4px', marginBottom: '0px'}}> {plantData[2]}</h5>
                      <p style={{color: '#686D76'}}>Pine Trees</p>
                    </div>
                  </div>
                </CCarouselItem>
              </CCarousel>
            </CCardBody>
          </CCard>
          <CCard className='card-container' style={{backgroundColor: '#5BAA8A', border: '0px', borderRadius: '16px'}}>
            <CCardTitle className="card-title" style={{color: "white"}}>Comparing to Traffic</CCardTitle>
            <CCardBody style={{padding: '0px'}}>
              <CCarousel controls dark style={{height: '100%'}}>
                <CCarouselItem>
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{ marginTop: '20px'}}
                  >
                    <div className="carousel-container-item d-flex flex-column justify-content-center align-items-center">
                      <CImage
                        src={transportImages[0]}
                        alt="bicycle"
                        style={{ height: '56px', width: '56px', marginTop: '20px'}}
                      />
                      <h5 style={{ marginTop: '4px', marginBottom: '0px'}}> {transportData[0]}km</h5>
                      <p style={{color: '#686D76'}}>Bicycle</p>
                    </div>
                  </div>
                </CCarouselItem>
                <CCarouselItem>
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{ marginTop: '20px'}}
                  >
                    <div className="carousel-container-item d-flex flex-column justify-content-center align-items-center">
                      <CImage
                        src={transportImages[1]}
                        alt="car"
                        style={{ height: '56px', width: '56px', marginTop: '20px'}}
                      />
                      <h5 style={{ marginTop: '4px', marginBottom: '0px'}}> {transportData[1]}km</h5>
                      <p style={{color: '#686D76'}}>Car</p>
                    </div>
                  </div>
                </CCarouselItem>
                <CCarouselItem>
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{ marginTop: '20px'}}
                  >
                    <div className="carousel-container-item d-flex flex-column justify-content-center align-items-center">
                      <CImage
                        src={transportImages[2]}
                        alt="airplane"
                        style={{ height: '56px', width: '56px', marginTop: '20px'}}
                      />
                      <h5 style={{ marginTop: '4px', marginBottom: '0px'}}> {transportData[2]}km</h5>
                      <p style={{color: '#686D76'}}>Airplane</p>
                    </div>
                  </div>
                </CCarouselItem>
              </CCarousel>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol md="9">
          <CCard className='card-container'>
            <CCardTitle style={cardTitleStyle}>탄소 배출량 절감 기록</CCardTitle>
            <CCardBody>
              <CChart
                type="line"
                data={{
                  labels: ['5/1', '5/2', '5/3', '5/4', '5/5', '5/6', '5/7'],
                  datasets: [
                    {
                      backgroundColor: 'rgba(151, 187, 205, 0.2)',
                      borderColor: 'rgba(151, 187, 205, 1)',
                      pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                      pointBorderColor: '#fff',
                      data: [50, 12, 28, 29, 7, 25, 12],
                      tension: 0.1,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: false,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  maintainAspectRatio: false,
                }}
                style={{ height: '100%' }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md="3">
          <CCard className='card-container' style={{backgroundColor: '#01565b', border: '0px', borderRadius: '16px'}}>
            <CCardTitle className="card-title" style={{color: "white"}}>Comparing to Food</CCardTitle>
            <CCardBody style={{padding: '0px'}}>
              <CCarousel controls dark style={{height: '100%'}}>
                <CCarouselItem>
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{ marginTop: '20px'}}
                  >
                    <div className="carousel-container-item d-flex flex-column justify-content-center align-items-center">
                      <CImage
                        src={foodImages[0]}
                        alt="bicycle"
                        style={{ height: '56px', width: '56px', marginTop: '20px'}}
                      />
                      <h5 style={{ marginTop: '4px', marginBottom: '0px'}}> {foodData[0]}</h5>
                      <p style={{color: '#686D76'}}>Coffee</p>
                    </div>
                  </div>
                </CCarouselItem>
                <CCarouselItem>
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{ marginTop: '20px'}}
                  >
                    <div className="carousel-container-item d-flex flex-column justify-content-center align-items-center">
                      <CImage
                        src={foodImages[1]}
                        alt="car"
                        style={{ height: '56px', width: '56px', marginTop: '20px'}}
                      />
                      <h5 style={{ marginTop: '4px', marginBottom: '0px'}}> {foodData[1]}</h5>
                      <p style={{color: '#686D76'}}>Chicken</p>
                    </div>
                  </div>
                </CCarouselItem>
                <CCarouselItem>
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{ marginTop: '20px'}}
                  >
                    <div className="carousel-container-item d-flex flex-column justify-content-center align-items-center">
                      <CImage
                        src={foodImages[2]}
                        alt="airplane"
                        style={{ height: '56px', width: '56px', marginTop: '20px'}}
                      />
                      <h5 style={{ marginTop: '4px', marginBottom: '0px'}}> {foodData[2]}</h5>
                      <p style={{color: '#686D76'}}>Burger</p>
                    </div>
                  </div>
                </CCarouselItem>
              </CCarousel>
            </CCardBody>
          </CCard>
          
        </CCol>
      </CRow>
    </CContainer>
  )
}
