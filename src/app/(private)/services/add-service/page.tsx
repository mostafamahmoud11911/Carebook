"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useAddService from "@/hooks/useAddService"
import useUsers from "@/hooks/useUsers"
import { useAuthStore } from "@/store/useAuthStore"
import { addServiceSchema } from "@/validations/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"

export default function AddService() {
  const form = useForm({ resolver: zodResolver(addServiceSchema), defaultValues: { name: "", price: 0, duration: "", providerId: "", image: undefined, images: undefined, offers: "" } });

  const { user } = useAuthStore();

  type serviceSchemaType = z.infer<typeof addServiceSchema>;

  const selectedProvider = form.watch("providerId");

  const mutation = useAddService();
  const { data: providersData } = useUsers();


  const filteredProviders = useMemo(() => {
    if (!providersData?.users) return [];

    if (user?.role === "provider") {
      return providersData.users.filter(
        (p) => p.id === Number(selectedProvider)
      );
    }

    return providersData.users.filter((p) => p.role === "provider");
  }, [providersData?.users, user?.role, selectedProvider]);




  const onSubmit: SubmitHandler<serviceSchemaType> = (data) => {
    const formData = new FormData();


    formData.append("providerId", data.providerId);
    formData.append("name", data.name);
    formData.append("price", String(data.price));
    formData.append("offers", data.offers);
    formData.append("duration", data.duration);
    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }
    if (data.images?.length) {
      data.images.forEach((file: File) => {
        formData.append("images", file);
      });

      mutation.mutate({ data: formData })
    }
  };


  useEffect(() => {
    if (user?.role === "provider" && user?.id) {
      form.setValue("providerId", String(user.id));
    }
  }, [form, user, selectedProvider]);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-md p-10">
        <h1 className="text-2xl font-bold">Add New Service</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto mt-5 space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
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
                        onChange={(e) => field.onChange(e.target.value === "" ? null : Number(e.target.value))}
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
                      <Input placeholder="Offers, separated by commas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            <FormField
              control={form.control}
              name="providerId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Provider</FormLabel>
                  <FormControl>
                    <div className="border rounded-lg overflow-hidden w-full">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a provider" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {filteredProviders.map((provider) => (
                            <SelectItem key={provider.id} value={provider.id.toString()}>
                              {provider.username}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />



            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" type="file" onChange={(e) => field.onChange(e.target.files)} ref={field.ref} />
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
                      <Input placeholder="Name" type="file" multiple onChange={(e) => field.onChange(e.target.files)} ref={field.ref} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full bg-red-400 hover:bg-red-500" disabled={mutation.isPending}>Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
