import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import useDeleteAvailability from '@/hooks/useDeleteAvailability';
import { Availability } from '@/types/types'
import { Trash } from 'lucide-react';
import React from 'react'

export default function DeleteItem({ availability }: { availability: Availability }) {
    const mutation = useDeleteAvailability();
    return (
        <div>
            <Dialog>
                <DialogTrigger className='w-full h-full flex items-center pt-2 cursor-pointer'>
                    <Trash color='red' size={18} className='mx-3' /> Delete
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Availability</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this availability?
                            <Button disabled={mutation.isPending} onClick={() => mutation.mutate(availability.id)} className="flex items-center mt-3 justify-end gap-2 rounded-md bg-red-500 hover:bg-red-700 p-2 px-4 text-white cursor-pointer">Delete</Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
