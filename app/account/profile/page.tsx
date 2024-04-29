import PasswordUpdate from '@/components/forms/password-update'
import ProfileUpdateForm from '@/components/forms/profile-update-form'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import React from 'react'

function Profile() {
    return (
        <div className='flex items-center w-full h-100 justify-center'>
            <div className={'min-w-[375px] max-w-50 p-4'}>
                <p className='text-base font-bold my-2'>My Profile</p>
                <ProfileUpdateForm />
                <Separator className='my-4' />
                <p className='text-base font-bold my-2'>Change Password</p>
                <PasswordUpdate />
                <Separator className='my-4' />
                <p className='text-base font-bold my-2'>Account Management</p>
                <p className='text-inherit text-sm'>You can delete your account and personal data associated with it
                </p>
                <Button variant={'outline'} className='border-red text-red my-3'>Delete Account</Button>
            </div>
        </div>
    )
}

export default Profile