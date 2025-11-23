import availability from "@/services/availabilityServices"
import { AvailabilityResponse } from "@/types/types";
import { useQuery } from "@tanstack/react-query"




const useAvailability = (search?: string, page?: number, limit?: number) => {
    return useQuery<AvailabilityResponse>({
        queryKey: ['availability', search, page, limit],
        queryFn: () => availability.getAllWithSearch(search, page, limit)
    })
};


export default useAvailability;