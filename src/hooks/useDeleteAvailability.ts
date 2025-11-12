import { AxiosError } from 'axios';
import availability from "@/services/availabilityServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";



const useDeleteAvailability = () => {
    const queryClient = useQueryClient();
    return useMutation<{ message: string }, AxiosError<{ message: string }>, number>({
        mutationFn: (id: number) => availability.delete(id),
        onSuccess(data) {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ["availability"] });
            queryClient.invalidateQueries({ queryKey: ["status"] });
        },
        onError(err) {
            toast.error(err.response?.data.message);
        }
    })
};

export default useDeleteAvailability;