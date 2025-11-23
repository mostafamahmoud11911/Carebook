"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import z from "zod";

import { addAvailabilitySchema } from "@/validations/validations";
import useServices from "@/hooks/useServices";
import useUsers from "@/hooks/useUsers";
import useAddAvailability from "@/hooks/useAddAvailability";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/store/useAuthStore";

type AvailabilityFormType = z.infer<typeof addAvailabilitySchema>;

export default function AddAvailability() {
  const form = useForm<AvailabilityFormType>({
    resolver: zodResolver(addAvailabilitySchema),
    defaultValues: {
      serviceId: "",
      providerId: "",
      startTime: new Date(),
      endTime: new Date(),
    },
  });

  const { user } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  const { data: servicesData } = useServices(undefined, undefined, undefined, undefined, undefined, 100);
  const { data: providersData } = useUsers();
  const { mutate, isPending } = useAddAvailability();


  useEffect(() => {
    if (user?.role === "provider" && user.id && providersData?.users) {
      const exists = providersData.users.some(p => String(p.id) === String(user.id));
      if (exists) {
        form.setValue("providerId", user.id.toString());
      }
    }
    setIsReady(true);
  }, [user, providersData, form]);

  const selectedProvider = form.watch("providerId");



  const filteredServices = useMemo(() => {
    if (!isReady || !servicesData?.services) return [];


    if (user?.role === "provider") {
      return servicesData.services.filter(
        (s) => String(s.providerId) === String(user.id)
      );
    }


    if (user?.role === "admin" && selectedProvider) {
      return servicesData.services.filter(
        (s) => String(s.providerId) === String(selectedProvider)
      );
    }

    return [];
  }, [servicesData?.services, user, selectedProvider, isReady]);


  const filteredProviders = useMemo(() => {
    if (!providersData?.users) return [];

    if (user?.role === "provider") {
      return providersData.users.filter((p) => String(p.id) === String(user.id));
    }

    return providersData.users.filter((p) => p.role === "provider");
  }, [providersData?.users, user]);


  const onSubmit = (data: AvailabilityFormType) => {
    const payload = {
      providerId: Number(data.providerId),
      serviceId: Number(data.serviceId),
      startTime: data.startTime.toISOString(),
      endTime: data.endTime.toISOString(),
    };

    mutate({ data: payload });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-md p-10">
        <h1 className="text-2xl font-bold mb-4">Add New Service</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="providerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provider</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={user?.role === "provider"}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredProviders.map((provider) => (
                          <SelectItem key={provider.id} value={provider.id.toString()}>
                            {provider.username}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredServices.length > 0 ? (
                          filteredServices.map((service) => (
                            <SelectItem key={service.id} value={service.id.toString()}>
                              {service.name}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="p-2 text-sm text-gray-500">
                            No services found for this provider
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      showTimeSelect
                      timeIntervals={5}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="w-full p-2 border rounded-md"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      showTimeSelect
                      timeIntervals={5}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="w-full p-2 border rounded-md"
                      minDate={form.watch("startTime")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending} className="w-full bg-red-400 hover:bg-red-500 cursor-pointer">
              Save Availability
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
