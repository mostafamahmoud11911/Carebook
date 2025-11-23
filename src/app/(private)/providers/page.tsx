"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import usePendingProvider from "@/hooks/usePendingProvider"
import { useState } from "react"
import useApproveProvider from "@/hooks/useApproveProvider"
import useDeclineProvider from "@/hooks/useDeclineProvider"
import { TablePagination } from "@/components/Pagination/Pagination"
import Search from "@/components/Search/Search"
import { Ban, Check } from "lucide-react"

export default function Providers() {
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const { data, isLoading, refetch } = usePendingProvider(query, currentPage, +limit);
    const { mutate: approve } = useApproveProvider();
    const { mutate: decline } = useDeclineProvider();

    const totalCount = data?.totalCount || 0;


    return (
        <div>
            <Search setQuery={setQuery} />
            <div className='bg-white p-4 rounded-md'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Username</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Role Pending</TableHead>
                            <TableHead>IsApproved</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    {isLoading ? (
                        <TableBody>
                            {Array.from({ length: 3 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell className="p-2">
                                        <div className="h-4 w-24 bg-gray-400 animate-pulse rounded-md"></div>
                                    </TableCell>
                                    <TableCell className="p-2">
                                        <div className="h-4 w-16 bg-gray-400 animate-pulse rounded-md"></div>
                                    </TableCell>
                                    <TableCell className="p-2">
                                        <div className="h-4 w-20 bg-gray-400 animate-pulse rounded-md"></div>
                                    </TableCell>
                                    <TableCell className="p-2">
                                        <div className="h-4 w-12 bg-gray-400 animate-pulse rounded-md"></div>
                                    </TableCell>
                                    <TableCell className="p-2 gap-2">
                                        <div className="h-8 w-2 bg-gray-400 mt-4 animate-pulse rounded-md"></div>
                                    </TableCell>
                                    <TableCell className="p-2 gap-2">
                                        <div className="h-8 w-2 bg-gray-400 mt-4 animate-pulse rounded-md"></div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    ) : (
                        <TableBody>
                            {data?.pendingUsers && data.pendingUsers.length > 0 ? (
                                data.pendingUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>
                                            {user.email}
                                        </TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{user.rolePending}</TableCell>
                                        <TableCell>{user.isApproved ? "Approved" : "Not Approved"}</TableCell>
                                        <TableCell className="flex gap-2 items-center">
                                            <button disabled={user.isApproved} className="cursor-pointer text-green-500" onClick={() => approve(user.id)}>
                                                <Check size={18}/>
                                            </button>
                                            <button disabled={user.isApproved} className="cursor-pointer text-red-500" onClick={() => decline(user.id)}>
                                                <Ban size={18}/>
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="py-16">
                                        <div className="flex flex-col items-center justify-center text-center text-gray-500">
                                            <h2 className="text-xl font-semibold mb-2">No Providers Found</h2>
                                            <p className="text-gray-400">
                                                We couldn’t find any Providers.
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    )}
                </Table>

            </div>

            <TablePagination
                currentPage={currentPage}
                totalCount={totalCount}
                limit={limit}
                onPageChange={(page) => {
                    setCurrentPage(page);
                    refetch();
                }}
                onLimitChange={(newLimit) => {
                    setLimit(newLimit);
                    setCurrentPage(1);
                    refetch();
                }}
            />
        </div>
    )
}