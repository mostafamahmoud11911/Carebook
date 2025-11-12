import availability from "@/services/availabilityServices"
import { Availability } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { toast } from "sonner";




const useEditAvailability = () => {
    const queryClient = useQueryClient();
    return useMutation<{ message: string; availability: Availability }, AxiosError<{ message: string }>, { data: Availability, id: number }>({
        mutationFn: ({ id, data }) => availability.put(id, data),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["availability"] });
            queryClient.invalidateQueries({ queryKey: ["status"] });
        },
        onError: (err) => {
            toast.error(err.response?.data.message || "Something went wrong");
        },
    })
};

export default useEditAvailability;