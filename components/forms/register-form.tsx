'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form'
import { RegisterSchema } from '@/utils/validation/schemas/index'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import CardWraper from "@/components/container/card-wrapper";
import Social from "@/components/ui/social";
import { RegisterInitialValues } from '@/utils/validation/initialValues';
import FormSuccess from '@/components/ui/form-success';
import FormError from '@/components/ui/from-error';
import { signInWithCredentials, signUpWithCredentials } from '@/lib/actions/auth.actions';


export default function RegisterForm() {
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: RegisterInitialValues
    })

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        const res = await signUpWithCredentials(values)
    }
    return (
        <div className="bg-gray-700 h-full flex flex-col justify-center items-center">
            <CardWraper headerLabel={'Welcom Back'} backButtonLabel={'Dont have an account?'} backButtonHref={'/'} footerContent={
                <div className="w-full flex items-center justify-center flex-col">
                    <Social />
                </div>
            }
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
                                                placeholder='John Doe'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                )} />
                            <FormField control={form.control} name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='john.doe@example.com'
                                                type={'email'} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                )} />
                            <FormField control={form.control} name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type={'password'} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                )} />
                        </div>
                        <FormSuccess message='' />
                        <FormError message='' />
                        <Button type='submit' className='w-full'>Create Account</Button>
                    </form>
                </Form>
            </CardWraper>
        </div >
    );
}