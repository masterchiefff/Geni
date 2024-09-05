"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import MainLayout from '@/components/layout/main-layout'

export default function Settings() {

  return (
    <MainLayout pageTitle="Geni - Settings">
        <div className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
            <div className="grid gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your Name" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your.email@example.com" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select>
                      <SelectTrigger id="language" className="w-full mt-1">
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Call Center Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-answer">Auto Answer Calls</Label>
                    <Switch id="auto-answer" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="call-recording">Call Recording</Label>
                    <Switch id="call-recording" />
                  </div>
                  <div>
                    <Label htmlFor="greeting">Custom Greeting</Label>
                    <Input id="greeting" placeholder="Enter your custom greeting" className="mt-1" />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Security</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <Switch id="two-factor" />
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </MainLayout>
  )
}