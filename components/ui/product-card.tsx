import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from './button'
import { Skeleton } from './skeleton'
import { Minus, MinusCircle, Plus, PlusCircle } from 'lucide-react'

interface ProductCardProps {
  title?: string
  discount?: string
  description?: string
  price?: number
  image?: string
  buttonLabel?: string
  isLoading?: boolean
  buttonClick?: () => void
}

export default function ProductCard({
  title,
  discount,
  description,
  price,
  image,
  buttonLabel,
  isLoading,
  buttonClick,
}: ProductCardProps) {
  return (
    <Card className='bg-white flex flex-col max-h-sm max-w-100 rounded-lg hover:shadow-lg transition duration-300 p-0 m-0'>
      <CardHeader className='relative bg-slate-100'>
        {isLoading ? (
          <Skeleton className='w-full h-[100px]' />
        ) : (
          <img src={image} alt='Product Image' className='w-full h-[120px] bg-contain bg-center' />
        )}

        {false ? (
          <div className='flex flex-row shadow-md absolute bottom-3 p-2 bg-white left-2 right-2 gap-3 justify-center items-center rounded-md'>
            <Plus className='h-6 w-6 text-gray-600' />
            <p className='text-md text-gray-700'>0</p>
            <Minus className='h-6 w-6 text-gray-600' />
          </div>
        ) : (
          <div className='flex flex-row shadow-md absolute bottom-3 p-2 bg-white right-2 gap-2 justify-center items-center rounded-full'>
            <Plus className='h-6 w-6 text-gray-600' />
          </div>
        )}
      </CardHeader>
      <CardContent className='p-4'>
        <CardTitle className='text-md font-semibold mb-2 truncate'>
          {!isLoading ? title : <Skeleton className='w-full h-7' />}
        </CardTitle>
        <CardDescription className='text-gray-400 mb-4 truncate text-sm'>
          {!isLoading ? description : <Skeleton className='w-full h-6' />}
        </CardDescription>
        <p className='text-gray-600 mb-2'>
          {!isLoading ? `P${price}` : <Skeleton className='w-10 h-5' />}
        </p>
      </CardContent>
    </Card>
  )
}
