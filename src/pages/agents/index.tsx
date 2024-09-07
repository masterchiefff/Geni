import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Montserrat as FontSans } from "next/font/google";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus, Edit, Trash2 } from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';
import { cn } from '@/lib/utils';

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export default function Agents() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token); 
    const [agents, setAgents] = useState([]);
    const [newAgent, setNewAgent] = useState({ name: '', phone: '', description: '', status: 'Active' });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    console.log(agents)
    useEffect(() => {
        const fetchAgents = async () => {
            if (!token) return; 
            try {
                const response = await axios.get('https://api.geni.africa/agents', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setAgents(response.data);
            } catch (error) {
                console.error("Error fetching agents:", error);
            }
        };

        fetchAgents();
    }, [token]); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAgent(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setNewAgent(prev => ({ ...prev, [name]: value }));
    };

    const handleAddAgent = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://api.geni.africa/agents', newAgent, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            // Log response to check if the agent data is correct
            console.log("Agent created:", response.data);

            // Update the state immediately with the new agent
            setAgents(prev => [...prev, response.data]);

            // Reset form and close dialog
            setNewAgent({ name: '', phone: '', role: '', status: 'Active' });
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Error adding agent:", error);
        }
    };

    const handleDeleteAgent = async (id) => {
        try {
            await axios.delete(`https://api.geni.africa/agents/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                },
            });
            // Remove the deleted agent from the state
            setAgents(agents.filter(agent => agent.id !== id));
        } catch (error) {
            console.error("Error deleting agent:", error);
        }
    };

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
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" name="phone" type="tel" value={newAgent.phone} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Select name="role" value={newAgent.description} onValueChange={(value) => handleSelectChange('description', value)}>
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
                                            <SelectItem value="available">Available</SelectItem>
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
                        {agents.length === 0 ? ( 
                            <p className="text-center text-gray-500">No agents available. Please add some agents.</p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {agents.map((agent) => (
                                        <TableRow key={agent.id}>
                                            <TableCell>{agent.name}</TableCell>
                                            <TableCell>{agent.phone}</TableCell>
                                            <TableCell>{agent.description}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                    agent.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
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
                        )}
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
