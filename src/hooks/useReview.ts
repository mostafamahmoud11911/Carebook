import reviews from "@/services/reviewServices"
import { Review } from "@/types/types";
import { useQuery } from "@tanstack/react-query"


const useReviews = (id: number) => {
    return useQuery<Review>({ queryKey: ['reviews', id], queryFn: () => reviews.getById(id) })
};

export default useReviews;