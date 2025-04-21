'use client'

import { Grid, List } from 'lucide-react'

export default function NewsHeader({ viewMode, setViewMode }) {
  return (
    <div className='container mx-auto px-4 py-6 relative'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-medium text-gray-800'>Tin tức</h1>
        <div className='flex space-x-2'>
          <button
            className={`p-2 ${viewMode === 'grid' ? 'text-blue-600' : 'text-gray-400'}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid size={20} />
          </button>
          <button
            className={`p-2 ${viewMode === 'list' ? 'text-blue-600' : 'text-gray-400'}`}
            onClick={() => setViewMode('list')}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Background Text */}
      <div className='absolute top-0 right-0 text-gray-100 text-7xl font-bold tracking-widest opacity-20 pointer-events-none'>
        VINFAST
      </div>
    </div>
  )
}
