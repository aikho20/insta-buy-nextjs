'use client'

import AddProductForm from '@/components/forms/add-product-form'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useToggle } from '@/hooks/useToggle'
function Products() {
    const [value, toggle, setValue] = useToggle()
    return (
        <div className='p-4'>

            <p className="py-2 text-3xl font-bold">Products</p>

            <Button variant="outline" onClick={() => toggle()}><PlusCircledIcon className='h-6 w-6 mr-1' /> Add New Product</Button>
            <Dialog open={value} onOpenChange={setValue} >
                <DialogContent className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}>
                    <DialogHeader>
                        <DialogTitle>Add Product</DialogTitle>
                        <DialogDescription>
                            Add new product to your store
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <AddProductForm />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Products