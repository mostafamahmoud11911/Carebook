import users from "@/services/userServices";
import { User, UserReq } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";



const useEditUser = () => {
    const queryClient = useQueryClient();
    return useMutation<{ user: User, message: string }, AxiosError<{ message: string }>, { data: UserReq, id: number }>({
        mutationFn: ({ data, id }) => users.put<{ user: User, message: string }>(id, data),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["status"] });
        },
        onError: (err) => {
            toast.error(err.response?.data.message || "Something went wrong");
        },
    })
}

export default useEditUser