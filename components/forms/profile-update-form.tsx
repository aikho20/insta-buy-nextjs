'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form'
import { LoginSchema, ProfileUpdateSchema } from '@/utils/validation/schemas/index'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import CardWraper from "@/components/ui/card-wrapper";
import Social from "@/components/ui/social";
import Link from "next/link";
import { ProfileUpdateInitialValues } from '@/utils/validation/initialValues';
import FormSuccess from '@/components/ui/form-success';
import FormError from '@/components/ui/from-error';
import { signIn } from 'next-auth/react'
import { updateUserProfile } from '@/lib/actions/auth.actions';
import { useToast } from '@/hooks/use-toast';
import { useUpdateProfileMutation } from '@/store/action/accountAction';

export default function ProfileUpdateForm() {
    const { toast } = useToast()
    const [updateProfile, { isLoading, data }] = useUpdateProfileMutation()
    const form = useForm<z.infer<typeof ProfileUpdateSchema>>({
        resolver: zodResolver(ProfileUpdateSchema),
        defaultValues: ProfileUpdateInitialValues
    })

    const onSubmit = async (values: z.infer<typeof ProfileUpdateSchema>) => {
        const res = await updateProfile({ name: values.name }).unwrap()
        if (res.message) {
            toast({
                description: 'Profile Updated Successfully'
            })
            form.reset()
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-full'>
                <div className={'space-y-4'}>
                    <FormField control={form.control} name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Full Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className='text-xs' />
                            </FormItem>

                        )} />
                </div>
                <Button type='submit' className='rounded-full' disabled={isLoading}>{isLoading ? 'Saving..' : 'Save'}</Button>
            </form>
        </Form >

    );
}