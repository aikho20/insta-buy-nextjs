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
import { Minus, MinusCircle, Plus, PlusCircle, Trash2Icon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  addItemCart,
  incrementItemCart,
  decmentItemCart,
  ProductItemProps,
} from '@/store/reducers/storeReducer'
import { RootState } from '@/lib/config/store'

interface CartCardProps {
  _id: string
  title: string
  price: number
  image: string
  value: number
  storeId: string
  isLoading?: boolean

  buttonClick?: () => void
}

export default function CartItem({
  _id,
  title,
  price,
  image,
  storeId,
  isLoading,
  value,
  buttonClick,
}: CartCardProps) {
  const dispatch = useDispatch()
  const add_product_to_cart = ({ _id, title, price }: ProductItemProps) => {
    dispatch(
      addItemCart({
        _id,
        title,
        price,
        image,
        value: 1,
      })
    )
  }
  const increment_product_count = ({ _id }: { _id: string }) => {
    dispatch(
      incrementItemCart({
        _id,
      })
    )
  }
  const decrement_product_count = ({ _id }: { _id: string }) => {
    dispatch(
      decmentItemCart({
        _id,
      })
    )
  }

  return (
    <div className='bg-white flex flex-row rounded-lg hover:bg-slate-100 transition duration-300 p-0 m-0 relative rounded'>
      <div className='bg-slate-100 p-2'>
        {isLoading ? (
          <Skeleton className='w-[60px] h-[60px]' />
        ) : (
          <img src={image} alt='cart-item' className='w-[50px] h-[50px]' />
        )}
      </div>
      <div className='p-2'>
        {!isLoading ? (
          <p className='text-sm font-semibold m-0 truncate'> {title} </p>
        ) : (
          <Skeleton className='w-full h-7' />
        )}
        {!isLoading ? (
          <p className='text-gray-600 mb-0 text-sm'>{`₱${price}`}</p>
        ) : (
          <Skeleton className='w-10 h-5' />
        )}
      </div>

      <div className='flex flex-row shadow-md absolute w-[80px] bottom-1 p-1 bg-white right-2 right-2 gap-2 justify-center items-center rounded-md'>
        <Plus
          className='h-5 w-5 text-gray-600 cursor-pointer'
          onClick={() => increment_product_count({ _id })}
        />
        <p className='text-md text-gray-600'>{value}</p>
        <>
          {value <= 1 ? (
            <Trash2Icon
              className='h-5 w-5 text-red-500 cursor-pointer'
              onClick={() => decrement_product_count({ _id })}
            />
          ) : (
            <Minus
              className='h-5 w-5 text-gray-600 cursor-pointer'
              onClick={() => decrement_product_count({ _id })}
            />
          )}
        </>
      </div>
    </div>
  )
}
