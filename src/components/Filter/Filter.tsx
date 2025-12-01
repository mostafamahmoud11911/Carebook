"use client"

import { useFilterStore } from "@/store/useFilterStore";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";

export default function Filter() {
  const { value, filterName, op, setFilters, resetFilters } = useFilterStore();
  const [open, setOpen] = useState(false);



  return (
    <div className="relative">
      <Button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-red-400 hover:bg-red-500 px-3 py-2 rounded-md transition"
      >
        <SlidersHorizontal size={18} />
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-4 border z-50">
          <Select
            value={filterName}
            onValueChange={(value) => setFilters({ filterName: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose field" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter Field</SelectLabel>
                <SelectItem value="duration">Duration</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={op}
            onValueChange={(value) => setFilters({ op: value })}
          >
            <SelectTrigger className="my-4 w-full">
              <SelectValue placeholder="Choose operator" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Operator</SelectLabel>
                <SelectItem value="eq">=</SelectItem>
                <SelectItem value="gt">{'>'}</SelectItem>
                <SelectItem value="gte">{'>='}</SelectItem>
                <SelectItem value="lt">{'<'}</SelectItem>
                <SelectItem value="lte">{'<='}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            type="text"
            placeholder="Search services..."
            value={value}
            onChange={(e) => setFilters({ value: e.target.value })}
            className="w-full border rounded px-3 py-2 mb-4"
          />


          <div className="flex justify-between">
            <Button
              onClick={() => { resetFilters(); setOpen(false); }}
              className="bg-red-500 hover:bg-red-400 text-white"
            >
              Reset
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}