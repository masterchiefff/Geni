import { useState } from 'react'
import { Montserrat as FontSans } from "next/font/google";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { UserPlus, Edit, Trash2 } from 'lucide-react'

import MainLayout from '@/components/layout/main-layout'
import { cn } from '@/lib/utils'

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})  

export default function Agents() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [agents, setAgents] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Senior Agent', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Junior Agent', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Team Lead', status: 'Away' },
  ])
  const [newAgent, setNewAgent] = useState({ name: '', email: '', role: '', status: 'Active' })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewAgent(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setNewAgent(prev => ({ ...prev, [name]: value }))
  }

  const handleAddAgent = (e) => {
    e.preventDefault()
    const id = agents.length + 1
    setAgents(prev => [...prev, { id, ...newAgent }])
    setNewAgent({ name: '', email: '', role: '', status: 'Active' })
    setIsDialogOpen(false)
  }

  const handleDeleteAgent = (id) => {
    setAgents(agents.filter(agent => agent.id !== id))
  }

  return (
    <MainLayout pageTitle="Geni - Agents">
        <div className="flex-1 overflow-auto p-6">
            <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Manage Agents</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} className={cn("", fontSans.className)}>
                    <DialogTrigger asChild>
                    <Button>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Create Agent
                    </Button>
                    </DialogTrigger>
                    <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Agent</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddAgent} className="space-y-4">
                        <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" value={newAgent.name} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={newAgent.email} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select name="role" value={newAgent.role} onValueChange={(value) => handleSelectChange('role', value)}>
                            <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="Junior Agent">Junior Agent</SelectItem>
                            <SelectItem value="Senior Agent">Senior Agent</SelectItem>
                            <SelectItem value="Team Lead">Team Lead</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select name="status" value={newAgent.status} onValueChange={(value) => handleSelectChange('status', value)}>
                            <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Away">Away</SelectItem>
                            <SelectItem value="Offline">Offline</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                        <Button type="submit" className="w-full">
                        Add Agent
                        </Button>
                    </form>
                    </DialogContent>
                </Dialog>
            </div>
            <Card>
            <CardHeader>
                <CardTitle>Agent List</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {agents.map((agent) => (
                    <TableRow key={agent.id}>
                        <TableCell>{agent.name}</TableCell>
                        <TableCell>{agent.email}</TableCell>
                        <TableCell>{agent.role}</TableCell>
                        <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            agent.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                            {agent.status}
                        </span>
                        </TableCell>
                        <TableCell>
                        <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteAgent(agent.id)}>
                            <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
            </Card>
        </div>
    </MainLayout>
  )
}