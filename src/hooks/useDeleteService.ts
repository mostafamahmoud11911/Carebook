import { AxiosError } from 'axios';
import services from "@/services/serviceServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";



const useDeleteService = () => {
    const queryClient = useQueryClient();
    return useMutation<{ message: string }, AxiosError<{ message: string }>, number>({
        mutationFn: (id: number) => services.delete<{ message: string }>(id),
        onSuccess(data) {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ["services"] });
            queryClient.invalidateQueries({ queryKey: ["status"] });
        },
        onError(err) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.message);
            }
        }
    })
}


export default useDeleteService;