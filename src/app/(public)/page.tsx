"use client"
import WishlistButton from "@/components/Wishlist/Wishlist";
import useServices from "@/hooks/useServices";
import { useFilterStore } from "@/store/useFilterStore";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  const { search, filterName, op, value } = useFilterStore();


  const { data, isLoading } = useServices(search, filterName, op, value, 1, 100);

  return (
    <div className="container mx-auto px-3">
      {data?.services.length === 0 && <h1 className="text-2xl font-semibold text-center mt-16">No services found</h1>}

      <div className="flex items-center gap-4">
        {isLoading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="my-2 relative w-[200px]">
              <div className="w-[200px] h-[200px] bg-gray-300 animate-pulse rounded-2xl"></div>
              <div className="h-4 w-32 bg-gray-300 rounded mt-2 animate-pulse"></div>

              <div className="flex items-center gap-1 mt-1">
                {Array(5).fill(0).map((_, j) => (
                  <div key={j} className="h-3 w-3 bg-gray-300 rounded-full animate-pulse"></div>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-2">
                <div className="h-3 w-10 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-3 w-10 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-3 w-10 bg-gray-300 rounded animate-pulse"></div>
              </div>

              <div className="absolute top-2 right-2 h-6 w-6 bg-gray-300 rounded-full animate-pulse"></div>

            </div>
          ))
        ) : (
          data?.services.map((service) => {
            const avgRating =
              service.reviews.length > 0
                ? service.reviews.reduce((sum, r) => sum + r.rating, 0) / service.reviews.length
                : 0;

            return (
              <div className="my-2 relative" key={service.id}>
                <Link href={`/${service.id}`} className="block relative w-[200px] h-[200px] rounded-2xl overflow-hidden">
                  <Image src={service.image} alt={service.name} className="object-cover" sizes="(max-width: 768px) 100vw, 200px" priority fill />
                </Link>

                <div>
                  <h3 className="text-md font-semibold mt-1">
                    {service.name.charAt(0).toUpperCase() + service.name.slice(1)}
                  </h3>

                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: Math.round(avgRating) }).map((_, index) => (
                      <StarIcon key={index} size={15} className="text-yellow-500" />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-sm">{service.price}</span>
                  {service.offers && service.offers.slice(0, 3).map((offer, i) => <span key={i} className="text-sm">{offer}</span>)}
                  <span className="text-sm">{service.duration}</span>
                </div>

                <div className="absolute top-2 right-2 cursor-pointer">
                  <WishlistButton serviceId={service.id} />
                </div>
              </div>
            );
          })
        )}
      </div>


    </div>
  );
}