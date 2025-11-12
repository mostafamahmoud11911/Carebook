"use client"
import WishlistButton from '@/components/Wishlist/Wishlist';
import useGetService from '@/hooks/useGetService';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useRef, useState } from 'react'
import useCreateBooking from '@/hooks/useCreateBooking';
import { Dot, Star } from 'lucide-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { addReviewSchema } from '@/validations/validations';
import z from 'zod';
import useBooking from '@/hooks/useBooking';
import { useAuthStore } from '@/store/useAuthStore';
import useAddReview from '@/hooks/useAddReview';
import useReviews from '@/hooks/useReview';
import { toast } from 'sonner';

export default function ServiceDetails() {
    const { serviceDetails } = useParams();
    const [selectedDate, setSelectedDate] = useState<{ id: number; startTime: string; endTime: string; } | null>(null);
    const { data, isLoading } = useGetService(Number(serviceDetails));
    const [hovered, setHovered] = useState(0);


    type AddReviewSchemaType = z.infer<typeof addReviewSchema>

    const form = useForm<AddReviewSchemaType>({
        resolver: zodResolver(addReviewSchema),
        defaultValues: {
            rating: 0,
            comment: ""
        }
    });

    dayjs.extend(relativeTime);
    // make date service like 2d ago 
    const createdAt = data?.service.createdAt as string;
    const timeAgo = dayjs(createdAt).fromNow();


    // for scroll availabilities smooth
    const rowRef = useRef<HTMLDivElement>(null);
    const scrollBy = (distance: number) => {
        if (!rowRef.current) return;
        rowRef.current.scrollBy({ left: distance, behavior: "smooth" });
    };



    // covert date ISO to readable date 
    const formatDate = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleString();
    };

    // select availability date 
    const handleClickDate = (slot: React.SetStateAction<{ id: number; startTime: string; endTime: string; } | null>) => {
        setSelectedDate(slot);
    };

    // create book
    const { mutate } = useCreateBooking();


    const navigate = useRouter()


    const handleBook = () => {
        // return to login to book
        if (!user) return navigate.push("/login")

        // if user didn't select available date
        if (!selectedDate?.id) return toast.warning("You have to select available date")


        // send availability Id to book this date for this service
        mutate({ availabilityId: selectedDate?.id as number })
    };





    const { user } = useAuthStore();

    const { data: bookingData } = useBooking();


    const hasUserBooking = user && bookingData?.bookings.some(
        (b) => b.clientId === user?.id && b.status === "confirmed" && b.serviceId === Number(serviceDetails)
    );




    const { mutate: ReviewMutate } = useAddReview()

    const onSubmit: SubmitHandler<AddReviewSchemaType> = (data) => {

        const newData = { ...data, serviceId: Number(serviceDetails) }
        ReviewMutate({ data: newData })
    }



    const { data: reviews, isLoading: reviewsLoading } = useReviews(Number(serviceDetails));


    return (
        <div className='max-w-6xl mx-auto px-4 pt-3'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-semibold mb-4'>{data?.service.name}</h1>
                <WishlistButton serviceId={data?.service.id as number} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[400px] rounded-2xl overflow-hidden">
                <div className="w-full h-[400px]">
                    {isLoading ? (
                        <div className="w-full h-[400px] animate-pulse bg-gray-300 rounded-xl" />
                    ) : (
                        <>
                            {data?.service.image ? (
                                <Image
                                    src={data?.service.image}
                                    alt="Service image"
                                    width={400}
                                    height={400}
                                    className="w-full h-full object-cover"
                                />
                            ) : null}
                        </>
                    )}

                </div>

                <div className="hidden md:grid grid-rows-2 grid-cols-2 gap-2 h-[400px]">
                    {isLoading ? (
                        Array(4).fill(0).map((_, i) => (
                            <div
                                key={i}
                                className="w-full h-full bg-gray-300 animate-pulse"
                            />
                        ))
                    ) : (
                        data?.service?.images?.map((image: string) => (
                            <div key={image} className="w-full h-full">
                                <Image
                                    src={image}
                                    alt={data?.service.name as string}
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))
                    )}
                </div>

            </div>

            <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                <div className='mt-3'>
                    <div className='flex flex-col gap-2 border-b-[1px] border-gray-300 w-fit p-2'>
                        <h2 className='text-xl font-semibold'>Hosted By {data?.service.provider.username}</h2>
                        <p className='mb-2'>{timeAgo}</p>
                    </div>


                    <div className='mt-2'>
                        <h2 className='text-2xl font-semibold mb-2'>What this place offers</h2>
                        <div className='max-w-96'>

                            {isLoading ? (
                                <div className="grid grid-cols-2 gap-3">
                                    {Array(4).fill(0).map((_, i) => (
                                        <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
                                    ))}
                                </div>
                            ) : (
                                <div className='grid grid-cols-2 gap-3'>
                                    {data?.service?.offers?.map((offer: string) => (<p key={offer} className='mb-2 flex'><Dot /> {offer}</p>))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='mt-3'>

                    <div className="w-full">
                        <h2 className='text-2xl mt-5'>{data?.service.price}</h2>

                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium">Available date</h3>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => scrollBy(-240)}
                                    aria-label="Scroll left"
                                    className="px-2 py-1 rounded-md border hover:bg-red-50"
                                >
                                    ‹
                                </button>
                                <button
                                    onClick={() => scrollBy(240)}
                                    aria-label="Scroll right"
                                    className="px-2 py-1 rounded-md border hover:bg-red-50"
                                >
                                    ›
                                </button>
                            </div>
                        </div>
                        <div
                            ref={rowRef}
                            className="flex flex-nowrap gap-3 overflow-x-auto py-2 px-1 scrollbar-thin"
                            style={{ WebkitOverflowScrolling: "touch" }}
                        >
                            {data?.service.availabilities.length === 0 ? (
                                <div className="min-w-[220px] w-56 p-4 rounded-lg border border-dashed text-sm text-gray-500">
                                    No Availability
                                </div>
                            ) : (
                                <div className="flex flex-nowrap gap-3 overflow-x-auto py-2 px-1 scrollbar-thin">
                                    {isLoading ? (
                                        Array(3).fill(0).map((_, i) => (
                                            <div
                                                key={i}
                                                className="min-w-[220px] w-56 p-3 rounded-lg shadow-sm border bg-gray-200 animate-pulse flex flex-col gap-2"
                                            >
                                                <div className="h-3 w-16 bg-gray-300 rounded"></div>
                                                <div className="h-4 w-28 bg-gray-300 rounded"></div>
                                                <div className="h-3 w-20 bg-gray-300 rounded"></div>
                                            </div>
                                        ))
                                    ) : (
                                        data?.service.availabilities.map((slot, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => handleClickDate(slot)}
                                                className={`min-w-[220px] w-56 p-3 rounded-lg shadow-sm border flex flex-col gap-1 cursor-pointer transition 
                    ${selectedDate?.startTime === slot.startTime
                                                        ? "bg-red-100 border-red-500"
                                                        : "bg-white hover:bg-gray-50"
                                                    }`}
                                            >
                                                <div className="text-xs text-gray-400">Date</div>
                                                <div className="text-sm font-medium">{formatDate(slot.startTime)}</div>
                                                {slot.endTime && (
                                                    <div className="text-xs text-gray-500">
                                                        end: {formatDate(slot.endTime)}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='w-full px-11'>
                        <button onClick={handleBook} className='bg-red-500 text-white p-3 rounded-3xl w-full'>Reserve</button>
                    </div>
                </div>
            </div>




            {reviews && reviews.reviews.length > 0 && (
                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-gray-300">
                    {reviewsLoading ? (
                        Array(4).fill(0).map((_, i) => (
                            <div key={i} className="p-3 rounded-sm animate-pulse">
                                <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
                                <div className="h-3 w-24 bg-gray-200 rounded"></div>

                                <div className="mt-3">
                                    <div className="flex items-center gap-1 mb-2">
                                        {Array(5).fill(0).map((_, j) => (
                                            <div key={j} className="h-3 w-3 bg-gray-300 rounded-full"></div>
                                        ))}
                                    </div>
                                    <div className="h-3 w-20 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-3 w-full bg-gray-300 rounded mb-1"></div>
                                    <div className="h-3 w-4/5 bg-gray-300 rounded"></div>
                                </div>

                            </div>
                        ))
                    ) : (
                        reviews.reviews.map((review) => (
                            <div key={review.id} className="p-3 rounded-sm">
                                <h4 className="text-gray-900 text-lg font-semibold">{review.user.username}</h4>
                                <p className="text-xs">{dayjs(review.user.createdAt).fromNow()} on CareBook</p>

                                <div className="mt-3">
                                    <div className="flex items-center">
                                        <div className="flex items-center gap-.5">
                                            {Array(review.rating).fill(0).map((_, i) => (
                                                <Star key={i} fill="dark" size={10} />
                                            ))}
                                        </div>
                                        <Dot size={14} />
                                        <p className="text-sm">{dayjs(review.createdAt).fromNow()}</p>
                                    </div>
                                    <p>{review.comment.slice(0, 300)}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}



            {user && <>


                {hasUserBooking && <div className='mt-3 border-t p-3 border-gray-300'>
                    <p>Rate</p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                            <div className='flex items-center gap-2'>
                                <Controller
                                    name="rating"
                                    control={form.control}
                                    defaultValue={0}
                                    render={({ field, fieldState }) => (
                                        <div className="flex flex-col gap-1">

                                            <div className="flex items-center gap-2">
                                                {Array(5).fill(0).map((_, i) => {
                                                    const index = i + 1;

                                                    const isActive = index <= (hovered || field.value);
                                                    const hasError = !!fieldState.error;

                                                    return (
                                                        <Star
                                                            key={index}
                                                            size={20}
                                                            className={`
                cursor-pointer transition
                ${isActive ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}
                ${hasError ? "stroke-red-500" : ""}
              `}
                                                            onMouseEnter={() => setHovered(index)}
                                                            onMouseLeave={() => setHovered(0)}
                                                            onClick={() => field.onChange(index)}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>

                            <div>
                                <FormField
                                    control={form.control}
                                    name="comment"
                                    render={({ field }) => (
                                        <FormItem className='w-[300px]'>
                                            <FormLabel>Comment</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Comment" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type='submit' className='w-fit bg-red-500 hover:bg-red-600'>Submit</Button>
                        </form>
                    </Form>
                </div>}


            </>}
        </div>
    )
}
