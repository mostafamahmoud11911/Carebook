import React from "react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationLink,
} from "@/components/ui/pagination";

type TablePaginationProps = {
    currentPage: number;
    totalCount: number;
    limit: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
    limits?: number[];
};

export const TablePagination: React.FC<TablePaginationProps> = ({
    currentPage,
    totalCount,
    limit,
    onPageChange,
    onLimitChange,
    limits = [5, 10, 15],
}) => {
    const totalPages = Math.ceil(totalCount / limit);

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-4">
            <Select
                defaultValue={limit.toString()}
                onValueChange={(value) => onLimitChange(Number(value))}
            >
                <SelectTrigger className="w-[100px] bg-white cursor-pointer">
                    <SelectValue placeholder="Page Size" />
                </SelectTrigger>
                <SelectContent>
                    {limits.map((l) => (
                        <SelectItem key={l} value={l.toString()} className="cursor-pointer">
                            {l}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Pagination>
                <PaginationContent>
                    <PaginationItem className="cursor-pointer">
                        <PaginationPrevious
                            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                        />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <PaginationItem key={i} className="cursor-pointer">
                            <PaginationLink
                                isActive={currentPage === i + 1}
                                onClick={() => onPageChange(i + 1)}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem className="cursor-pointer">
                        <PaginationNext
                            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                        />
                    </PaginationItem>

                </PaginationContent>
            </Pagination>
        </div>
    );
};
