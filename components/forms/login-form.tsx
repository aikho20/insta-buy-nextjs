'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form'

import { LoginSchema } from '@/utils/validation/schemas/index'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import CardWraper from "@/components/container/card-wrapper";
import Social from "@/components/ui/social";
import Link from "next/link";
import { LoginInitialValues } from '@/utils/validation/initialValues';
import FormSuccess from '../ui/form-success';
import FormError from '../ui/from-error';


export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: LoginInitialValues
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log(values)
  }
  return (
    <div className="bg-gray-700 h-full flex flex-col justify-center items-center">
      <CardWraper headerLabel={'Welcom Back'} backButtonLabel={'Dont have an account?'} backButtonHref={'/'} footerContent={
        <div className="w-full flex items-center justify-center flex-col">
          <Social />
          <Button className={'w-full mt-3'} asChild><Link href={'/'}>Dont have an account?</Link></Button>
        </div>
      }
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className={'space-y-4'}>
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
            <Button type='submit' className='w-full'>Login</Button>
          </form>
        </Form>
      </CardWraper>
    </div >
  );
}