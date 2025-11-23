"use client"
import useAddWishlist from "@/hooks/useAddWishlist";
import useRemoveWishlist from "@/hooks/useRemoveWishlist";
import useWishlist from "@/hooks/useWishlist";
import { useAuthStore } from "@/store/useAuthStore";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";



export default function WishlistButton({ serviceId }: { serviceId: number }) {
    const { mutate: addToWishlist } = useAddWishlist();
    const { mutate: removeFromWishlist } = useRemoveWishlist();
    const { data: wishlist } = useWishlist();
    const { user } = useAuthStore();
    const router = useRouter()

    const isFav = wishlist?.wishlists?.some((item) => item.id === serviceId);



    const toggleWishlist = () => {
        if (!user?.id) return router.push("/login");

        if (isFav) {
            removeFromWishlist(serviceId);
        } else {
            addToWishlist({ serviceId });
        }
    };

    return (
        <div>
            <Heart
                size={22}
                onClick={toggleWishlist}
                className={`cursor-pointer transition ${isFav ? "text-red-500 fill-red-500" : "text-gray-400"
                    }`}
            />
        </div>
    )
}
