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
          const response = await fetch(`https://67f85e102466325443ec7f89.mockapi.io/news/${id}`)
          if (!response.ok) {
            // Nếu API không thành công, dùng dữ liệu tĩnh
            if (fallbackNewsData[id]) {
              setNews(fallbackNewsData[id])
            } else {
              throw new Error('Không thể lấy dữ liệu bài viết')
            }
          } else {
            const data = await response.json()
            setNews(data)
          }
        } catch (error) {
          // Nếu có lỗi trong quá trình fetch, thử dùng dữ liệu tĩnh
          if (fallbackNewsData[id]) {
            setNews(fallbackNewsData[id])
          } else {
            setError('Không tìm thấy bài viết. Vui lòng kiểm tra lại ID.')
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
      <div className='flex flex-col md:flex-row justify-between m-8 md:m-40 gap-10'>
        <img
          src={news.avatar || news.image || 'https://via.placeholder.com/800x400'}
          alt={news.title}
          className='w-full md:w-2/4 object-cover rounded-lg h-64 md:h-auto'
        />
        <div className='flex flex-col gap-10 border p-4 w-full md:w-2/4 rounded-lg shadow-lg'>
          <h2 className='font-medium text-2xl text-center'>{news.title || news.name}</h2>
          <div className='flex justify-between'>
            <span>Nội dung</span>
            <span>{news.author || news.pulisher}</span>
          </div>
          <div className='mt-4'>
            <p>{news.content || news.description}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
