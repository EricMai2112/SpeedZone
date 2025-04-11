import React from 'react'
import logo from '../assets/images/logoV.png'
import { NavLink, Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div>
      <div className='fixed top-0 left-0 w-full bg-white shadow-md z-50'>
        <div className='flex justify-between p-5'>
          <div className='flex gap-10 items-center'>
            <img src={logo} alt='' className='h-10' />
            <NavLink to='/' className={({ isActive }) => `font-medium text-l ${isActive ? 'text-[#2d63ed]' : ''}`}>
              Trang chủ
            </NavLink>
            <NavLink
              to='/product'
              className={({ isActive }) => `font-medium text-l ${isActive ? 'text-[#2d63ed]' : ''}`}
            >
              Sản phẩm
            </NavLink>
            <NavLink to='/news' className={({ isActive }) => `font-medium text-l ${isActive ? 'text-[#2d63ed]' : ''}`}>
              Tin tức
            </NavLink>
            <NavLink
              to='/events'
              className={({ isActive }) => `font-medium text-l ${isActive ? 'text-[#2d63ed]' : ''}`}
            >
              Sự kiện
            </NavLink>
            <NavLink
              to='/library'
              className={({ isActive }) => `font-medium text-l ${isActive ? 'text-[#2d63ed]' : ''}`}
            >
              Thư viện
            </NavLink>
          </div>
          <div className='flex gap-5 items-center'>
            <button className='text-xl'>🔍</button>
            <span>|</span>
            <button className='font-medium'>Đăng nhập</button>
            <button className='font-medium bg-[#2d63ed] text-white p-2 pr-4 pl-4 rounded-sm '>Đăng ký</button>
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
