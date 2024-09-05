import React, { useState } from 'react';
import { Montserrat as FontSans } from "next/font/google";
import { ChevronDown, } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area"

import MainLayout from '@/components/layout/main-layout';

export default function Tickets(){
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const customers = [
    { id: 1, name: 'Donna Greene', avatar: '/placeholder.svg?height=32&width=32', message: 'Wants a refund, doesn\'t want...', time: '03:34 PM', description: 'urgent' },
    { id: 2, name: 'Melody Simpson', avatar: '/placeholder.svg?height=32&width=32', message: 'Wants to replace her purse', time: '08:00 PM', description: 'medium' },
    { id: 3, name: 'Dan Russell', avatar: '/placeholder.svg?height=32&width=32', message: 'The item did not arrive at th...', time: '08:05 PM', description: 'low' },
  ]

  return(
    <MainLayout > 
      <div className="w-1/3 bg-white p-4 overflow-auto">
        <h2 className="font-semibold mb-4">New Tickets <ChevronDown className="inline-block ml-2 h-4 w-4" /></h2>
        <ScrollArea className="h-[calc(100vh-200px)]">
          {customers.map((customer) => (
            <Card key={customer.id} className="mb-4 cursor-pointer" onClick={() => setSelectedCustomer(customer)}>
              <CardContent className="p-4 flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={customer.avatar} alt={customer.name} />
                  <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{customer.name}</h3>
                  <p className="text-sm text-gray-500">{customer.message}</p>
                </div>
                <div className="text-sm text-gray-500">{customer.time}</div>
                <div className={`w-2 h-2 rounded-full ${customer.description === 'urgent' ? 'bg-red-500' : customer.description === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`} />
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </div>
      <div className="flex-1 p-4 bg-gray-100">
        {selectedCustomer ? (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start space-x-4 mb-6">
              <Avatar className="w-16 h-16">
                <AvatarImage src={selectedCustomer.avatar} alt={selectedCustomer.name} />
                <AvatarFallback>{selectedCustomer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{selectedCustomer.name}</h2>
                <p className="text-gray-500">Customer since: 8 Feb, 2023, 24 days</p>
                <p className="text-gray-500">2 Park Ave, Verona, NJ 07044, USA</p>
              </div>

              <div className="mt-3">
                <span className='px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800'>Resolved</span>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Details</h3>
              <p>{selectedCustomer.message}</p>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Assignee</h3>
              <p>Vincent Otieno</p>
              {/* <p className="text-2xl font-bold mt-2">$268</p> */}
            </div>
            <div className="flex space-x-4">
              <Button>Unresolve</Button>
              <Button variant="outline">Make Pending</Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a customer to view details
          </div>
        )}
      </div>
    </MainLayout>
  )
}