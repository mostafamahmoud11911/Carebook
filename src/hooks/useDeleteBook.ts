import booking from "@/services/bookingServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { toast } from "sonner"




const useDeleteBook = () => {
    const queryClient = useQueryClient();
    return useMutation<{ message: string }, AxiosError<{ message: string }>, number>({
        mutationFn: (bookingId: number) => booking.delete(bookingId),
        onSuccess(data) {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ["booking"] });
            queryClient.invalidateQueries({ queryKey: ["status"] });
        },
        onError(err) {
            toast.error(err.response?.data.message || "Something went wrong");
        }
    })
};

export default useDeleteBook;