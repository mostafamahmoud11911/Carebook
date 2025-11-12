import providers from "@/services/providerService";
import { PendingUsers } from "@/types/types";
import { useQuery } from "@tanstack/react-query";


const usePendingProvider = (search?: string, page?: number, limit?: number) => {
    return useQuery<PendingUsers>({
        queryKey: ["pendingProvider"],
        queryFn: () => providers.getAllWithSearch(search, page, limit)
    })
};


export default usePendingProvider;