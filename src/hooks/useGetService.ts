import services from "@/services/serviceServices"
import { Service } from "@/types/types"
import { useQuery } from "@tanstack/react-query"


const useGetService = (id: number) => {
    return useQuery<{service:Service}>({
        queryKey: ['services', id],
        queryFn: () => services.getById(id)
    })
};


export default useGetService;