import users from "@/services/userServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner";



const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation<{ message: string }, AxiosError<{ message: string }>, number>({
        mutationFn: (id: number) => users.delete<{ message: string }>(id),
        onSuccess(data) {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["status"] });
        },
        onError(err) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.message);
            }
        }
    })
};

export default useDeleteUser;