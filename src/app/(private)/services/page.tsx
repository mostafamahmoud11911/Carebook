"use client"
import useServices from '@/hooks/useServices';
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
import DeleteItem from './DeleteItem';
import EditItem from './EditItem';
import Link from 'next/link';
import Image from 'next/image';
import { EllipsisVertical } from 'lucide-react';
import { TablePagination } from '@/components/Pagination/Pagination';
import Search from '@/components/Search/Search';


export default function Services() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);


  const { data, isLoading, refetch } = useServices(query, undefined, undefined, undefined, currentPage, limit);
  const totalCount = data?.totalCount || 0;


  return (
    <>

      <div className='text-right mb-3'>
        <Link href={"/services/add-service"} className='px-4 py-2 rounded-sm inline-block bg-red-200 text-gray-700 hover:bg-red-300'>Add Service</Link>
      </div>

      <div>
        <Search setQuery={setQuery} />
        <div className='bg-white p-4 rounded-md'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Offers</TableHead>
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
                      <div className="w-[70px] h-[70px] bg-gray-400 animate-pulse rounded-md"></div>
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
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                {data?.services && data.services.length > 0 ? (
                  data.services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>{service.name}</TableCell>
                      <TableCell>
                        <Image
                          src={service.image}
                          alt="service-img"
                          width={70}
                          height={70}
                          priority
                          className="rounded-md h-[85px] object-cover w-auto"
                        />
                      </TableCell>
                      <TableCell>{service.price}</TableCell>
                      <TableCell>{service.duration}</TableCell>
                      <TableCell>
                        {service.offers.length > 0 ? (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                            {service.offers.length} Offers
                          </span>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <EllipsisVertical className='cursor-pointer' />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                              <DeleteItem service={service} />
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <EditItem service={service} />
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
                        <h2 className="text-xl font-semibold mb-2">No Services Found</h2>
                        <p className="text-gray-400">
                          We couldn’t find any services.
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
