import services from "@/services/serviceServices"
import { Service } from "@/types/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"



const useEditService = () => {
        const queryClient = useQueryClient();
    return useMutation<{ service: Service, message: string }, AxiosError<{ message: string }>, { data: FormData, id: number }>({
        mutationFn: ({ id, data }) => services.put<{ service: Service, message: string }>(id, data),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({queryKey: ["services"]});
            queryClient.invalidateQueries({queryKey: ["status"]});
        },
        onError: (err) => {
            toast.error(err.response?.data.message || "Something went wrong");
        },
    })
};

export default useEditService;