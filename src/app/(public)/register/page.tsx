"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
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
import React from "react";
import { registerSchema } from "@/validations/validations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

export default function Register() {

  type FormValues = z.infer<typeof registerSchema>;

  const { setState, submitForm, loginWithGoogle, loading } = useAuth("user");

  const form = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await submitForm("/auth/register", "register", data);
  };




  return (
    <div className="md:h-[calc(100vh-80px)] py-10 overflow-y-auto flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-red-500 mb-6">
          CareBook Register
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
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
                  <FormLabel className="font-medium text-gray-700">E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
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
                  <FormLabel className="font-medium text-gray-700">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold"
              disabled={loading}
            >
              {loading ? "Loading..." : "Register"}
            </Button>
          </form>
        </Form>

        <div className="mt-5">
          <Select onValueChange={(value) => setState(value as "user" | "provider")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select User Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="provider">Provider</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-2">
          <Button
            onClick={loginWithGoogle}
            className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300"
            disabled={loading}
          >
            <span>Login with Google</span>
          </Button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-red-500 hover:underline font-medium">
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}
