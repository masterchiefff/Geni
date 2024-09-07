import React, { useState, useEffect } from 'react';
import { Montserrat as FontSans } from "next/font/google";
import { Search, ChevronDown,LayoutDashboard, Headset, Bell, Ticket, Phone, Settings, HelpCircle, LogOut, PhoneMissed, User } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import CallWidget from '@/components/shared-components/callWidget';
import SideBar from '@/components/shared-components/SideBar'
import SideBarItem from '@/components/shared-components/sidebar-item';
import { clearToken, setUser, setToken } from '@/store/authSlice'; 
import { useRouter } from 'next/router';

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
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
      document.title = pageTitle;
  }, [pageTitle]);

  useEffect(() => {
      const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
      const storedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
      const storedToken = sessionStorage.getItem('token');

      if (isAuthenticated && storedToken && storedUser) {
          dispatch(setUser(storedUser));
          dispatch(setToken(storedToken));
      }
  }, [dispatch]);

  const handleLogout = () => {
      dispatch(clearToken());
      sessionStorage.removeItem('isAuthenticated');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      router.push('/');
  };

  const getInitials = (name, profilePictureExists) => {
    if (!profilePictureExists) {
      const names = name.split(' ');
      const initials = names.length >= 2 ? 
        names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase() : 
        names[0].charAt(0).toUpperCase();
      return initials;
    }
    return '';
  };

  const initials = getInitials(user?.name || '', false); 


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
            
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>{ initials }</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email || 'User'}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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