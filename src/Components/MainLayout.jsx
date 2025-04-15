import React, { useEffect } from 'react'
import logo from '../assets/images/logoV.png'
import { NavLink, Outlet } from 'react-router-dom'

export default function MainLayout() {
  useEffect(() => {
    const configScript = document.createElement('script')
    configScript.innerHTML = `
     window.__ow = window.__ow || {};
     window.__ow.organizationId = "f4ab9074-3bac-403a-a607-3436a6198200";
     window.__ow.template_id = "aa16f79d-c6f5-432a-9a7a-1c31a95b9b19";
     window.__ow.integration_name = "manual_settings";
     window.__ow.product_name = "chatbot";
   `
    document.head.appendChild(configScript)

    const widgetScript = document.createElement('script')
    widgetScript.innerHTML = `
     ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[OpenWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.openwidget.com/openwidget.js",t.head.appendChild(n)}};!n.__ow.asyncInit&&e.init(),n.OpenWidget=n.OpenWidget||e}(window,document,[].slice))
   `
    document.head.appendChild(widgetScript)

    return () => {
      document.head.removeChild(configScript)
      document.head.removeChild(widgetScript)
    }
  }, [])

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
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
