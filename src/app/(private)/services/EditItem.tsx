"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useEditService from "@/hooks/useEditService"
import { Service } from "@/types/types"
import { editServiceSchema } from "@/validations/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from 'lucide-react'
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import z from "zod"

type ServiceSchemaType = z.infer<typeof editServiceSchema>

export default function EditItem({ service }: { service: Service }) {
  const form = useForm<ServiceSchemaType>({
    resolver: zodResolver(editServiceSchema),
    defaultValues: {
      name: service.name,
      price: service.price,
      duration: service.duration,
      image: service.image,
      images: service.images,
      offers: Array.isArray(service.offers)
        ? service.offers.join(", ")
        : service.offers,
    },
  });


  const mutation = useEditService()

  const onSubmit: SubmitHandler<ServiceSchemaType> = (data) => {

    const formData = new FormData();

    formData.append("name", data.name as string);
    formData.append("price", String(data.price));
    formData.append("offers", data.offers as string);
    formData.append("duration", data.duration as string);
    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }
    if (data.images?.length) {
      data.images.forEach((file: File) => {
        formData.append("images", file);
      });
    }

    mutation.mutate({ id: service.id, data: formData })

  };

  return (
    <Dialog>
      <DialogTrigger className='w-full h-full flex items-center py-2 cursor-pointer'>
        <Pencil className='mx-3' size={18} /> Edit
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
          <DialogDescription>
            Update your service information and click save when you’re done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Service name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Price"
                        type="number"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="Duration" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="offers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Offers</FormLabel>
                    <FormControl>
                      <Input placeholder="Offers" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : undefined)}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        multiple
                        onChange={(e) => field.onChange(e.target.files ? Array.from(e.target.files) : [])}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" className='bg-red-400 hover:bg-red-500' disabled={mutation.isPending}>Save change</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
