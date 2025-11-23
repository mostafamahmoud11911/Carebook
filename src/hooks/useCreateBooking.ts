import booking from "@/services/bookingServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { toast } from "sonner";




const useCreateBooking = () => {
    const queryClient = useQueryClient();
    return useMutation<{ message: string }, AxiosError<{ message: string }>, { availabilityId: number }>({
        mutationFn: ({ availabilityId }: { availabilityId: number }) =>
            booking.post({ availabilityId }),
        onSuccess: (data) => {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ["booking"] });
        },
        onError: (error) => {
            const err = error as AxiosError<{ message: string }>
            toast.error(err.response?.data.message || "Something went wrong")
        }
    })
};

export default useCreateBooking;