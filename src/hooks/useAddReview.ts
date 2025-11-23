import reviews from "@/services/reviewServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner";



const useAddReview = () => {
    const queryClient = useQueryClient();
    return useMutation<{ message: string }, AxiosError<{ message: string }>, { data: { serviceId: number, rating: number, comment: string } }>({
        mutationFn: ({data}) => reviews.post(data),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
        onError: (err) => {
            toast.error(err.response?.data.message || "Something went wrong");
        },
    })
};

export default useAddReview;