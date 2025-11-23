import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Booking } from '@/types/types'
import { Trash } from 'lucide-react'
import React from 'react'
import useDeleteBook from '../../../hooks/useDeleteBook'

export default function DeleteItem({ book }: { book: Booking }) {
    const mutation = useDeleteBook();
    return (
        <Dialog>
            <DialogTrigger className='w-full h-full flex items-center pt-2 cursor-pointer'>
                <Trash color='red' size={18} className='mx-3' /> Delete
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cancel Book</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to Cancel this Book?
                        <Button disabled={mutation.isPending} onClick={() => mutation.mutate(book.id)} className="flex items-center mt-3 justify-end gap-2 rounded-md bg-red-500 hover:bg-red-700 p-2 px-4 cursor-pointer text-white">Delete</Button>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
