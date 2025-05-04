import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Footer from '../Footer'

const fallbackEventsData = {
  1: {
    id: '1',
    name: 'Sự kiện công nghệ 2024',
    description: 'Sự kiện lớn về công nghệ, quy tụ nhiều chuyên gia trong ngành...',
    category: 'Công nghệ',
    pulisher: 'TechHub',
    avatar: 'https://via.placeholder.com/800x400'
  },
  2: {
    id: '2',
    name: 'Ngày hội việc làm',
    description: 'Cơ hội gặp gỡ nhà tuyển dụng hàng đầu.',
    category: 'Việc làm',
    pulisher: 'CareerFair',
    avatar: 'https://via.placeholder.com/800x400'
  }
}

export default function EventsDetail() {
  const { id } = useParams()
  const location = useLocation()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('Debug: useParams id =', id)
    console.log('Debug: location.state =', location.state)

    if (location.state && location.state.event) {
      console.log('Debug: using event from location.state')
      setEvent(location.state.event)
      setLoading(false)
    } else {
      const fetchEventDetail = async () => {
        try {
          console.log('Debug: Fetching from API...')
          const apiUrl = `https://67e227a797fc65f53534c8a2.mockapi.io/apiTodo/events/${id}`
          const response = await fetch(apiUrl)

          if (!response.ok) {
            console.log('Debug: API response not OK:', response.statusText)
            if (fallbackEventsData[id]) {
              setEvent(fallbackEventsData[id])
            } else {
              throw new Error(`Lỗi API: ${response.statusText}`)
            }
          } else {
            const data = await response.json()
            setEvent(data)
          }
        } catch (err) {
          console.error('Debug: fetch error', err)
          if (fallbackEventsData[id]) {
            setEvent(fallbackEventsData[id])
          } else {
            setError(err.message)
          }
        } finally {
          setLoading(false)
        }
      }

      fetchEventDetail()
    }
  }, [id, location.state])

  if (loading) return <div className='text-center mt-20 text-blue-500'>Đang tải dữ liệu...</div>
  if (error) return <div className='text-center mt-20 text-red-500'>{error}</div>
  if (!event) return <div className='text-center mt-20 text-red-500'>Không tìm thấy sự kiện</div>

  return (
    <div className='mt-36'>
      <div className='flex flex-col md:flex-row justify-between m-8 md:m-20 gap-10'>
        <img
          src={event.image || 'https://via.placeholder.com/800x400'}
          alt={event.name}
          className='w-full md:w-2/4 object-cover rounded-lg h-64 md:h-auto shadow-md'
        />

        <div className='flex flex-col gap-6 border p-6 w-full md:w-2/4 rounded-lg shadow-lg bg-white'>
          <h2 className='font-medium text-2xl text-center'>{event.title}</h2>

          <div className='flex flex-col md:flex-row justify-between gap-4'>
            <span className='text-gray-500 text-sm'>Nội dung {event.content || 'Sự kiện'}</span>
          </div>

          <div className='prose max-w-none'>
            <p className='text-gray-700 leading-relaxed'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
            <p className='text-gray-700 mt-4 leading-relaxed'>{event.content || event.description}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
