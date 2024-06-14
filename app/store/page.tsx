'use client'

'use client'

import { useGetProductMutation } from '@/store/action/productAction'
import ProductCard from '@/components/ui/product-card'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { useGetStoreMutation } from '@/store/action/storeAction'

interface StoreProps {
  searchParams: {
    storeId: string
  }
}

export default function Store({ searchParams: { storeId } }: StoreProps) {
  const { data: session } = useSession()
  const [getProduct, { data: productData, isLoading: isFetchingProduct }] = useGetProductMutation()
  const [getStore, { data: storeData, isLoading: isFetchingStore }] = useGetStoreMutation()
  const router = useRouter()

  useEffect(() => {
    getProduct({ merchantId: storeId })
    getStore({ merchantId: storeId })
  }, [storeId])
  const product = useMemo(
    () =>
      isFetchingProduct ? Array(productData?.product?.length || 10).fill({}) : productData?.product,
    [isFetchingProduct, productData?.product]
  )
  return (
    <div className={`grid grid-cols-6 gap-0 p-2 flex-1 min-h-screen`}>
      <div className={`flex-1 col-span-1 p-3 flex flex-col gap-2`}>
        <p className='text-lg text-bold'>Filters</p>
        <div className='flex flex-col gap-2 mx-2'>
          {['Drinks', 'Fries', 'Burger'].map((items, index) => (
            <p className='text-sm cursor-pointer text-gray-600'>{items}</p>
          ))}
        </div>
      </div>
      <div className='flex-1 col-span-4 p-3'>
        <div className='w-full h-[300px] bg-slate-100 my-2'></div>
        <div className='grid lg:grid-cols-5 gap-2 md:grid-cols-3 sm:grid-cols-2'>
          {product?.map((item: any, index: number) => (
            <div key={index} className='w-full'>
              <ProductCard
                title={item?.productName}
                isLoading={isFetchingProduct}
                description={item?.description}
                image={item?.images?.[0]}
                price={item?.price?.$numberDecimal}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='col-span-1 p-3 flex-col gap-2 shadow-lg flex flex-1 min-h-full '>
        <p className='text-bold text-center'>Your Cart</p>
      </div>
    </div>
  )
}
