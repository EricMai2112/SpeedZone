import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Footer from '../Footer'

// Dữ liệu tĩnh dự phòng khi không có state
const fallbackNewsData = {
  1: {
    id: '1',
    title: 'Tin tức mới về công nghệ',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
    author: 'Nguyễn Văn A',
    image: 'https://via.placeholder.com/800x400'
  },
  2: {
    id: '2',
    title: 'Xu hướng thời trang mùa hè',
    content:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Trần Thị B',
    image: 'https://via.placeholder.com/800x400'
  },
  3: {
    id: '3',
    title: 'Ẩm thực Việt Nam được vinh danh',
    content:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    author: 'Lê Văn C',
    image: 'https://via.placeholder.com/800x400'
  }
}

export default function NewsDetail() {
  const { id } = useParams()
  const location = useLocation()
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Thử lấy dữ liệu từ state của react-router
    if (location.state && location.state.article) {
      setNews(location.state.article)
      setLoading(false)
    } else {
      // Nếu không có state, thử fetch từ API
      const fetchNewsDetail = async () => {
        try {
          // Hiển thị URL đang gọi để debug
          const apiUrl = `https://67f85e102466325443ec7f89.mockapi.io/news/${id}`
          console.log('Đang gọi API:', apiUrl)

          const response = await fetch(apiUrl)
          console.log('Trạng thái response:', response.status)

          if (!response.ok) {
            console.error('Lỗi API:', response.status, response.statusText)
            // Nếu API không thành công, dùng dữ liệu tĩnh
            if (fallbackNewsData[id]) {
              setNews(fallbackNewsData[id])
            } else {
              throw new Error(`API trả về lỗi: ${response.status} ${response.statusText}`)
            }
          } else {
            const data = await response.json()
            console.log('Dữ liệu nhận được:', data)
            setNews(data)
          }
        } catch (error) {
          console.error('Lỗi khi fetch dữ liệu:', error.message)
          // Nếu có lỗi trong quá trình fetch, thử dùng dữ liệu tĩnh
          if (fallbackNewsData[id]) {
            console.log('Sử dụng dữ liệu fallback do lỗi fetch')
            setNews(fallbackNewsData[id])
          } else {
            setError(`Không thể lấy dữ liệu: ${error.message}`)
          }
        } finally {
          setLoading(false)
        }
      }

      fetchNewsDetail()
    }
  }, [id, location.state])

  if (loading) {
    return <div className='text-center mt-20 text-blue-500'>Đang tải dữ liệu...</div>
  }

  if (error) {
    return <div className='text-center mt-20 text-red-500'>{error}</div>
  }

  if (!news) {
    return <div className='text-center mt-20 text-red-500'>Không tìm thấy bài viết</div>
  }

  return (
    <div className='mt-36'>
      <div className='flex flex-col md:flex-row justify-between m-8 md:m-20 gap-10'>
        <img
          src={news.avatar || news.image || 'https://via.placeholder.com/800x400'}
          alt={news.title}
          className='w-full md:w-2/4 object-cover rounded-lg h-64 md:h-auto shadow-md'
        />

        <div className='flex flex-col gap-6 border p-6 w-full md:w-2/4 rounded-lg shadow-lg bg-white'>
          <h2 className='font-medium text-2xl text-center'>{news.title || news.name}</h2>

          <div className='flex flex-col md:flex-row justify-between gap-4'>
            <span className='text-gray-500 text-sm'>Chuyên mục: {news.category || 'Tin tức'}</span>
            <span className='text-gray-500 text-sm'>Tác giả: {news.author || news.pulisher || 'Không xác định'}</span>
          </div>

          <div className='prose max-w-none'>
            <p className='text-gray-700 leading-relaxed'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
            <p className='text-gray-700 mt-4 leading-relaxed'>{news.content || news.description}</p>
          </div>

          {/* <div className='mt-4 text-sm text-gray-500 flex justify-between'>
            <span>Ngày đăng: {news.date || 'Không xác định'}</span>
            <span>Lượt xem: {news.views || '0'}</span>
          </div> */}
        </div>
      </div>

      <Footer />
    </div>
  )
}
