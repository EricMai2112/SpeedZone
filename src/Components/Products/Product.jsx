import React, { useEffect, useRef, useState } from 'react'
import vf9 from '../../assets/images/vf91.png'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom'
import FormRegister from './FormRegister'

export default function Product() {
  const apiCar = 'https://67e227a797fc65f53534c8a2.mockapi.io/apiTodo/cars'
  const navigate = useNavigate()
  const formRef = useRef(null)
  const contactRef = useRef(null)

  const [dataCar, setDataCar] = useState([])

  useEffect(() => {
    fetch(apiCar)
      .then((res) => {
        return res.json()
      })
      .then((data) => setDataCar(data))
  }, [])

  const handleClick = (item) => {
    console.log(item)
    navigate(`/product/${item.id}`, { state: { product: item } })
  }

  const handleScrollToRegister = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='mt-36 flex flex-col items-center justify-center'>
      <div className='w-11/12'>
        <h1 className='text-center font-medium text-4xl bg-[#ebebeb] p-2 rounded-lg'>
          CÁC DÒNG XE VINFAST TẠI SPEEDZONE
        </h1>
      </div>
      {/* ---------- */}
      <div className='flex flex-wrap gap-10 w-11/12 mt-20 pb-10'>
        {dataCar.map((item) => {
          return (
            <div
              className='flex cursor-pointer items-center overflow-hidden p-3 shadow-lg hover:shadow-2xl transition-shadow duration-300
              justify-center flex-col box-border border rounded-xl flex-1 basis-[calc(25%-50px)]'
              key={item.id}
            >
              <h3 className='font-medium'>{item.name}</h3>
              <h2>{item.price}</h2>
              <img
                src={item.image[0]}
                className='p-3 object-cover transform transition-transform duration-300 hover:scale-110'
                alt={item.name}
                onClick={() => handleClick(item)}
              />
              <div className='flex gap-5'>
                <button
                  onClick={handleScrollToRegister}
                  className='border rounded-md p-2 text-white bg-[#2d63ed] font-medium'
                >
                  Đăng ký lái thử
                </button>
                <button
                  onClick={handleScrollToContact}
                  className='border rounded-md p-2 text-[#2d63ed] border-[#2d63ed] bg-[#fff] font-medium'
                >
                  Liên hệ
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <FormRegister ref={formRef} />
      <Footer ref={contactRef} />
    </div>
  )
}
