import React, { forwardRef, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

const FormRegister = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    emailjs
      .send('service_et824kr', 'template_qf5kps6', formData, '2nlsApfBAPp7XzK6W')
      .then(() => {
        alert('Gửi thành công!')
        setFormData({ name: '', phone: '', email: '' })
      })
      .catch((error) => {
        console.error('Lỗi khi gửi:', error)
        alert('Đã có lỗi xảy ra')
      })
  }

  return (
    <div ref={ref} className='bg-[#f6f9f8] p-10 flex flex-col justify-center items-center'>
      <h1 className='text-center font-medium text-3xl p-10 italic'>ĐĂNG KÝ NHẬN TƯ VẤN</h1>
      <span className='italic'>Đăng ký ngay để có thể nhận thông tin về các ưu đãi và sự kiện hấp dẫn</span>
      <form onSubmit={handleSubmit} className='mt-5 flex flex-col gap-2'>
        <input
          type='text'
          className='p-3 w-96 rounded-sm'
          placeholder='Họ và tên'
          value={formData.name}
          name='name'
          onChange={handleChange}
          required
        />
        <input
          type='text'
          className='p-3 w-96 rounded-sm'
          placeholder='Nhập số điện thoại'
          value={formData.phone}
          onChange={handleChange}
          name='phone'
          required
        />
        <input
          type='text'
          className='p-3 w-96 rounded-sm'
          placeholder='Email'
          value={formData.email}
          name='email'
          onChange={handleChange}
          required
        />
        <button className='border p-3 rounded-lg bg-[#2d63ed] text-white font-medium text-xs'>ĐĂNG KÝ</button>
      </form>
    </div>
  )
})

export default FormRegister
