import availability from "@/services/availabilityServices";
import { Availability, AvailabilityReq } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { toast } from "sonner";



const useAddAvailability = () => {
    const queryClient = useQueryClient();
    return useMutation<{ message: string; availability: Availability }, AxiosError<{ message: string }>, { data: AvailabilityReq }>({
        mutationFn: ({ data }) => availability.post<{ message: string; availability: Availability }>(data),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["availabilities"] });
            queryClient.invalidateQueries({ queryKey: ["status"] });
        },
        onError: (err) => {
            toast.error(err.response?.data.message || "Something went wrong");
        },
    })
};

export default useAddAvailability