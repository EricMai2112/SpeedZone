import { User } from 'lucide-react'

export default function NewsCard({ image, title, description, author, date, createdAt }) {
  // Format the date if createdAt is provided (from API)
  const formattedDate = createdAt ? formatTimeAgo(new Date(createdAt)) : date

  return (
    <div className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
      <img src={image || '/placeholder.svg'} alt={title} className='w-full h-48 object-cover' />
      <div className='p-4'>
        <h3 className='font-medium text-base mb-2 line-clamp-2 h-12'>{title}</h3>
        <p className='text-sm text-gray-600 mb-4 line-clamp-3 h-16'>{description}</p>
        <div className='flex items-center text-xs text-gray-500'>
          <div className='flex items-center'>
            <div className='w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center mr-1'>
              <User size={12} />
            </div>
            <span className='font-medium'>{author}</span>
          </div>
          <span className='mx-2'>•</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  )
}

// Helper function to format date as "X hours, Y minutes ago" in Vietnamese
function formatTimeAgo(date) {
  const now = new Date()
  const diffInMs = now - date

  const hours = Math.floor(diffInMs / (1000 * 60 * 60))
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60))

  if (hours > 0) {
    return `${hours} giờ, ${minutes} phút trước`
  } else {
    return `${minutes} phút trước`
  }
}
