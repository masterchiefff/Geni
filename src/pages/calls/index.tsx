import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, X } from "@/components/ui/dropdown-menu"
import { Download, Columns } from "lucide-react";

import MainLayout from '@/components/layout/main-layout';

export default function Calls() {
    const [isLeftSidebarOpen, setisLeftSidebarOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [singleCallSearch, setSingleCallSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [visibleColumns, setVisibleColumns] = useState({
      id: true,
      customerNo: true,
      callStart: true,
      callEnd: true,
      duration: true,
      status: true,
      cost: true,
      issue: true,
    })
    const [selectedCall, setSelectedCall] = useState(null)

    const calls = [
        { id: 1, customerNo: '+1 (555) 123-4567', callStart: '2023-06-15 09:30:00', callEnd: '2023-06-15 09:45:30', duration: 930, status: 'Complete', cost: '$12.50', ticketId: 'T1001' },
        { id: 2, customerNo: '+1 (555) 987-6543', callStart: '2023-06-15 10:15:00', callEnd: '2023-06-15 10:28:45', duration: 825, status: 'Complete', cost: '$11.00', ticketId: 'T1002' },
        { id: 3, customerNo: '+1 (555) 246-8135', callStart: '2023-06-15 11:00:00', callEnd: null, duration: null, status: 'Pending', cost: '-', ticketId: 'T1003' },
        { id: 4, customerNo: '+1 (555) 369-2580', callStart: '2023-06-15 11:45:00', callEnd: '2023-06-15 12:02:15', duration: 1035, status: 'Complete', cost: '$13.80', ticketId: 'T1004' },
        { id: 5, customerNo: '+1 (555) 159-7531', callStart: '2023-06-15 13:30:00', callEnd: '2023-06-15 13:41:20', duration: 680, status: 'Complete', cost: '$9.07', ticketId: 'T1005' },
        { id: 6, customerNo: '+1 (555) 753-9514', callStart: '2023-06-15 14:00:00', callEnd: '2023-06-15 14:10:45', duration: 645, status: 'Complete', cost: '$8.60', ticketId: 'T1006' },
        { id: 7, customerNo: '+1 (555) 852-9630', callStart: '2023-06-15 15:30:00', callEnd: null, duration: null, status: 'Pending', cost: '-', ticketId: 'T1007' },
    ]
    
    const filteredCalls = calls.filter(call => 
        (call.customerNo.includes(searchTerm) ||
        call.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.ticketId.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (singleCallSearch === '' || call.id.toString() === singleCallSearch)
    )
    
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredCalls.slice(indexOfFirstItem, indexOfLastItem)
    
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(filteredCalls.length / itemsPerPage); i++) {
        pageNumbers.push(i)
    }
    
    const exportData = (format) => {
        console.log(`Exporting data in ${format} format`)
    }
    
    const toggleColumnVisibility = (column) => {
        setVisibleColumns(prev => ({ ...prev, [column]: !prev[column] }))
    }

    const toggleSidebar = () => setisLeftSidebarOpen(!isLeftSidebarOpen)

    const agents = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Emily Brown']

    return (
      <>
        <MainLayout pageTitle="Geni - Calls">
        <div className='flex-1 overflow-auto p-6'>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Calls</h1>
            <div className="flex space-x-2">
              <Button onClick={() => exportData('csv')}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
              <Button onClick={() => exportData('pdf')}>
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Input 
                placeholder="Search by call ID" 
                value={singleCallSearch}
                onChange={(e) => setSingleCallSearch(e.target.value)}
                className="w-48"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns Visibility <Columns className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {Object.keys(visibleColumns).map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column}
                    className="capitalize"
                    checked={visibleColumns[column]}
                    onCheckedChange={() => toggleColumnVisibility(column)}
                  >
                    {column}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  {visibleColumns.id && <TableHead className="w-[100px]">ID</TableHead>}
                  {visibleColumns.customerNo && <TableHead>Customer's No.</TableHead>}
                  {visibleColumns.callStart && <TableHead>Call Start</TableHead>}
                  {visibleColumns.callEnd && <TableHead>Call End</TableHead>}
                  {visibleColumns.duration && <TableHead>Duration (s)</TableHead>}
                  {visibleColumns.status && <TableHead>Status</TableHead>}
                  {visibleColumns.cost && <TableHead>Cost</TableHead>}
                  {visibleColumns.issue && <TableHead>Issue</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((call) => (
                  <TableRow key={call.id}>
                    {visibleColumns.id && <TableCell className="font-medium">{call.id}</TableCell>}
                    {visibleColumns.customerNo && <TableCell>{call.customerNo}</TableCell>}
                    {visibleColumns.callStart && <TableCell>{call.callStart}</TableCell>}
                    {visibleColumns.callEnd && <TableCell>{call.callEnd || '-'}</TableCell>}
                    {visibleColumns.duration && <TableCell>{call.duration !== null ? call.duration : '-'}</TableCell>}
                    {visibleColumns.status && (
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          call.status === 'Complete' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {call.status}
                        </span>
                      </TableCell>
                    )}
                    {visibleColumns.cost && <TableCell>{call.cost}</TableCell>}
                    {visibleColumns.issue && (
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto font-normal" onClick={() => {
                          setSelectedCall(call)
                          setisLeftSidebarOpen(true)
                        }}>
                          View Ticket
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCalls.length)} of {filteredCalls.length} entries
              </span>
              <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                <SelectTrigger className="w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              {pageNumbers.map(number => (
                <Button
                  key={number}
                  variant={currentPage === number ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </Button>
              ))}
            </div>
            </div>
        </div>
        </MainLayout>

        {isLeftSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setisLeftSidebarOpen(false)}>
            <div className="absolute right-0 top-0 bottom-0 w-96 bg-white shadow-lg z-50" onClick={(e) => e.stopPropagation()}>
              <div className="p-4">
                {/* <Button variant="ghost" onClick={() => setisLeftSidebarOpen(false)} className="absolute top-4 right-4">
                  <X className="h-6 w-6" />
                </Button> */}
                <h2 className="text-2xl font-bold mb-4">Call Details</h2>
                {selectedCall && (
                  <div className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h3 className="font-semibold">Customer Information</h3>
                      <p><span className="font-bold">Phone:</span> {selectedCall.customerNo}</p>
                      <p><span className="font-bold">Call Start:</span> {selectedCall.callStart}</p>
                      <p><span className="font-bold">Call End:</span> {selectedCall.callEnd || 'Ongoing'}</p>
                      <p><span className="font-bold">Duration:</span> {selectedCall.duration ? `${selectedCall.duration}s` : 'N/A'}</p>
                      <p><span className="font-bold">Status:</span> {selectedCall.status}</p>
                      <p><span className="font-bold">Cost:</span> {selectedCall.cost}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Recorded Call</h3>
                      <audio controls className="w-full">
                        <source src="/path-to-audio-file.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                    <Dialog className="tickets">
                      <DialogTrigger asChild>
                        <Button className="w-full">Create Ticket</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create New Ticket</DialogTitle>
                        </DialogHeader>
                        <form className="space-y-4">
                          <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" />
                          </div>
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" />
                          </div>
                          <div>
                            <Label htmlFor="status">Status</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="assignee">Assignee</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select assignee" />
                              </SelectTrigger>
                              <SelectContent>
                                {agents.map((agent) => (
                                  <SelectItem key={agent} value={agent}>{agent}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Button type="submit">Create Ticket</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    )
}