'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form'
import { ProductSchema, RegisterSchema } from '@/utils/validation/schemas/index'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ProductInitialValue, RegisterInitialValues } from '@/utils/validation/initialValues'
import FormError from '@/components/ui/from-error'
import { useRouter } from 'next/navigation'
import { useAddProductMutation, useUpdateProductMutation } from '@/store/action/productAction'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { CheckCircle } from 'lucide-react'
import { useToggle } from '@/hooks/useToggle'
import { fileBase64 } from '@/utils/helper'
import { useState } from 'react'
import ImageUpload from '@/components/ui/ImageUpload'
import { ADD_PRODUCT, UPDATE_PRODUCT } from '@/utils/data'
import { useToast } from '@/hooks/use-toast'

interface ProductFormProps {
  _id?: string
  images: Array<string>
  category: string
  productName: string
  description: string
  price: number
  discount: number
  quantity: number
}

interface ProductProps {
  action: string
  initialValue: ProductFormProps
  callback: () => void
}

export default function ProductForm({ action, initialValue, callback }: ProductProps) {
  const { toast } = useToast()
  const [addProduct, { isLoading, data }] = useAddProductMutation()
  const [updateProduct, { isLoading: isUpdatingProduct }] = useUpdateProductMutation()
  const [value, toggle, setValue] = useToggle()
  const router = useRouter()

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: initialValue,
  })

  const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
    if (action === ADD_PRODUCT) {
      const res = await addProduct(values).unwrap()

      if (res.message) {
        toast({
          title: 'Success!',
          variant: 'success',
          description: res.message,
        })
      } else {
        toast({
          title: 'Error!',
          description: res.error,
          variant: 'destructive',
        })
      }
    }
    if (action === UPDATE_PRODUCT) {
      const res = await updateProduct(values).unwrap()
      if (res.message) {
        toast({
          title: 'Success!',
          variant: 'success',
          description: res.message,
        })
      } else {
        toast({
          title: 'Error!',
          description: res.error,
          variant: 'destructive',
        })
      }
    }
    callback()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className={'space-y-4'}>
          <div className='flex items-center justify-center min-h-[200px] w-100 shadow-md border-2 border-dashed border-gray-300'>
            <FormField
              control={form.control}
              name='images'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload name='images' />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='productName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} type={'number'} />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='discount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input {...field} type={'number'} />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='quantity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input {...field} type={'number'} />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
          </div>
        </div>
        {data?.error && <FormError message={data?.error} />}

        <Button type='submit' disabled={isLoading}>
          {action === ADD_PRODUCT
            ? `${isLoading ? 'Adding...' : 'Add Product'}`
            : `${isLoading ? 'Updating...' : 'Update Product'}`}
        </Button>
      </form>
    </Form>
  )
}
