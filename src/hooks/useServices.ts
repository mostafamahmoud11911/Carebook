import services from "@/services/serviceServices"
import { ServiceResponse } from "@/types/types";
import { useQuery } from "@tanstack/react-query"



const useServices = (search?: string, filterName?: string, op?: string, query?: string, page?: number, limit?: number) => {
    return useQuery<ServiceResponse>({
        queryKey: ['services', search, filterName, op, query, page, limit],
        queryFn: () => services.getAllWithQuery(search, filterName, op, query, page, limit)
    });
};

export default useServices;