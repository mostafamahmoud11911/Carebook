import { User } from '@/types/types'
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
import { Button } from '@/components/ui/button'
import useDeleteUser from '@/hooks/useDeleteUser'

export default function DeleteItem({ user }: { user: User }) {
  const mutation = useDeleteUser();
  return (
    <div>
      <Dialog>
        <DialogTrigger className='w-full h-full flex items-center pt-2 cursor-pointer'>
          <Trash color='red' size={18} className='mx-3'/> Delete
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {user.role}</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this {user.role} {user.username}?
              <Button disabled={mutation.isPending} onClick={() => mutation.mutate(user.id as number)} className="flex items-center mt-3 justify-end gap-2 rounded-md bg-red-500 hover:bg-red-700 p-2 px-4 text-white">Delete</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
