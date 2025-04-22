import Footer from '../Footer'
// import banner from '../assets/images/bannervf.jpg'
import event1 from '../../assets/images/event1.png'
export default function VinFastLibrary() {
  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Banner mới giống layout slide */}
      <div className='relative w-full h-[80vh]'>
        <img src={event1} alt='VinFast Banner' className='w-full max-h-screen h-[80vh] object-cover bg-gray-900' />
        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent z-0' />
        <div className='absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4'>
          <h1 className='text-white font-bold text-4xl max-w-3xl mb-6'>Chào mừng đến với thư viện ô tô VinFast</h1>
          <div className='w-full max-w-xl'>
            <div className='flex bg-white rounded-full shadow-lg overflow-hidden'>
              <input
                type='text'
                placeholder='Nhập từ khóa tìm kiếm...'
                className='flex-grow px-6 py-3 text-black outline-none rounded-l-full'
              />
              <button className='px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-r-full'>🔍</button>
            </div>
          </div>
        </div>
      </div>

      {/* Thẻ nội dung */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto'>
        {/* Box 1 */}
        <div className='bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300'>
          <h2 className='text-xl font-semibold text-blue-700 mb-3'>Kiến thức ô tô, thị trường ô tô</h2>
          <ul className='text-gray-700 space-y-2 text-sm'>
            <li>• Ngành xe ô tô & kiến thức sản phẩm ô tô</li>
            <li>• Thương hiệu, đối tác và chiến lược của VinFast</li>
          </ul>
          <a href='#' className='text-blue-600 font-medium text-sm mt-4 inline-block hover:underline'>
            XEM THÊM
          </a>
        </div>

        {/* Box 2 */}
        <div className='bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300'>
          <h2 className='text-xl font-semibold text-blue-700 mb-3'>Kiến thức sản phẩm ô tô VinFast</h2>
          <ul className='text-gray-700 space-y-2 text-sm'>
            <li>• Thông số kỹ thuật các mẫu xe và phiên bản</li>
            <li>• Tính năng thông tin giải trí</li>
            <li>• Công nghệ trên xe VinFast</li>
            <li>• Cách sử dụng xe VinFast thông minh, hiệu quả</li>
          </ul>
          <a href='#' className='text-blue-600 font-medium text-sm mt-4 inline-block hover:underline'>
            XEM THÊM
          </a>
        </div>

        {/* Box 3 */}
        <div className='bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300'>
          <h2 className='text-xl font-semibold text-blue-700 mb-3'>Chính sách & dịch vụ ô tô điện</h2>
          <ul className='text-gray-700 space-y-2 text-sm'>
            <li>• Hệ thống Showroom & Nhà phân phối</li>
            <li>• Hệ thống O2O</li>
            <li>• Trạm sạc và Pin</li>
            <li>• Hệ thống xưởng dịch vụ & hậu mãi</li>
          </ul>
          <a href='#' className='text-blue-600 font-medium text-sm mt-4 inline-block hover:underline'>
            XEM THÊM
          </a>
        </div>
      </div>
      <Footer />
    </div>
  )
}
