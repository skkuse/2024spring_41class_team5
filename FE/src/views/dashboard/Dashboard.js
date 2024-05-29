import React, { useState } from 'react';
import { CChart } from '@coreui/react-chartjs';
import {
  CContainer,
  CCol,
  CRow,
  CImage,
  CCard,
  CCardBody,
  CCardTitle,
  CCardHeader,
  CCarousel,
  CCarouselItem,
  CCarouselCaption,
} from '@coreui/react'

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const Dashboard = () => {
  const cardStyle = {
    height: '200px', 
    marginBottom: '20px',
  };
  const cardTitleStyle = {
    textAlign: 'center',
    marginTop: '16px',
  };


  const largeCardStyle = {
    ...cardStyle,
    height: '420px', 
  };
  const percentageStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, 20%)',
    fontSize: '24px',
    fontWeight: 'bold',
  };
  const [value, onChange] = useState(new Date());

  const plantImages = ['src/assets/images/lavender.png', 'src/assets/images/maple.png', 'src/assets/images/pine.png']
  const plantData = [1.6, 2.2, 6.7]

  const transportImages = ['src/assets/images/bicycle.png', 'src/assets/images/car.png', 'src/assets/images/airplane.png']
  const transportData = [1.6, 2.2, 6.7]

  const foodImages = ['src/assets/images/coffee.png', 'src/assets/images/chicken.png', 'src/assets/images/hamburger.png']
  const foodData = [1.6, 2.2, 6.7]

  return (
    <CContainer fluid>
      <CRow>
        <CCol lg="6">
          <CCard style={largeCardStyle}>
            <CCardTitle style={cardTitleStyle}>탄소 배출량 절감량</CCardTitle>
            <CCardBody>
              <CChart
                type="doughnut"
                style={{height: '100%'}}
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
                  maintainAspectRatio: false,
                  borderWidth: 0,
                  radius: 120,
                  cutout: 110,
                }}
              />
              <div style={percentageStyle}>
                75%
              </div>
              <div style={percentageStyle}>
                탄소 배출량 75% 절감!
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg="3">
          <CCard style={largeCardStyle}>
            <CCardTitle style={cardTitleStyle}>탄소 배출량 비교</CCardTitle>
            <CCardBody>
            <CChart
              type="bar"
              data={{
                labels: ['Before', 'After'],
                datasets: [
                  {
                    backgroundColor: '#f87979',
                    data: [40, 20],
                  },
                ],
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol g="3">
          <CCard style={cardStyle}>
            <CCardTitle style={cardTitleStyle}>식물 비교</CCardTitle>
            <CCardBody>
              <CCarousel controls dark>
                <CCarouselItem>
                  <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                    <CImage src={plantImages[0]} alt="lavender" style={{ height: '56px', width: '56px' }} />
                    <h5 style={{marginTop: '15px'}}> {plantData[0]} Lavenders</h5>
                  </div>
                </CCarouselItem>
                <CCarouselItem>
                  <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                    <CImage src={plantImages[1]} alt="maple" style={{ height: '56px', width: '56px' }} />
                    <h5 style={{marginTop: '15px'}}> {plantData[1]} Maple Trees</h5>
                  </div>
                </CCarouselItem>
                <CCarouselItem>
                  <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                    <CImage src={plantImages[2]} alt="pine" style={{ height: '56px', width: '56px' }} />
                    <h5 style={{marginTop: '15px'}}> {plantData[2]} Pine Trees</h5>
                  </div>
                </CCarouselItem>
              </CCarousel>
            </CCardBody>
          </CCard>
          <CCard style={cardStyle}>
          <CCardTitle style={cardTitleStyle}>교통 수단 비교</CCardTitle>
            <CCardBody>
              <CCarousel controls dark>
                <CCarouselItem>
                  <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                    <CImage src={transportImages[0]} alt="bicycle" style={{ height: '64px', width: '64px' }} />
                    <h5 style={{marginTop: '15px'}}> {transportData[0]}km Bicycle</h5>
                  </div>
                </CCarouselItem>
                <CCarouselItem>
                  <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                    <CImage src={transportImages[1]} alt="car" style={{ height: '64px', width: '64px' }} />
                    <h5 style={{marginTop: '15px'}}> {transportData[1]}km Car</h5>
                  </div>
                </CCarouselItem>
                <CCarouselItem>
                  <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                    <CImage src={transportImages[2]} alt="airplane" style={{ height: '64px', width: '64px' }} />
                    <h5 style={{marginTop: '15px'}}> {transportData[2]}km Airplane</h5>
                  </div>
                </CCarouselItem>
              </CCarousel>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol lg="6">
          <CCard style={cardStyle}>
            <CCardHeader>캘린더 날짜 기준 KDE 플롯</CCardHeader>
            <CCardBody>
            <CChart
              type="line" 
              data={{
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                  {
                    label: "My Second dataset",
                    backgroundColor: "rgba(151, 187, 205, 0.2)",
                    borderColor: "rgba(151, 187, 205, 1)",
                    pointBackgroundColor: "rgba(151, 187, 205, 1)",
                    pointBorderColor: "#fff",
                    data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
                  },
                ],
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg="3">
          <CCard style={cardStyle}>
            <CCardHeader>캘린더</CCardHeader>
            <CCardBody>
            <Calendar onChange={onChange} value={value} />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg="3">
          <CCard style={cardStyle}>
            <CCardTitle style={cardTitleStyle}>음식 비교</CCardTitle>
            <CCardBody style={{height: '100%'}}>
              <CCarousel controls dark>
                <CCarouselItem>
                  <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                    <CImage src={foodImages[0]} alt="coffee" style={{ height: '60px', width: '60px' }} />
                    <h5 style={{marginTop: '15px'}}> {foodData[0]} Coffees</h5>
                  </div>
                </CCarouselItem>
                <CCarouselItem>
                  <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                    <CImage src={foodImages[1]} alt="chicken" style={{ height: '60px', width: '60px' }} />
                    <h5 style={{marginTop: '15px'}}> {foodData[1]} Chickens</h5>
                  </div>
                </CCarouselItem>
                <CCarouselItem>
                  <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                    <CImage src={foodImages[2]} alt="hamburger" style={{ height: '60px', width: '60px' }} />
                    <h5 style={{marginTop: '15px'}}> {foodData[2]} Hamburgers</h5>
                  </div>
                </CCarouselItem>
              </CCarousel>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default Dashboard
