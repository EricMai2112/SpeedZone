import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import Footer from '../Footer'

export default function EventsDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  // Use event from state if available to avoid unnecessary API call
  const [event, setEvent] = useState(location.state?.event || null)
  const [loading, setLoading] = useState(!location.state?.event)
  const [error, setError] = useState(null)

  const apiUrl = `https://67e227a797fc65f53534c8a2.mockapi.io/apiTodo/events/${id}`

  useEffect(() => {
    // If event is already in state, skip API call
    if (event) return

    const fetchEvent = async () => {
      try {
        setLoading(true)
        const response = await fetch(apiUrl)
        if (!response.ok) throw new Error(`API responded with status: ${response.status}`)
        const data = await response.json()
        setEvent(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching event:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchEvent()
  }, [apiUrl, event])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    if (isNaN(date)) return '--.--.----'
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`
  }

  return (
    <div className='min-h-screen bg-white'>
      <div className='container mx-auto px-4 py-8 mt-12'>
        {loading ? (
          <div className='text-center py-12'>
            <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent'></div>
            <p className='mt-2 text-gray-600'>Đang tải dữ liệu...</p>
          </div>
        ) : error ? (
          <div className='text-center py-12'>
            <p className='text-red-500'>Có lỗi xảy ra: {error}</p>
            <button
              onClick={() => navigate('/events')}
              className='mt-4 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600'
            >
              Quay lại trang sự kiện
            </button>
          </div>
        ) : !event ? (
          <div className='text-center py-12'>
            <p className='text-gray-600'>Không tìm thấy sự kiện.</p>
            <button
              onClick={() => navigate('/events')}
              className='mt-4 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600'
            >
              Quay lại trang sự kiện
            </button>
          </div>
        ) : (
          <>
            <div className='mb-6'>
              <button
                onClick={() => navigate('/events')}
                className='flex items-center text-teal-600 hover:text-teal-800'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 mr-1'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                </svg>
                Quay lại danh sách sự kiện
              </button>
            </div>

            <div className='flex flex-col md:flex-row justify-between gap-10'>
              <div className='relative w-full md:w-1/2'>
                <img
                  src={event.image || '/placeholder.svg'}
                  alt={event.title}
                  className='w-full h-64 md:h-auto object-cover rounded-lg shadow-md'
                />
              </div>

              <div className='flex flex-col gap-6 border p-6 w-full md:w-1/2 rounded-lg shadow-lg bg-white'>
                <h1 className='text-2xl md:text-3xl font-bold'>{event.title}</h1>

                <div className='flex items-center text-sm text-gray-500 mb-4'>
                  <span className='mr-4'>Ngày: {formatDate(event.date)}</span>
                  <span>{event.views || Math.floor(Math.random() * 1000) + 100} lượt xem</span>
                </div>

                <div className='prose max-w-none'>
                  <p className='text-gray-700 mb-6'>{event.description}</p>

                  {/* Hiển thị nội dung chi tiết nếu có */}
                  {event.content && (
                    <div className='mt-6'>
                      <p className='text-gray-700 whitespace-pre-line'>{event.content}</p>
                    </div>
                  )}
                </div>

                {/* Thông tin sự kiện */}
                <div className='mt-6 bg-gray-50 p-4 rounded-md'>
                  <h3 className='font-medium mb-2'>Thông tin sự kiện</h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <p className='text-sm font-medium text-gray-500'>Địa điểm</p>
                      <p className='text-sm'>{event.location || 'Chưa cập nhật'}</p>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-500'>Thời gian</p>
                      <p className='text-sm'>{formatDate(event.date)}</p>
                    </div>
                    {event.organizer && (
                      <div>
                        <p className='text-sm font-medium text-gray-500'>Tổ chức bởi</p>
                        <p className='text-sm'>{event.organizer}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Nút đăng ký tham dự nếu có */}
                {event.registration && (
                  <div className='mt-6'>
                    <a
                      href={event.registration}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-block bg-teal-500 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-600 transition-colors'
                    >
                      Đăng ký tham dự
                    </a>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}
