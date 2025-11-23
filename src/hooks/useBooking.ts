import booking from "@/services/bookingServices"
import { BookingResponse } from "@/types/types";
import { useQuery } from "@tanstack/react-query"



const useBooking = (search?: string, page?: number, limit?: number) => {
    return useQuery<BookingResponse>({
        queryKey: ["booking", search, page, limit],
        queryFn: () => booking.getAllWithSearch(search, page, limit),
    })
};



export default useBooking;