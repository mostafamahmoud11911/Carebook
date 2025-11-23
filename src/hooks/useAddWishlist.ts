import wishlist from "@/services/wishlistServices";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { toast } from "sonner";



const useAddWishlist = () => {
    const queryClient = useQueryClient();

    return useMutation<{ message: string }, AxiosError<{ message: string }>, { serviceId: number }>({
        mutationFn: (serviceId) => wishlist.post(serviceId),

        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        },
        onError: (err) => {
            toast.error(err.response?.data.message || "Something went wrong");
        },
    })
};

export default useAddWishlist;