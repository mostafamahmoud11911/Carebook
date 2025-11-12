import status from "@/services/statusServices";
import { Dashboard } from "@/types/types";
import { useQuery } from "@tanstack/react-query"


const useStatus = () => {
    return useQuery<Dashboard>({
        queryKey: ["status"],
        queryFn: () => status.getAll()
    })
};


export default useStatus;