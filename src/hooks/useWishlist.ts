import wishlist from "@/services/wishlistServices";
import { wishlistType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";





const useWishlist = () => {
    return useQuery<wishlistType>({
        queryKey: ['wishlist'],
        queryFn: () => wishlist.getAll()
    });
};


export default useWishlist;