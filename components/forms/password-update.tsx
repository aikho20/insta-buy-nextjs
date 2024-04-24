'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form'
import { LoginSchema, PasswordUpdateSchema, ProfileUpdateSchema } from '@/utils/validation/schemas/index'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import CardWraper from "@/components/ui/card-wrapper";
import Social from "@/components/ui/social";
import Link from "next/link";
import { PasswordUpdateInitialValues, ProfileUpdateInitialValues } from '@/utils/validation/initialValues';
import FormSuccess from '@/components/ui/form-success';
import FormError from '@/components/ui/from-error';
import { signIn } from 'next-auth/react'
import { changeUserPassword } from '@/lib/actions/auth.actions';
export default function PasswordUpdate() {
    const form = useForm<z.infer<typeof PasswordUpdateSchema>>({
        resolver: zodResolver(PasswordUpdateSchema),
        defaultValues: PasswordUpdateInitialValues
    })

    const onSubmit = async (values: z.infer<typeof PasswordUpdateSchema>) => {
        const res = await changeUserPassword({
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
        })
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-full'>
                <div className={'space-y-4'}>
                    <FormField control={form.control} name='oldPassword'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    New Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}

                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )} />
                    <FormField control={form.control} name='newPassword'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Old Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}

                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )} />
                    <FormField control={form.control} name='confirmPassword'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Comfirm Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}

                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )} />
                </div>
                <Button type='submit' className='rounded-full'>Save</Button>
            </form>
        </Form >

    );
}