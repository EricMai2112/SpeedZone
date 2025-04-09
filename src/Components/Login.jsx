import React from 'react'

export default function Login() {
  return (
    <div className='flex'>
      <div>
        <img src='/images/vf9.png' className='w-30' />
      </div>
      <div className='flex flex-col justify-center items-center'>
        <img src='/images/logoV.png' className='w-25' />
        <h1 className='font-bold text-2xl'>Đăng nhập / Login</h1>
        <input type='text' placeholder='Email' />
        <input type='text' placeholder='Mật khẩu / Password' />
        <button className=''>ĐĂNG NHẬP / LOGIN</button>
      </div>
    </div>
  )
}
