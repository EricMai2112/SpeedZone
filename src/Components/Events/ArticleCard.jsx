import Image from 'next/image'

export default function ArticleCard({ image, month, title, date, views, description }) {
  return (
    <div className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
      <div className='relative h-48'>
        <Image src={image || '/placeholder.svg?height=200&width=400'} alt={title} fill className='object-cover' />
      </div>
      <div className='p-4'>
        <div className='bg-teal-500 text-white text-xs inline-block px-2 py-1 rounded mb-2'>Th {month}</div>
        <h3 className='font-medium text-sm mb-2'>{title}</h3>
        {description && <p className='text-xs text-gray-600 mb-2 line-clamp-2'>{description}</p>}
        <div className='flex items-center text-xs text-gray-500'>
          <span className='mr-4'>{date}</span>
          <span>{views} views</span>
        </div>
      </div>
    </div>
  )
}
