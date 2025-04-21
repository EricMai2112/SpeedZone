import NewsCard from './NewsCard'

export default function NewsGrid({ newsItems, viewMode }) {
  return (
    <div className='container mx-auto px-4 py-4'>
      <div
        className={`grid grid-cols-1 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-1'} gap-6`}
      >
        {newsItems.map((item) => (
          <NewsCard
            key={item.id}
            image={item.avatar || item.image}
            title={item.title || item.name}
            description={item.description || item.content}
            author={item.author || 'Admin'}
            createdAt={item.createdAt}
            date={item.date}
          />
        ))}
      </div>
    </div>
  )
}
