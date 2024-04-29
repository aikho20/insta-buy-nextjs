'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form'
import { ProductSchema, RegisterSchema } from '@/utils/validation/schemas/index'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import { ProductInitialValue, RegisterInitialValues } from '@/utils/validation/initialValues';
import FormError from '@/components/ui/from-error';
import { useRouter } from 'next/navigation';
import { useAddProductMutation } from '@/store/action/productAction';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { CheckCircle } from 'lucide-react';
import { useToggle } from '@/hooks/useToggle';
import { fileBase64 } from '@/utils/helper';
import { useState } from 'react';


export default function AddProductForm({ }) {
    const [addProduct, { isLoading, data }] = useAddProductMutation()
    const [value, toggle, setValue] = useToggle()
    const router = useRouter()
    const [images, setImages] = useState<[]>([])

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: ProductInitialValue
    })

    const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
        const res = await addProduct(values).unwrap()
        if (res?.message) {
            toggle()
        }
    }
    const handleImage = (e: any) => {
        let image = e.target.files;
        Promise.all(Array.from(image).map(fileBase64))
            .then((urls: any) => {
                return urls
            })
            .catch((error) => {
                return null
                console.error(error)
            })
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <div className={'space-y-4'}>
                    <div className='flex items-center justify-center min-h-[200px] w-100 shadow-md border-2 border-dashed border-gray-300'>
                        <FormField control={form.control} name='images'
                            render={({ field }) => (
                                <FormItem>

                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="file" multiple={true} onChange={(e) => {
                                                form.setValue('images', handleImage(e))
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-xs' />
                                </FormItem>

                            )} />
                    </div>


                    <FormField control={form.control} name='productName'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Product Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}

                                    />
                                </FormControl>
                                <FormMessage className='text-xs' />
                            </FormItem>

                        )} />
                    <FormField control={form.control} name='description'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}

                                    />
                                </FormControl>
                                <FormMessage className='text-xs' />
                            </FormItem>

                        )} />
                    <FormField control={form.control} name='price'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Price
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type={'number'} />
                                </FormControl>
                                <FormMessage className='text-xs' />
                            </FormItem>

                        )} />
                    <FormField control={form.control} name='discount'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Discount
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type={'number'} />
                                </FormControl>
                                <FormMessage className='text-xs' />
                            </FormItem>

                        )} />
                    <FormField control={form.control} name='quantity'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Quantity
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type={'number'} />
                                </FormControl>
                                <FormMessage className='text-xs' />
                            </FormItem>

                        )} />
                </div>
                {data?.error && (
                    <FormError message={data?.error} />
                )}

                <Button type='submit' className='w-full' disabled={isLoading}>{isLoading ? 'Adding...' : 'Add Product'}</Button>
            </form>

            <AlertDialog open={value}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='flex flex-row space-x-5 items-center'><CheckCircle className='text-emerald-500' />Successfully added a product</AlertDialogTitle>
                        <AlertDialogDescription>
                            Go to  product page to check see newly added product
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => toggle()}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async () => {
                                setValue(false)
                                router.push('/dashboard/products')
                            }}
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Form >
    );
}