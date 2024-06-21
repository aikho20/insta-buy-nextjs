'use client'

import ProductCard from '@/components/ui/product-card'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import {
  useAddToCartMutation,
  useGetStoreCartMutation,
  useGetStoreMutation,
  useGetStoreProductMutation,
} from '@/store/action/storeAction'
import { RootState } from '@/lib/config/store'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from '@/components/ui/cart-item'
import { Button } from '@/components/ui/button'
import { StoreIcon } from 'lucide-react'
import { ProductItemProps, getStoreState, setCartItems } from '@/store/reducers/storeReducer'

interface StoreProps {
  searchParams: {
    storeId: string
  }
}

export default function Store({ searchParams: { storeId } }: StoreProps) {
  const store = useSelector(getStoreState)
  const dispatch = useDispatch()
  const [getStoreCart, { data: cartItems, isLoading: isFetchingCart }] = useGetStoreCartMutation()
  const [addToCart, { isLoading: isAddingToStroreCart }] = useAddToCartMutation()
  const [getStoreProduct, { data: productData, isLoading: isFetchingProduct }] =
    useGetStoreProductMutation()
  //const [getStore, { data: storeData, isLoading: isFetchingStore }] = useGetStoreMutation()

  const getCart = async ({ merchantId }: { merchantId: string }) => {
    const myCart = await getStoreCart({ merchantId }).unwrap()
    dispatch(setCartItems(myCart))
  }
  const updateCart = async ({ merchant, product }: { merchant: string; product: any }) => {
    await addToCart({ merchant: merchant, product })
  }

  useEffect(() => {
    getStoreProduct({
      merchantId: storeId,
    })
    getCart({ merchantId: storeId })
  }, [storeId])

  useEffect(() => {
    updateCart({ merchant: storeId, product: store?.cart })
  }, [storeId, store?.cart])

  let total: number = store?.cart?.reduce((acc: number, item: ProductItemProps) => {
    return acc + item.price * item.value
  }, 0)

  const product = useMemo(
    () => (isFetchingProduct ? Array(10).fill({}) : productData?.product),
    [isFetchingProduct, productData?.product]
  )
  return (
    <div className={`grid grid-cols-7 gap-0 p-2 flex-1 h-[100vh] relative`}>
      <div className={`flex-1 col-span-1 p-3 flex flex-col gap-2 hidden md:block`}>
        <p className='text-lg text-bold'>Filters</p>
        <div className='flex flex-col gap-2 mx-2'>
          {['Drinks', 'Fries', 'Burger'].map((items, index) => (
            <p className='text-sm cursor-pointer text-gray-600' key={index}>
              {items}
            </p>
          ))}
        </div>
      </div>
      <div className='flex-1 lg:col-span-4 p-3 md:col-span-6 col-span-7'>
        <div className='w-full h-[300px] bg-slate-100 my-2'></div>
        <div className='grid lg:grid-cols-4 gap-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-2'>
          {product?.map((item: any, index: number) => (
            <div key={index} className='w-full'>
              <ProductCard
                _id={item._id}
                title={item?.productName}
                storeId={storeId}
                value={store?.cart?.find((list: any) => list._id === item._id)?.value || 0}
                isLoading={isFetchingProduct}
                description={item?.description}
                image={item?.images?.[0]}
                price={item?.price}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='col-span-2 h-full relative hidden lg:block'>
        <div className='sticky top-20 h-100 flex flex-col w-100 p-3'>
          <p className='text-bold text-center'>Your Cart</p>

          <div className='overflow-auto h-[79vh] w-100 py-5 '>
            {store?.cart?.length ? (
              store?.cart?.map((item, index) => (
                <div className='my-2' key={index}>
                  <CartItem
                    title={item.title}
                    price={item.price}
                    _id={item._id}
                    image={item.image}
                    value={item.value}
                    storeId={storeId}
                  />
                </div>
              ))
            ) : (
              <div className='flex flex-col h-[100%] items-center justify-center py-5 overflow-auto w-100 '>
                <StoreIcon className='h-6 w-6 text-gray-400' />
                <p className='text-gray-400 text-sm '>No items to your cart.</p>
              </div>
            )}
          </div>

          <div className='absolute top-[80vh] w-full bg-white p-3 flex items-center flex-col righ-5'>
            <div className='grid grid-cols-2 w-full'>
              <p className='cols-span-1 text-md text-bold'>Total:</p>
              <p className='cols-span-1 text-sm text-end'>₱{total}</p>
            </div>

            <Button
              className='text-lg rounded align-center align-center my-4'
              size={'lg'}
              disabled={!store?.cart?.length}
            >
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
