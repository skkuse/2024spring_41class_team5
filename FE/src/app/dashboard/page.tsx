'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
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

function parseHistoryData(historyData) {
  const today = new Date().toISOString().split('T')[0];
  const todayEntries = historyData.filter(entry => entry.date.startsWith(today))

  if (todayEntries.length === 0) {
    return {
      percentage: 80,
      original_fp: 100,
      merged_fp: 20,
      plantData: [1.6, 2.2, 6.7],
      transportData: [1.6, 2.2, 6.7],
      foodData: [1.6, 2.2, 6.7],
    };
  }
  const latestTodayEntry = todayEntries[todayEntries.length - 1];

  let original_fp = latestTodayEntry.original_fp
  let merged_fp = latestTodayEntry.merged_fp

  let percentage = Math.round(merged_fp / original_fp * 100);

  // https://www.carbonindependent.org/22.html

  const plantConst = [];

  let plantData = [1.6, 2.2, 6.7];
  let transportData = [1.6, 2.2, 6.7];
  let foodData = [1.6, 2.2, 6.7];

  return {
    percentage,
    original_fp,
    merged_fp,
    plantData,
    transportData,
    foodData,
  }
}

export default function Page() {
  const [isCodeSubmitted, setIsCodeSubmitted] = useState(true)
  const [historyData, setHistoryData] = useState([])

  const plantImages = [
    'images/icons/lavender.png',
    'images/icons/maple.png',
    'images/icons/pine.png',
  ]
  const transportImages = [
    'images/icons/bicycle.png',
    'images/icons/car.png',
    'images/icons/airplane.png',
  ]
  const foodImages = [
    'images/icons/coffee.png',
    'images/icons/chicken.png',
    'images/icons/hamburger.png',
  ]

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/history', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            "Access-Control-Allow-Origin": "*"
          },
        });

        let data = response.data.codes;
        data = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setHistoryData(data);

        const today = new Date().toISOString().split('T')[0];
        const hasTodayEntry = data.some(entry => entry.date.startsWith(today));

        setIsCodeSubmitted(!hasTodayEntry);
      } 
      catch (error) {
        console.error('Error fetching history:', error);
      }
    };
    fetchHistory();
  }, []);

  const displayData = parseHistoryData(historyData);

  return (
    <CContainer fluid className="select-none">
      {isCodeSubmitted && (
        <div className="overlay">
          <div className="overlay-content">
            <h2 className='overlay-heading'>Please submit code first</h2>
            <Link href="/editor" className='overlay-button'>
              Submit Code
            </Link>
          </div>
        </div>
      )}
      <Link href="/editor" className='overlay-button'>
        Re-submit Code
      </Link>
      <CRow>
        <CCol md="6">
          <CCard className='card-container bg-black section-doughnut large border-0'>
            <CCardBody>
              <div className="h-full d-flex flex-column justify-content-center align-items-center">
                <div className="h-64 d-flex flex-column justify-content-center align-items-center">
                  <CChart
                    type="doughnut"
                    style={{ height: '100%' }}
                    data={{
                      datasets: [
                        {
                          data: [displayData.percentage, 100 - displayData.percentage],
                          backgroundColor: ['white', 'transparent'],
                          borderWidth: 0,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        tooltip: { enabled: false },
                      },
                      events: [],
                      cutout: '94%',
                      radius: '100%',
                      maintainAspectRatio: false,
                    }}
                  />
                  <div className="percentage">{displayData.percentage} %</div>
                </div>
                <h3 className="mt-8 mb-1 font-light text-white">You reduced carbon emission to {displayData.percentage}%!</h3>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md="3">
          <CCard className='card-container large'>
            <CCardTitle className="card-title">Before & After</CCardTitle>
            <CCardBody>
              <CChart
                type="bar"
                data={{
                  labels: ['Before', 'After'],
                  datasets: [
                    {
                      backgroundColor: ['#01565b', '#E2F397'],
                      data: [displayData.original_fp, displayData.merged_fp],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: { display: false },
                    tooltip: {  enabled: false },
                  },
                  events: [],
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
        <CCard className="card-container border-0">
            <div className="flex flex-col h-100 rounded-xl bg-lime-200"> 
              <CCardTitle className="card-title">Comparing to Plant</CCardTitle>
              <CCardBody className='h-100 p-0'>
                <CCarousel className='h-100' controls dark interval={false} >
                  <CCarouselItem>
                    <div className="carousel-container-item m-auto mt-0.25 d-flex flex-column justify-content-center align-items-center">
                      <CImage src={plantImages[0]} className="h-14 w-14 mt-4"/>
                      <h5 className="mt-1 mb-0"> {displayData.plantData[0]}</h5>
                      <p className="text-gray-400">Lavendar</p>
                    </div>
                  </CCarouselItem>
                  <CCarouselItem>
                    <div className="carousel-container-item m-auto mt-0.25 d-flex flex-column justify-content-center align-items-center">
                      <CImage src={plantImages[1]} className="h-14 w-14 mt-4"/>
                      <h5 className="mt-1 mb-0"> {displayData.plantData[1]}</h5>
                      <p className="text-gray-400">Maple Tree</p>
                    </div>
                  </CCarouselItem>
                  <CCarouselItem>
                    <div className="carousel-container-item m-auto mt-0.25 d-flex flex-column justify-content-center align-items-center">
                    <CImage src={plantImages[2]} className="h-14 w-14 mt-4"/>
                      <h5 className="mt-1 mb-0"> {displayData.plantData[2]}</h5>
                      <p className="text-gray-400">Pine Tree</p>
                    </div>
                  </CCarouselItem>
                </CCarousel>
              </CCardBody>
            </div>
          </CCard>
          <CCard className="card-container border-0">
            <div className="flex flex-col h-100 rounded-xl bg-emerald-500"> 
              <CCardTitle className="card-title text-white">Comparing to Transport</CCardTitle>
              <CCardBody className='p-0 grow'>
                <CCarousel className='h-full' controls interval={false}>
                  <CCarouselItem>
                    <div className="carousel-container-item m-auto mt-0.25 mb-10 d-flex flex-column justify-content-center align-items-center">
                      <CImage src={transportImages[0]} className="h-14 w-14 mt-4"/>
                      <h5 className="mt-1 mb-0"> {displayData.transportData[0]} km</h5>
                      <p className="text-gray-400">Bicycle</p>
                    </div>
                  </CCarouselItem>
                  <CCarouselItem>
                    <div className="carousel-container-item m-auto mt-0.25 d-flex flex-column justify-content-center align-items-center">
                      <CImage src={transportImages[1]} className="h-14 w-14 mt-4"/>
                      <h5 className="mt-1 mb-0"> {displayData.transportData[1]} km</h5>
                      <p className="text-gray-400">Car</p>
                    </div>
                  </CCarouselItem>
                  <CCarouselItem>
                    <div className="carousel-container-item m-auto mt-0.25 d-flex flex-column justify-content-center align-items-center">
                    <CImage src={transportImages[2]} className="h-14 w-14 mt-4"/>
                      <h5 className="mt-1 mb-0"> {displayData.transportData[2]} km</h5>
                      <p className="text-gray-400">Airplane</p>
                    </div>
                  </CCarouselItem>
                </CCarousel>
              </CCardBody>
            </div>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol md="9">
          <CCard className='card-container'>
            <CCardTitle className="card-title">Carbon Reduce History</CCardTitle>
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
          <CCard className="card-container border-0">
            <div className="flex flex-col h-full rounded-xl bg-teal-900"> 
              <CCardTitle className="card-title text-white">Comparing to Food</CCardTitle>
              <CCardBody className='p-0 grow'>
                <CCarousel className='w-100 h-full' controls interval={false}>
                  <CCarouselItem>
                    <div className="carousel-container-item m-auto mt-0.25 d-flex flex-column justify-content-center align-items-center">
                      <CImage src={foodImages[0]} className="h-14 w-14 mt-4"/>
                      <h5 className="mt-1 mb-0"> {displayData.foodData[0]}</h5>
                      <p className="text-gray-400">Coffee</p>
                    </div>
                  </CCarouselItem>
                  <CCarouselItem>
                    <div className="carousel-container-item m-auto mt-0.25 d-flex flex-column justify-content-center align-items-center">
                      <CImage src={foodImages[1]} className="h-14 w-14 mt-4"/>
                      <h5 className="mt-1 mb-0"> {displayData.foodData[1]}</h5>
                      <p className="text-gray-400">Chicken</p>
                    </div>
                  </CCarouselItem>
                  <CCarouselItem>
                    <div className="carousel-container-item m-auto mt-0.25 d-flex flex-column justify-content-center align-items-center">
                    <CImage src={foodImages[2]} className="h-14 w-14 mt-4"/>
                      <h5 className="mt-1 mb-0"> {displayData.foodData[2]}</h5>
                      <p className="text-gray-400">Hamburger</p>
                    </div>
                  </CCarouselItem>
                </CCarousel>
              </CCardBody>
            </div>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}
