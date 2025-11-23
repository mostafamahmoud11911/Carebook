import { Trash } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import React from 'react'
import { Service } from '@/types/types'
import useDeleteService from '@/hooks/useDeleteService'
import { Button } from '@/components/ui/button'

export default function DeleteItem({ service }: { service: Service }) {

  const mutation = useDeleteService();


  return (
    <div>
      <Dialog>
        <DialogTrigger className='w-full h-full flex items-center pt-2 cursor-pointer'>
          <Trash color='red' size={18} className='mx-3'/> Delete
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this service {service.name}?
              <Button disabled={mutation.isPending} onClick={() => mutation.mutate(service.id)} className="flex items-center mt-3 justify-end gap-2 rounded-md bg-red-500 hover:bg-red-700 p-2 px-4 text-white">Delete</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
