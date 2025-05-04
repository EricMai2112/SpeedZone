import { useEffect, useRef, useState } from 'react'
import event1 from '../../assets/images/event1.png'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom'

export default function Events() {
  const apiNews = 'https://67e227a797fc65f53534c8a2.mockapi.io/apiTodo/events'
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredEvents, setFilteredEvents] = useState([])

  const navigate = useNavigate()
  const formRef = useRef(null)

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('https://67e227a797fc65f53534c8a2.mockapi.io/apiTodo/events')
        if (!res.ok) throw new Error('Lỗi khi tải dữ liệu sự kiện')
        const data = await res.json()
        setEvents(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Filter events based on search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredEvents(events)
    } else {
      const filtered = events.filter(
        (event) =>
          (event.title && event.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (event.content && event.content.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      setFilteredEvents(filtered)
    }
  }, [searchQuery, events])

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    navigate(`/event/${event.id}`, { state: { event } })
  }

  const handleViewMore = (event, e) => {
    e.preventDefault()
    e.stopPropagation()
    handleEventClick(event)
  }

  const groupEventsByMonth = (events) => {
    const grouped = {}

    events.forEach((event) => {
      const date = new Date(event.date)
      if (isNaN(date)) return

      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const key = `${month}-${year}`

      if (!grouped[key]) {
        grouped[key] = { month, year, events: [] }
      }
      grouped[key].events.push(event)
    })

    return Object.values(grouped).sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year
      return b.month - a.month
    })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    if (isNaN(date)) return '??.??'
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`
  }

  const groupedEvents = groupEventsByMonth(filteredEvents)

  return (
    <div className='min-h-screen bg-white'>
      <div className='relative bg-gray-100 py-12'>
        <div className='container mx-auto px-4 flex flex-col md:flex-row items-center'>
          <div className='md:w-1/2 mb-8 md:mb-0'>
            <h1 className='text-3xl md:text-4xl font-bold mb-4'>VinFast Events</h1>
            <p className='text-gray-600 mb-6'>
              Discover the latest events and news from VinFast. Join us at our upcoming events and be part of the
              VinFast community.
            </p>
            <div className='relative max-w-md'>
              <input
                type='text'
                placeholder='Tìm sự kiện'
                className='w-full py-2 px-4 pr-10 border rounded-md outline-none'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className='w-full md:w-1/2 flex justify-center p-4'>
            <img src={event1 || '/placeholder.svg'} alt='VinFast Events' className='w-full h-auto rounded-md shadow' />
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        {loading ? (
          <div className='text-center py-12'>
            <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent'></div>
            <p className='mt-2 text-gray-600'>Đang tải dữ liệu...</p>
          </div>
        ) : error ? (
          <div className='text-center py-12'>
            <p className='text-red-500'>Có lỗi xảy ra: {error}</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-600'>Không tìm thấy sự kiện nào.</p>
          </div>
        ) : (
          groupedEvents.map((group, groupIndex) => (
            <div key={groupIndex} className='mb-12'>
              <div className='flex items-center mb-6'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 transform rotate-90 mr-2'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                </svg>
                <h2 className='text-xl font-medium'>
                  Tháng {group.month}, {group.year}
                </h2>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {group.events.map((event) => (
                  <div
                    key={event.id}
                    className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-300'
                    onClick={() => handleEventClick(event)}
                  >
                    <div className='relative h-48'>
                      <img
                        src={event.image || '/placeholder.svg'}
                        alt={event.title}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='p-4'>
                      <div className='bg-teal-500 text-white text-xs inline-block px-2 py-1 rounded mb-2'>
                        Th {group.month}
                      </div>
                      <h3 className='font-medium text-sm mb-1'>{event.title || 'Không tiêu đề'}</h3>
                      {event.content && <p className='text-xs text-gray-600 mb-2 line-clamp-2'>{event.content}</p>}
                      <div className='flex items-center justify-between text-xs text-gray-500'>
                        <span>{formatDate(event.date)}</span>
                        <button
                          onClick={(e) => handleViewMore(event, e)}
                          className='bg-blue-500 text-white px-5 py-2 rounded text-base font-medium hover:bg-blue-600 inline-block text-center'
                        >
                          Xem thêm
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  )
}
