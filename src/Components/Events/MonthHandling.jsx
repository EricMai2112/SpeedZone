import { ChevronDown } from 'lucide-react'

export default function MonthHeading({ month, year }) {
  return (
    <div className='container mx-auto px-4 py-6'>
      <div className='flex items-center'>
        <ChevronDown className='h-4 w-4 transform rotate-90 mr-2' />
        <h2 className='text-lg font-medium'>
          Tháng {month}, {year}
        </h2>
      </div>
    </div>
  )
}
