"use client"

import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { } from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { PersonIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
const Header = () => {
    const router = useRouter()
    const { data: session, status } = useSession()
    return (
        <div className='flex flex-row w-full px-5 py-2 items-center justify-between sticky top-0 left-0 bg-white z-10 shadow-md'>
            <Link className='text-primary font-semibold' href={'/'}>Insta Buy</Link>
            <p className='text-primary'>Location</p>


            <div className='flex flex-row space-x-3 hidden md:flex'>
                {status === 'loading' ? (
                    <Skeleton className="w-[100px] h-[40px] rounded-full" />
                ) : (
                    <>
                        {status === 'authenticated' ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className='flex flex-row px-2 py-2 items-center'><PersonIcon className='h-5 w-5' />{session?.user?.name}</DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => router.push('/auth/profile')}>Profile</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => { signOut() }}>Signout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Button onClick={() => router.push('/auth/login')}>Login</Button>
                                <Button variant={'outline'} onClick={() => router.push('/auth/register')} > Signup</Button>

                            </>
                        )}

                    </>
                )}
            </div>

        </div >
    )
}

export default Header