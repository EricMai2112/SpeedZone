import React, { useEffect, useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { data } from 'react-router-dom'
import vf8 from '../../assets/images/vf8.png'
import vf9 from '../../assets/images/vf91.png'
import footerbg from '../../assets/images/footerbg.png'

export default function Home() {
  const apiEvent = 'https://67e227a797fc65f53534c8a2.mockapi.io/apiTodo/events'
  const apiLichSuThuongHieu = 'https://67f77fac42d6c71cca657140.mockapi.io/LichSuThuongHieu'
  const apiAward = 'https://67f77fac42d6c71cca657140.mockapi.io/Award'
  const apiNew = 'https://67f85e102466325443ec7f89.mockapi.io/news'
  const apiCar = 'https://67e227a797fc65f53534c8a2.mockapi.io/apiTodo/cars'

  const [dataEvent, setDataEvent] = useState([])
  const [dataLichSu, setDataLichSu] = useState([])
  const [dataAward, setDataAward] = useState([])
  const [dataNew, setDataNew] = useState([])
  const [dataCar, setDataCar] = useState([])

  useEffect(() => {
    fetch(apiEvent)
      .then((res) => {
        return res.json()
      })
      .then((data) => setDataEvent(data))
  }, [])

  useEffect(() => {
    fetch(apiLichSuThuongHieu)
      .then((res) => {
        return res.json()
      })
      .then((data) => setDataLichSu(data))
  }, [])

  useEffect(() => {
    fetch(apiAward)
      .then((res) => {
        return res.json()
      })
      .then((data) => setDataAward(data))
    console.log(data)
  }, [])

  useEffect(() => {
    fetch(apiNew)
      .then((res) => {
        return res.json()
      })
      .then((data) => setDataNew(data))
    console.log(data)
  }, [])

  useEffect(() => {
    fetch(apiCar)
      .then((res) => {
        return res.json()
      })
      .then((data) => setDataCar(data))
    console.log(data)
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
      {/* ----------- */}
      <div className='flex flex-col justify-center items-center'>
        <h2 className='font-medium text-4xl mb-20'>Dấu chân toàn cầu</h2>
        <span className='text-lg ml-48 mr-48 text-center mb-12'>
          Vinfast đã nhanh chóng thiết lập sự hiện diện toàn cầu, thu hút hững tài năng tốt nhất từ khắp nơi trên thế
          giới và hợp tác với một số thương hiệu mang tính biểu tượng nhất trong nghành Ô tô
        </span>
        <div className='flex w-full'>
          <img src={vf8} alt='' className='w-1/2 h-auto object-cover' />
          <img src={vf9} alt='' className='w-1/2 h-auto object-cover' />
        </div>
      </div>
      {/* ----------- */}
      <div className='flex flex-col justify-center items-center mt-20'>
        <h2 className='font-medium text-4xl mb-20'>Lịch sử thương hiệu</h2>
        <div className='flex flex-wrap gap-10'>
          {dataLichSu.map((item) => {
            return (
              <div className='flex flex-col items-start' key={item.id}>
                <img src={item.image} alt='' className='mb-5' />
                <span className='text-lg text-center mb-5'>{item.createdAt}</span>
                <p className='text-lg text-center'>{item.title}</p>
              </div>
            )
          })}
        </div>
      </div>
      {/* ----------- */}
      <div className='justify-center items-center mt-20'>
        <h2 className='font-medium text-4xl mb-10 text-center'>Giải thưởng</h2>
        <div className='w-3/4 mx-auto'>
          <Slider {...settings}>
            {dataAward.map((item) => {
              return (
                <div key={item.id}>
                  <div className='relative w-full h-[80vh]'>
                    <img
                      src={item.image}
                      alt={`event-${item.id}`}
                      className='w-full max-h-screen h-[80vh] object-cover'
                    />
                    <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-0' />
                    <div className='absolute inset-0 flex items-end justify-start p-20 z-10'>
                      <div className='flex flex-col gap-5'>
                        <h2 className='text-white font-medium text-4xl'>{item.title}</h2>
                        <span className='text-white font-light'>{item.year}</span>
                        <span className='text-white font-light'>{item.content}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
      {/* ----------- */}
      <div className='flex flex-col justify-center items-center mt-20 pb-10 bg-[#f2f2f2]'>
        <h2 className='font-medium text-4xl mb-20 mt-20'>Các tin tức mới nhất tại chi nhánh Hồ Chí Minh</h2>
        <div className='flex flex-wrap gap-10 pl-40 pr-40'>
          {dataNew.map((item) => {
            return (
              <div
                className='flex flex-col flex-1 box-border border-gray-300 shadow-lg rounded-xl p-4 basis-[calc(50%-20px)] border bg-[#fff]'
                key={item.id}
              >
                <img src={item.avatar} alt='' />
                <h2 className='p-3 font-bold hover:text-[#2d63ed] text-xl cursor-pointer'>{item.title}</h2>
                <span className='p-3'>{item.content}</span>
                <div className='flex justify-between mt-10 p-3'>
                  <div className='flex gap-5'>
                    <img src={item.imagePulisher} alt='' className='w-5 object-cover' />
                    <span>{item.pulisher}</span>
                  </div>
                  <span>{item.releasedDate}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/* ----------- */}
      <div className='relative w-full overflow-hidden'>
        <img src={footerbg} alt='' className='w-full h-full object-cover' />
        <div className='absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-black/60 to-transparent z-0' />
        <div className='absolute inset-0 flex justify-start p-10 mt-10 z-10'>
          <div className='flex flex-col gap-5'>
            <h2 className='font-medium text-white text-4xl'>SPEEDZONE HỒ CHÍ MINH</h2>
            <div className='flex flex-col'>
              <span className='text-white'>12 Nguyễn Văn Bảo, phường 1, quận Gò Vấp, TPHCM</span>
              <span className='text-white'>____________________________________________________________</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-white'>Số điện thoại: 0837000222</span>
              <span className='text-white'>____________________________________________________________</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-white'>Zalo: 0837000222</span>
              <span className='text-white'>____________________________________________________________</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-white'>Gmail: Mait58674@gmail.com</span>
              <span className='text-white'>____________________________________________________________</span>
            </div>
          </div>
        </div>
        <div className='absolute inset-0 flex justify-center p-10 mt-10 z-10'>
          <div className='flex flex-col gap-5'>
            <h2 className='font-medium text-white text-4xl'>SẢN PHẨM</h2>
            <div>
              {dataCar.map((item) => {
                return (
                  <div className='flex flex-col' key={item.id}>
                    <h1 className='text-white '>{item.name}</h1>
                    <span className='text-white'>____________________________________________________________</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='absolute inset-0 flex justify-end p-10 mt-10 z-10'>
          <div className='flex flex-col gap-5'>
            <h2 className='font-medium text-white text-4xl'>SPEEDZONE HỒ CHÍ MINH</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
