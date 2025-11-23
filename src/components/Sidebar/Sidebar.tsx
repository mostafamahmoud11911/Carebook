"use client"
import { cn } from '@/lib/utils';
import { AxiosError } from 'axios';
import { Briefcase, CalendarRange, Home, LogOut, NotebookPen, Plus, Users, UserStar, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';

export default function Sidebar() {
    const [collapse, setCollapse] = useState<boolean>(true);
    const [mobileCollapse, setMobileCollapse] = useState<boolean>(false);

    const { user, logout } = useAuthStore();

    const router = useRouter();


    const links = [
        {
            id: crypto.randomUUID(),
            name: "Home",
            icon: Home,
            href: "/dashboard",
            roles: ["admin", "provider"]
        },
        {
            id: crypto.randomUUID(),
            name: "Users",
            icon: Users,
            href: "/users",
            roles: ["admin"]
        },
        {
            id: crypto.randomUUID(),
            name: "Services",
            icon: Briefcase,
            href: "/services",
            roles: ["admin", "provider"]
        },
        {
            id: crypto.randomUUID(),
            name: "Availability",
            icon: CalendarRange,
            href: "/availability",
            roles: ["admin", "provider"]
        },
        {
            id: crypto.randomUUID(),
            name: "Books",
            icon: NotebookPen,
            href: "/booking",
            roles: ["admin", "provider"]
        },
        {
            id: crypto.randomUUID(),
            name: "Providers",
            icon: UserStar,
            href: "/providers",
            roles: ["admin"]
        },
    ];


    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    const filterLink = links.filter(link => link.roles.includes(user?.role as string))

    return (
        <>
            <aside className={`hidden md:block border-r transition-all duration-150 ${collapse ? "w-[16rem]" : "w-[5rem]"}`}>
                <div className="flex mt-3 justify-start pl-4">
                    <button onClick={() => setCollapse(!collapse)} className='bg-red-200 p-4 rounded-xl transition-all duration-200'>
                        {collapse ? <X size={18} /> : <Plus size={18} />}
                    </button>
                </div>
                <div className='flex flex-col'>
                    <ul className='flex-1 mt-5 py-4'>
                        {filterLink.map(link => {
                            const Icon = link.icon;
                            return <li key={link.id}>
                                <Link href={link.href} className={`w-full flex items-center text-left mb-2 p-3 rounded-sm text-gray-700 hover:bg-red-200 transition duration-300 ease-in-out cursor-pointer`}>
                                    <div className="min-w-[2rem] flex justify-center ml-3">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <span
                                        className={`ml-3 whitespace-nowrap overflow-hidden transition-all duration-300 ${collapse ? "opacity-100 w-auto" : "opacity-0 w-0"
                                            }`}
                                    >
                                        {link.name}
                                    </span>
                                </Link>
                            </li>
                        }
                        )}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center p-3 mt-10 cursor-pointer hover:bg-red-100 text-red-600 rounded-md transition"
                        >
                            <div className="min-w-[2rem] flex justify-center ml-3">
                                <LogOut className="h-5 w-5" />
                            </div>
                            <span
                                className={`ml-3 whitespace-nowrap overflow-hidden transition-all duration-300 ${collapse ? "opacity-100 w-auto" : "opacity-0 w-0"
                                    }`}
                            >
                                Logout
                            </span>
                        </button>
                    </ul>
                </div>
            </aside>



            <aside className="md:hidden">
                <button
                    onClick={() => setMobileCollapse(true)}
                    className="bg-red-200 p-3 m-2 rounded-xl transition-all duration-200"
                >
                    <Plus size={20} />
                </button>

                <div
                    className={cn(
                        "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300",
                        mobileCollapse ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                    onClick={() => setMobileCollapse(false)}
                />

                <div
                    className={cn(
                        "fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out",
                        mobileCollapse ? "translate-x-0" : "-translate-x-full"
                    )}
                >
                    <div className="flex items-center justify-between p-4">
                        <button
                            onClick={() => setMobileCollapse(false)}
                            className="bg-red-200 p-3 rounded-xl transition-all duration-200"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <ul className="flex-1 space-y-1 mt-4 px-2 overflow-y-auto">
                        {filterLink.map((link) => {
                            const Icon = link.icon;
                            return (
                                <li key={link.id}>
                                    <Link
                                        href={link.name || "/"}
                                        onClick={() => setMobileCollapse(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-100 transition-colors"
                                    >
                                        <Icon className="w-5 h-5 text-red-400" />
                                        <span className="font-medium">{link.name}</span>
                                    </Link>
                                </li>
                            );
                        })}

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 cursor-pointer transition-colors"
                        >
                            <LogOut className="w-5 h-5 text-red-400" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </ul>
                </div>
            </aside>

        </>
    )
}
