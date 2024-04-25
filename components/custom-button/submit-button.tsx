'use client'

import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'


interface SubmitButtonProps {
    title: string,
}
function SubmitButton({ title }: SubmitButtonProps) {
    const { pending } = useFormStatus()
    return (
        <Button type='submit' disabled={pending} className={'w-full'}>{pending ? 'Loading...' : title} </Button>
    )
}

export default SubmitButton