import providers from "@/services/providerService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";



const useDeclineProvider = () => {
    const queryClient = useQueryClient();
    return useMutation<{ message: string }, AxiosError<{ message: string }>, number>({
        mutationFn: (userId) => providers.delete<{ message: string }>(userId),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["pendingProvider"] });
            queryClient.invalidateQueries({ queryKey: ["status"] });
        },
        onError: (err) => {
            toast.error(err.response?.data.message || "Something went wrong");
        },
    })
};

export default useDeclineProvider;