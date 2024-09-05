import React, { useState, useEffect } from 'react';
import { Montserrat as FontSans } from "next/font/google";
import { Search, ChevronDown,LayoutDashboard, Headset, Bell, Ticket, Phone, PhoneIncoming, PhoneMissed } from 'lucide-react'

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import CallWidget from '@/components/shared-components/callWidget';
import SideBar from '@/components/shared-components/SideBar'
import SideBarItem from '../shared-components/sidebar-item';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const menuItems = [
  {
    link: '/dashboard',
    Icon: LayoutDashboard,
    title: 'Dashboard',
  },
  {
    link: '/agents',
    Icon: Headset,
    title: 'Agents',
  },
  {
    link: '/calls',
    Icon: Phone,
    title: 'Calls',
  },
  {
    link: '/tickets',
    Icon: Ticket,
    title: 'Tickets',
  },
];

export default function MainLayout({ children, pageTitle = "Geni" }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <div className={cn("flex min-h-screen bg-gray-100", fontSans.className)}>
      <SideBar />
      <div className="flex-1 flex flex-col">
<header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Settings <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                className="pl-8" 
                placeholder="Search settings..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold">04:40</div>
            <Button>End my shift</Button>
            <Button variant="outline">Support</Button>
            <Button variant="outline">
              More tools <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                  <span className="sr-only">Call notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Call Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Incoming call from +1 (555) 123-4567</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PhoneMissed className="mr-2 h-4 w-4" />
                  <span>Missed call from +1 (555) 987-6543</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Phone className="mr-2 h-4 w-4" />
                  <span>Call ended with +1 (555) 246-8135</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 flex overflow-hidden">
          {children}
        </main>

        <CallWidget />

        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4">
          <div className="flex justify-around items-center">
          {menuItems.map((menuItem, index) => (
            <SideBarItem
                key={index}
                link={menuItem.link}
                Icon={menuItem.Icon}
                isOpen={isSidebarOpen}
                title={menuItem.title}
                // isActive={pathname === menuItem.link}
            />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}