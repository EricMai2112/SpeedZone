import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../Footer'
import FormRegister from './FormRegister'

export default function CarDetailPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const formRef = useRef(null)
  const [selectedCarColor, setSelectedCarColor] = useState(null)
  const car = state?.product

  if (!car) {
    return <div className='text-center mt-20 text-red-500'>Không tìm thấy thông tin xe</div>
  }

  const handleCarColorSelect = (color) => {
    setSelectedCarColor(color)
  }

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='mt-36'>
      <div className='flex justify-between m-40 gap-10'>
        <img src={car.image[0]} alt='' className='w-2/4 object-cover rounded-lg' />
        <div className='flex flex-col gap-10 border p-4 w-2/4 rounded-lg shadow-lg'>
          <h2 className='font-medium text-2xl text-center'>{car.name}</h2>
          <div className='flex justify-between'>
            <span>{car.name} Kèm Pin</span>
            <span>{car.price}</span>
          </div>
          <span>____________________________________________________________________________</span>
          <div className='flex justify-between'>
            <button className='border p-2 rounded-lg text-white bg-black font-medium'>📞 Zalo: 0837.000.222</button>
            <button onClick={handleScrollToForm} className='border p-2 rounded-lg text-white bg-[#73d944] font-medium'>
              Đăng ký lái thử
            </button>
          </div>
        </div>
      </div>
      <div>
        <h1 className='text-center font-medium text-3xl mb-20'>CÁC MÀU SẮC</h1>
        <div className='flex justify-center'>
          {car.color.map((color) => {
            return (
              <div>
                <div
                  onClick={() => {
                    handleCarColorSelect(color)
                  }}
                  className='flex cursor-pointer gap-2 bg-[#e9e9e9] rounded-lg w-28 p-2 justify-center items-center'
                >
                  <div
                    className='w-8 h-8 rounded-full border border-gray-300'
                    style={{ backgroundColor: color.value }}
                  ></div>
                  <span>{color.name}</span>
                </div>
              </div>
            )
          })}
          <img src={selectedCarColor ? selectedCarColor.image : car.color[0].image} alt='' className='w-1/2' />
        </div>
      </div>
      <div className='mt-10 p-10 bg-[#eaeffd]'>
        <h1 className='text-left font-medium text-3xl p-10'>THÔNG SỐ KỸ THUẬT</h1>
        <span>
          ____________________________________________________________________________________________________________
        </span>
        <div className='flex w-2/4 mt-5 items-center justify-between'>
          <span className='font-medium text-xl'>Kích thước</span>
          <span className='text-xl'>
            {car.length} x {car.width} x {car.height}
          </span>
        </div>
        <span>
          ____________________________________________________________________________________________________________
        </span>
        <div className='flex w-2/4 mt-5 items-center justify-between'>
          <span className='font-medium text-xl'>Số ghế ngồi</span>
          <span className='text-xl'>{car.seating_capacity}</span>
        </div>
        <span>
          ____________________________________________________________________________________________________________
        </span>
        <div className='flex w-2/4 mt-5 items-center justify-between'>
          <span className='font-medium text-xl'>Dung lượng pin</span>
          <span className='text-xl'>{car.battery_capacity}</span>
        </div>
        <span>
          ____________________________________________________________________________________________________________
        </span>
        <div className='flex w-2/4 mt-5 items-center justify-between'>
          <span className='font-medium text-xl'>Túi khí</span>
          <span className='text-xl'>{car.airbag}</span>
        </div>
        <span>
          ____________________________________________________________________________________________________________
        </span>
        <div className='flex w-2/4 mt-5 items-center justify-between'>
          <span className='font-medium text-xl'>Các công nghệ</span>
          <span className='text-xl'>{car.technology}</span>
        </div>
        <span>
          ____________________________________________________________________________________________________________
        </span>
        <div className='flex w-2/4 mt-5 items-center justify-between'>
          <span className='font-medium text-xl'>Thời gian sạc tiêu chuẩn</span>
          <span className='text-xl'>{car.standard_charge_time}</span>
        </div>
        <span>
          ____________________________________________________________________________________________________________
        </span>
        <div className='flex w-2/4 mt-5 items-center justify-between'>
          <span className='font-medium text-xl'>Thời gian sạc nhanh</span>
          <span className='text-xl'>{car.fast_charge_time}</span>
        </div>
      </div>
      <FormRegister ref={formRef} />
      <Footer />
    </div>
  )
}
