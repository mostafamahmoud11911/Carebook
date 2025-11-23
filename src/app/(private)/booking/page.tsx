"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useBooking from '@/hooks/useBooking'
import { EllipsisVertical } from 'lucide-react';
import React, { useState } from 'react'
import DeleteItem from './DeleteItem';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TablePagination } from '@/components/Pagination/Pagination';
import Search from '@/components/Search/Search';
import { useAuthStore } from '@/store/useAuthStore';

export default function Booking() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { data, isLoading, refetch } = useBooking(query, currentPage, +limit);

  const totalCount = data?.totalCount || 0;



  const { user } = useAuthStore();


  return (
    <>

      <div>
        <Search setQuery={setQuery} />
        <div className='bg-white p-4 rounded-md'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                {user?.role === "provider" && <TableHead>Action</TableHead>}

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
                      <div className="w-16 h-4 bg-gray-400 animate-pulse rounded-md"></div>
                    </TableCell>
                    <TableCell className="p-2">
                      <div className="h-4 w-16 bg-gray-400 animate-pulse rounded-md"></div>
                    </TableCell>
                    <TableCell className="p-2">
                      <div className="h-4 w-16 bg-gray-400 animate-pulse rounded-md"></div>
                    </TableCell>
                    {user?.role === "provider" && (
                      <TableCell className="p-2">
                        <div className="h-4 w-16 bg-gray-400 animate-pulse rounded-md"></div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                {data?.bookings && data.bookings.length > 0 ? (
                  data.bookings.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>{book.service.name}</TableCell>
                      <TableCell>
                        {book.client.username}
                      </TableCell>
                      <TableCell>{new Date(book.startTime).toLocaleString()}</TableCell>
                      <TableCell>{new Date(book.endTime).toLocaleString()}</TableCell>
                      <TableCell>{book.status}</TableCell>

                      {user?.role === "provider" && (
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <EllipsisVertical className='cursor-pointer'/>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem asChild>
                                <DeleteItem book={book} />
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="py-16">
                      <div className="flex flex-col items-center justify-center text-center text-gray-500">
                        <h2 className="text-xl font-semibold mb-2">No Bookings Found</h2>
                        <p className="text-gray-400">
                          We couldn’t find any Bookings.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </div>

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
    </>
  )
}
