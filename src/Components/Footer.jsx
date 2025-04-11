import React, { useEffect, useState } from 'react'
import footerbg from '../assets/images/footerbg.png'

export default function Footer() {
  const apiCar = 'https://67e227a797fc65f53534c8a2.mockapi.io/apiTodo/cars'
  const [dataCar, setDataCar] = useState([])

  useEffect(() => {
    fetch(apiCar)
      .then((res) => {
        return res.json()
      })
      .then((data) => setDataCar(data))
  }, [])
  return (
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
  )
}
