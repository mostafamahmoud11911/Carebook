import { useMutation, useQueryClient } from "@tanstack/react-query";
import wishlist from "../services/wishlistServices";
import { toast } from "sonner";
import { AxiosError } from "axios";



const useRemoveWishlist = () => {
    const queryClient = useQueryClient();
    return useMutation<{ message: string }, AxiosError<{ message: string }>, number>({
        mutationFn: (serviceId) => wishlist.delete(serviceId),
        onSuccess(data) {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        },
        onError(err) {
            toast.error(err.response?.data.message || "Something went wrong");
        }
    })
};

export default useRemoveWishlist;