import { useState, useEffect } from 'react'
import vf9 from '../../assets/images/vf8.png'
import Footer from '../Footer'
import NewsGrid from './NewsGrid'

export default function News() {
  const [viewMode, setViewMode] = useState('grid')
  const [newsItems, setNewsItems] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([]) // ✅ thêm state này
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://67f85e102466325443ec7f89.mockapi.io/news')

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`)
        }

        const data = await response.json()
        setNewsItems(data)
        setFilteredEvents(data) // ✅ hiển thị mặc định toàn bộ tin tức
        setLoading(false)
      } catch (err) {
        console.error('Error fetching news:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredEvents(newsItems)
    } else {
      const filtered = newsItems.filter(
        (event) =>
          (event.title && event.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (event.content && event.content.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      setFilteredEvents(filtered)
    }
  }, [searchQuery, newsItems])

  return (
    <div className='min-h-screen bg-white'>
      <div className='relative bg-gray-100 py-12'>
        <div className='container mx-auto px-4 flex flex-col md:flex-row items-center'>
          <div className='md:w-1/2 mb-8 md:mb-0'>
            <h1 className='text-3xl md:text-4xl font-bold mb-4'>VinFast News</h1>
            <p className='text-gray-600 mb-6'>
              Discover the latest news and news from VinFast. Join us at our upcoming news and be part of the VinFast
              community.
            </p>
            <div className='relative max-w-md'>
              <input
                type='text'
                placeholder='Tìm tin tức'
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
          <div className='md:w-1/2 flex justify-center'>
            <img src={vf9 || '/placeholder.svg'} alt='VinFast VF9' className='max-w-full h-auto' />
          </div>
        </div>
      </div>

      {loading ? (
        <div className='container mx-auto px-4 py-12 text-center'>
          <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent'></div>
          <p className='mt-4 text-gray-600'>Đang tải tin tức...</p>
        </div>
      ) : error ? (
        <div className='container mx-auto px-4 py-12 text-center'>
          <div className='bg-red-50 p-4 rounded-md'>
            <p className='text-red-600'>Có lỗi xảy ra: {error}</p>
            <button
              className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
              onClick={() => window.location.reload()}
            >
              Thử lại
            </button>
          </div>
        </div>
      ) : filteredEvents.length === 0 ? ( // ✅ dùng filteredEvents thay vì newsItems
        <div className='container mx-auto px-4 py-12 text-center'>
          <p className='text-gray-600'>Không có tin tức nào.</p>
        </div>
      ) : (
        <NewsGrid newsItems={filteredEvents} viewMode={viewMode} /> // ✅ dùng danh sách đã lọc
      )}
      <Footer />
    </div>
  )
}
