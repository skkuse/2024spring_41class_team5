import React, { useState } from 'react';
import { CChart } from '@coreui/react-chartjs';
import {
  CContainer,
  CCol,
  CRow,
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

  return (
    <CContainer fluid>
      <CRow>
        <CCol lg="6">
          <CCard style={largeCardStyle}>
            <CCardTitle style={{textAlign: 'center', marginTop: '20px'}}>탄소 배출량 절감량</CCardTitle>
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
            <CCardTitle style={{textAlign: 'center', marginTop: '20px'}}>탄소 배출량 비교</CCardTitle>
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
            <CCardHeader>나무 비교</CCardHeader>
            <CCardBody>
              {/* Content for card */}
            </CCardBody>
          </CCard>
          <CCard style={cardStyle}>
            <CCardHeader>교통 수단 비교</CCardHeader>
            <CCardBody>
              {/* Content for card */}
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
            <CCardHeader>음식 비교</CCardHeader>
            <CCardBody>
              <CCarousel controls indicators>
                <CCarouselItem>
                  <CCarouselCaption className="d-none d-md-block">
                    <h5>First slide label</h5>
                    <p>Some representative placeholder content for the first slide.</p>
                  </CCarouselCaption>
                </CCarouselItem>
                <CCarouselItem>
                  <CCarouselCaption className="d-none d-md-block">
                    <h5>Second slide label</h5>
                    <p>Some representative placeholder content for the first slide.</p>
                  </CCarouselCaption>
                </CCarouselItem>
                <CCarouselItem>
                  <CCarouselCaption className="d-none d-md-block">
                    <h5>Third slide label</h5>
                    <p>Some representative placeholder content for the first slide.</p>
                  </CCarouselCaption>
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
