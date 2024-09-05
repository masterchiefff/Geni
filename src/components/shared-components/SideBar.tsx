import { useState } from 'react';

import { Headset, Ticket, LayoutDashboard, Phone, Activity, Clock, Settings, Menu } from 'lucide-react'

import { Button } from "@/components/ui/button";

import SideBarItem from './sidebar-item';
import Link from 'next/link';

export default function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  
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

  return (
    <aside className={`sticky top-0 bg-primary text-white p-4 flex flex-col transition-all duration-300 ease-in-out h-screen ${isSidebarOpen ? 'w-64' : 'w-20'} hidden sm:flex`}>
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-white mb-6">
        <Menu className="w-5 h-5" />
      </Button>
      <div className="flex-1 flex flex-col items-center justify-center w-full space-y-2">
        <div>

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
        {/* <Button variant="ghost" className={`flex items-center justify-start w-full py-2 ${isSidebarOpen ? 'px-3' : 'justify-center'}`}>
          <Home className="w-5 h-5" />
          {isSidebarOpen && <span className="ml-3 text-sm">Home</span>}
        </Button> */}
    </div>
    <Link variant="ghost" href="/settings" className={`flex items-center justify-start w-full mt-auto py-2 ${isSidebarOpen ? 'px-3' : 'justify-center'}`}>
      <Settings className="w-5 h-5" />
      {isSidebarOpen && <span className="ml-3 text-sm">Settings</span>}
    </Link>
  </aside>
  )
}