import React, { useState } from 'react'
import bgLogin from '../assets/images/vf9.png'
import logoV from '../assets/images/logoV.png'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = () => {
    if (email === 'admin' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true')
      window.location.href = '/'
    } else {
      alert('Sai thông tin đăng nhập!')
    }
  }

  return (
    <div className='flex h-screen bg-gray-100'>
      <div className='w-1/2 hidden md:block'>
        <img src={bgLogin} alt='VinFast Car' className='w-full h-full object-cover' />
      </div>

      <div className='w-full md:w-1/2 flex items-center justify-center p-8'>
        <div className='max-w-md w-full'>
          <div className='flex justify-center mb-6'>
            <img src={logoV} alt='VinFast Logo' className='h-12' />
          </div>

          <h2 className='text-xl font-semibold text-center mb-6'>Đăng nhập/Login</h2>

          <div className='space-y-4'>
            <input
              type='text'
              placeholder='Tên đăng nhập/Username'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
              type='password'
              placeholder='Mật khẩu/Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button onClick={handleLogin} className='w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700'>
              ĐĂNG NHẬP/LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
