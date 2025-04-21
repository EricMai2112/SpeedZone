import ArticleCard from './ArticleCard'

export default function ArticleGrid({ articles, loading, error }) {
  if (loading) {
    return (
      <div className='container mx-auto px-4 py-10 text-center'>
        <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent'></div>
        <p className='mt-2 text-gray-600'>Đang tải dữ liệu...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='container mx-auto px-4 py-10 text-center'>
        <p className='text-red-500'>Có lỗi xảy ra: {error}</p>
      </div>
    )
  }

  if (!articles || articles.length === 0) {
    return (
      <div className='container mx-auto px-4 py-10 text-center'>
        <p className='text-gray-600'>Không có sự kiện nào.</p>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 pb-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {articles.map((article) => {
          // Extract month from the createdAt date
          const createdDate = new Date(article.createdAt)
          const month = createdDate.getMonth() + 1 // JavaScript months are 0-indexed

          // Format the date as DD.MM
          const formattedDate = `${createdDate.getDate().toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}`

          return (
            <ArticleCard
              key={article.id}
              image={article.avatar || '/placeholder.svg?height=200&width=400'}
              month={month}
              title={article.name}
              description={article.description}
              date={formattedDate}
              views={article.views || Math.floor(Math.random() * 1000) + 100}
            />
          )
        })}
      </div>
    </div>
  )
}
