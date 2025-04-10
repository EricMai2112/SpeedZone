import React, { useEffect, useState } from 'react'
import event1 from '../../assets/images/event1.png'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { data } from 'react-router-dom'

export default function Home() {
  const apiEvent = 'https://67e227a797fc65f53534c8a2.mockapi.io/apiTodo/events'
  const [dataEvent, setDataEvent] = useState([])

  useEffect(() => {
    fetch(apiEvent)
      .then((res) => {
        return res.json()
      })
      .then((data) => setDataEvent(data))
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  }
  return (
    <div>
      <div className='relative h-screen w-full overflow-hidden'>
        <Slider {...settings}>
          {dataEvent.map((item) => {
            return (
              <div key={item.id}>
                <div className='relative w-full h-[80vh]'>
                  <img
                    src={item.image}
                    alt={`event-${item.id}`}
                    className='w-full max-h-screen h-[80vh] object-cover'
                  />
                  <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-0' />
                  <div className='absolute inset-0 flex items-end justify-start p-36 z-10'>
                    <div className='flex flex-col gap-5'>
                      <h2 className='text-white font-medium text-4xl'>{item.title}</h2>
                      <span className='text-white font-light'>{item.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </Slider>
        <style>
          {`
          .slick-dots {
            bottom: 30px !important;
            position: absolute
          }

          .slick-dots li button:before {
            color: white;
            font-size: 12px;
            opacity: 1;
          }
          .slick-dots li.slick-active button:before {
          color: #2d63ed !important;
          opacity: 1;
}
        `}
        </style>
      </div>
    </div>
  )
}
