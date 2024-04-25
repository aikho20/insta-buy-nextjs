'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form'
import { RegisterSchema } from '@/utils/validation/schemas/index'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import CardWraper from "@/components/ui/card-wrapper";
import Social from "@/components/ui/social";
import { RegisterInitialValues } from '@/utils/validation/initialValues';
import FormSuccess from '@/components/ui/form-success';
import FormError from '@/components/ui/from-error';
import { SignUpWithCredentialsParams } from '@/lib/actions/auth.actions';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

interface RegisterFormProps {
    callbackUrl: string,
    signUpWithCredentials: (values: SignUpWithCredentialsParams) => Promise<{ success?: boolean }>
}

export default function RegisterForm({ callbackUrl, signUpWithCredentials }: RegisterFormProps) {
    const router = useRouter()
    const { toast } = useToast()
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: RegisterInitialValues
    })

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        const res = await signUpWithCredentials(values)
        if (res?.success) {
            toast({
                title: "Sign up successfull",
                description: "Please go to login page to sign in",
            })
        } else {
            router.push('/auth/register')
        }
    }
    return (
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
                                <FormMessage className='text-xs' />
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
                                <FormMessage className='text-xs' />
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
                                <FormMessage className='text-xs' />
                            </FormItem>

                        )} />
                </div>
                <FormSuccess message='' />
                <FormError message='' />
                <Button type='submit' className='w-full'>Create Account</Button>
            </form>
        </Form>
    );
}