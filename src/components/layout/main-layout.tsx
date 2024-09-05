import React, { useState } from 'react';
import { Montserrat as FontSans } from "next/font/google";
import { Search, ChevronDown, Home, MessageSquare, Activity, Clock } from 'lucide-react'

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import CallWidget from '@/components/shared-components/callWidget';
import SideBar from '@//components/shared-components/SideBar'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function MainLayout({children}){

  return(
    <div className={cn("flex min-h-screen bg-gray-100", fontSans.className)}>
      <SideBar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Product return <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input className="pl-8" placeholder="Knowledge base search" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold">04:40</div>
            <Button>End my shift</Button>
            <Button variant="outline">Support</Button>
            <Button variant="outline">
              More tools <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
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
            <Button variant="ghost" className="text-white">
              <Home className="w-6 h-6" />
            </Button>
            <Button variant="ghost" className="text-white">
              <MessageSquare className="w-6 h-6" />
            </Button>
            <Button variant="ghost" className="text-white">
              <Activity className="w-6 h-6" />
            </Button>
            <Button variant="ghost" className="text-white">
              <Clock className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}