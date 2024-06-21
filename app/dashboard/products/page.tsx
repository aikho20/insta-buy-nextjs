'use client'

import ProductForm from '@/components/forms/product-form'
import React, { useEffect, useMemo, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Pencil2Icon, PlusCircledIcon } from '@radix-ui/react-icons'
import { useToggle } from '@/hooks/useToggle'
import { useGetStoreProductMutation } from '@/store/action/storeAction'
import { useSession } from 'next-auth/react'
import CustomTable from '@/components/ui/custom-table'
import { ADD_PRODUCT, PRODUCT_COLUMNS, REMOVE_PRODUCT, UPDATE_PRODUCT } from '@/utils/data'
import { DeleteIcon, Trash2Icon } from 'lucide-react'
import { ProductInitialValue } from '@/utils/validation/initialValues'

function Products() {
  const [myCol, setMyCol] = useState<any>(PRODUCT_COLUMNS)
  const { data: session } = useSession()
  const [value, toggle, setValue] = useToggle()
  const [getStoreProduct, { data: productData, isLoading: isFetchingProduct }] =
    useGetStoreProductMutation()

  useEffect(() => {
    const getProduct = async () => {
      if (session?.user?._id) {
        await getStoreProduct({
          merchantId: session?.user?._id,
        })
      }
    }
    getProduct()
  }, [session?.user?._id])

  useEffect(() => {
    const updatedColumns = PRODUCT_COLUMNS.map((col) => {
      if (col.accessor === 'action') {
        return {
          ...col,
          Cell: (data: any) => {
            const [open, setOpen] = useState(false)
            return (
              <div>
                <div className='flex flex-row space-x-2'>
                  <Pencil2Icon
                    className='h-6 w-6'
                    onClick={() => {
                      setOpen(true)
                      console.log(data)
                    }}
                  />
                  <Trash2Icon className='h-6 w-6' />
                </div>
                <Dialog open={open} onOpenChange={() => setOpen(false)}>
                  <DialogContent className={'lg:max-w-screen-lg overflow-auto max-h-screen'}>
                    <DialogHeader>
                      <DialogTitle>Update Product</DialogTitle>
                      <DialogDescription>Update product to your store</DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                      <ProductForm
                        action={UPDATE_PRODUCT}
                        initialValue={data}
                        callback={() => setOpen(false)}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )
          },
        }
      }
      return col
    })
    setMyCol(updatedColumns)
  }, [])
  const product = useMemo(
    () => (isFetchingProduct ? [] : productData?.product),
    [isFetchingProduct, productData?.product]
  )

  return (
    <div className='p-4 w-full h-full'>
      <div className='flex flex-row gap-2 justify-start items-center w-full'>
        <p className='py-2 text-3xl font-bold'>Products</p>
        <Button onClick={() => toggle()}>
          <PlusCircledIcon className='h-5 w-5 mr-1' /> New Product
        </Button>
      </div>
      <div className='w-full h-full'>
        <CustomTable
          hiddenColumns={['images', '_id']}
          tableHeaderTitle={myCol}
          columnRows={product}
          isLoading={isFetchingProduct}
        />
      </div>
      <Dialog open={value} onOpenChange={setValue}>
        <DialogContent className={'lg:max-w-screen-lg overflow-auto max-h-screen'}>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            <DialogDescription>Add new product to your store</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <ProductForm
              action={ADD_PRODUCT}
              initialValue={ProductInitialValue}
              callback={() => setValue(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Products
