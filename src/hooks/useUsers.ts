import users from "@/services/userServices";
import { UserResponse } from "@/types/types";
import { useQuery } from "@tanstack/react-query";




const useUsers = (search?: string, page?: number, limit?: number) => {
    return useQuery<UserResponse>({
        queryKey: ['users', search, page, limit],
        queryFn: () => users.getAllWithSearch(search, page, limit)
    });
};

export default useUsers;