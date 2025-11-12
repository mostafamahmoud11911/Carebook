"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React, { useState } from 'react'
import Link from 'next/link';
import { EllipsisVertical } from 'lucide-react';
import useUsers from '@/hooks/useUsers';
import DeleteItem from './DeleteItem';
import EditItem from './EditItem';
import { TablePagination } from "@/components/Pagination/Pagination"
import Search from "@/components/Search/Search"

export default function Users() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { data, isLoading, refetch } = useUsers(query, currentPage, +limit);

  const totalCount = data?.totalCount || 0;




  return (
    <>

      <div className='text-right mb-3'>
        <Link href={"/users/add-user"} className='px-4 py-2 rounded-sm inline-block bg-red-200 text-gray-700 hover:bg-red-300'>Add User</Link>
      </div>


      <Search setQuery={setQuery} />
      <div className='bg-white p-4 rounded-md'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          {isLoading ? (
            <>
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
                    <TableCell className="p-2 gap-2">
                      <div className="h-8 w-2 bg-gray-400 mt-4 animate-pulse rounded-md"></div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </>
          ) : (
            <TableBody>
              {data?.users && data.users.length > 0 ? (
                data.users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                      {user.email}
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <DropdownMenu >
                        <DropdownMenuTrigger>
                          <EllipsisVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem asChild>
                            <DeleteItem user={user} />
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <EditItem user={user} />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="py-16">
                    <div className="flex flex-col items-center justify-center text-center text-gray-500">
                      <h2 className="text-xl font-semibold mb-2">No users Found</h2>
                      <p className="text-gray-400">
                        We couldn’t find any users.
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
    </>
  )
}
