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
import { DeleteIcon, Minus, MinusCircle, Plus, PlusCircle, Trash, Trash2Icon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addItemCart, incrementItemCart, decmentItemCart } from '@/store/reducers/storeReducer'
import { RootState } from '@/lib/config/store'

interface ProductCardProps {
  _id: string
  title: string
  discount?: string
  description?: string
  price: number
  storeId: string
  image: string
  buttonLabel?: string
  isLoading?: boolean
  value: number
  buttonClick?: () => void
}

export default function ProductCard({
  _id,
  title,
  discount,
  storeId,
  description,
  price,
  image,
  isLoading,
  value,
  buttonClick,
}: ProductCardProps) {
  const dispatch = useDispatch()

  const add_product_to_cart = async ({
    _id,
    title,
    price,
    image,
    value,
  }: {
    _id: string
    title: string
    price: number
    image: string
    value: number
  }) => {
    await dispatch(
      addItemCart({
        _id,
        title,
        price,
        image,
        value: value + 1,
      })
    )
  }
  const increment_product_count = async ({ _id, value }: { _id: string; value: number }) => {
    const data = await dispatch(
      incrementItemCart({
        _id,
      })
    )
  }
  const decrement_product_count = async ({ _id, value }: { _id: string; value: number }) => {
    await dispatch(
      decmentItemCart({
        _id,
      })
    )
  }

  return (
    <Card className='bg-white flex flex-col max-h-sm max-w-100 rounded-lg hover:shadow-lg transition duration-300 p-0 m-0'>
      <CardHeader className='relative bg-slate-100'>
        {isLoading ? (
          <Skeleton className='w-full h-[100px]' />
        ) : (
          <img src={image} alt='Product Image' className='w-full h-[120px] bg-contain bg-center' />
        )}

        {value > 0 ? (
          <div className='flex flex-row-reverse  absolute bottom-2 left-0 right-0  items-center justify-center'>
            <div className='rounded-md w-[100px] flex flex-row gap-2  p-2 items-center justify-center bg-white shadow-md'>
              <Plus
                className='h-5 w-5 text-gray-600 cursor-pointer'
                onClick={() => increment_product_count({ _id, value })}
              />
              <p className='text-md text-gray-600'>{value}</p>
              <>
                {value <= 1 ? (
                  <Trash2Icon
                    className='h-5 w-5 text-red-500 cursor-pointer'
                    onClick={() => decrement_product_count({ _id, value })}
                  />
                ) : (
                  <Minus
                    className='h-5 w-5 text-gray-600 cursor-pointer'
                    onClick={() => decrement_product_count({ _id, value })}
                  />
                )}
              </>
            </div>
          </div>
        ) : (
          <>
            {!isLoading && (
              <div
                className='flex flex-row shadow-md absolute bottom-3 p-2 bg-white right-2 gap-2 rounded-full'
                onClick={() => add_product_to_cart({ _id, title, price, image, value })}
              >
                <Plus className='h-5 w-5 text-gray-600' />
              </div>
            )}
          </>
        )}
      </CardHeader>
      <CardContent className='p-4'>
        {!isLoading ? (
          <p className='text-md font-semibold mb-2 truncate'>{title} </p>
        ) : (
          <Skeleton className='w-full h-7 my-1' />
        )}

        {!isLoading ? (
          <p className='text-gray-400 mb-4 truncate text-sm'>{description} </p>
        ) : (
          <Skeleton className='w-full h-6 my-1' />
        )}

        {!isLoading ? (
          <p className='text-gray-600 my-1'>{`₱${price}`} </p>
        ) : (
          <Skeleton className='w-10 h-5' />
        )}
      </CardContent>
    </Card>
  )
}
