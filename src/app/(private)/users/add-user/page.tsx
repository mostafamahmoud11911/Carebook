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
import useAddUser from "@/hooks/useAddUser";
import { addUserSchema } from '@/validations/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import z from "zod";

type FormValues = z.infer<typeof addUserSchema>
export default function AddUser() {
    const form = useForm({ resolver: zodResolver(addUserSchema), defaultValues: { username: "", email: "", password: "" } });

    const mutation = useAddUser();
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        mutation.mutate({ data })
    }
    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-xl bg-white rounded-md p-10">
                <h1 className="text-2xl font-bold">Add New User</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto mt-10 space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="E-mail"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={mutation.isPending} className="w-full bg-red-400 hover:bg-red-500">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
