"use client"
import { Menu, Search, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Filter from '../Filter/Filter';
import { useFilterStore } from '@/store/useFilterStore';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function PublicNavbar() {
  const { search, setFilters } = useFilterStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter()

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return null
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };





  return (
    <>
      <nav
        className={`grid md:grid-cols-3 grid-cols-2 w-full items-center px-4 fixed top-0 z-40 bg-white transition-all shadow-sm ${isScrolled ? "h-16 shadow-md" : "h-20"
          }`}
      >
        <Link href={"/"} className="text-2xl w-fit font-bold text-red-500 tracking-wide">
          CareBook
        </Link>

        <div className="hidden md:flex items-center justify-center">
          {!["/register", "/login"].includes(pathname) && (
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center rounded-full gap-2 border border-gray-300 px-3 mx-auto 
                transition-all duration-300 bg-gray-50 focus-within:border-gray-400 
                ${isScrolled ? "w-72 h-10" : "w-96 h-12"}`}
              >
                <Search size={20} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setFilters({ search: e.target.value })}
                  className="transition-all duration-300 outline-none bg-transparent w-full text-gray-700"
                />
              </div>
              <Filter />
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="mr-4 border-gray-300 hover:bg-gray-100"
              >
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mr-4">
              {user ? (
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem>
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/register">Register</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex md:hidden items-center justify-end">
          {!["/register", "/login"].includes(pathname) && (
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setOpenMenu(true)}
              className="border-gray-300 hover:bg-gray-100"
            >
              <Search className="w-5 h-5" />
            </Button>
          )}
        </div>
      </nav>

      {openMenu && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col p-5">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-2xl font-bold text-red-500">CareBook</h4>
            <Button variant="ghost" size="icon" onClick={() => setOpenMenu(false)}>
              <X size={26} />
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center rounded-full gap-2 border border-gray-300 px-3 bg-gray-50 focus-within:border-gray-400 h-12">
              <Search size={20} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setFilters({ search: e.target.value })}
                className="outline-none bg-transparent w-full text-gray-700"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
