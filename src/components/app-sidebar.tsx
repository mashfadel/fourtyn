'use client';  // Add this at the top of the file

import { useState } from 'react';
import { Home, BarChart2, PieChart, Settings, ChevronDown, Plus, CreditCard, Bell, LogOut, Sparkles } from "lucide-react"
import Link from 'next/link'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

// Menu items
const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Portfolio", url: "/portfolio", icon: PieChart },
  { title: "Performance", url: "/performance", icon: BarChart2 },
  { title: "Preferences", url: "/preferences", icon: Settings },
]

const teams = [
  { name: "Acme Inc", id: 1 },
  { name: "Acme Corp.", id: 2 },
  { name: "Evil Corp.", id: 3 },
]

// Function to generate initials from a name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Function to generate a color based on a string
function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
}

export function AppSidebar() {
  const companyName = "Acme Inc";
  const userName = "mohamed";
  const userEmail = "m@example.com";

  const companyInitials = getInitials(companyName);
  const userInitials = getInitials(userName);

  const companyColor = stringToColor(companyName);
  const userColor = stringToColor(userName);

  return (
    <Sidebar className="w-60 border-r">
      <SidebarHeader>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center space-x-3 px-4 py-3 cursor-pointer">
              <div className="h-10 w-10 rounded-md bg-blue-600 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6Z" fill="white"/>
                  <path d="M7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H13V17H7V15Z" fill="#3B82F6"/>
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-base font-semibold">{companyName}</h2>
                <p className="text-xs text-gray-500">Enterprise</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="end" side="right" sideOffset={5}>
            <DropdownMenuItem className="font-medium px-2 py-2">Teams</DropdownMenuItem>
            {teams.map((team) => (
              <DropdownMenuItem key={team.id} className="px-2 py-2">
                <div className="flex items-center w-full">
                  <div className="h-8 w-8 rounded flex items-center justify-center text-white text-sm font-medium mr-2" style={{ backgroundColor: stringToColor(team.name) }}>
                    {getInitials(team.name)}
                  </div>
                  <span>{team.name}</span>
                  <span className="ml-auto text-xs text-gray-500">⌘{team.id}</span>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="px-2 py-2">
              <Plus className="mr-2 h-4 w-4" />
              <span>Add team</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2">Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center px-4 py-2">
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center space-x-3 px-4 py-3 cursor-pointer">
              <div className="h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-medium" style={{ backgroundColor: userColor }}>
                {userInitials}
              </div>
              <div className="flex-grow">
                <h3 className="text-sm font-medium">{userName}</h3>
                <p className="text-xs text-gray-500">{userEmail}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="end" side="right" sideOffset={5}>
            <div className="flex items-center space-x-2 p-2">
              <div className="h-12 w-12 rounded flex items-center justify-center text-white text-lg font-medium" style={{ backgroundColor: userColor }}>
                {userInitials}
              </div>
              <div>
                <h3 className="font-medium">{userName}</h3>
                <p className="text-sm text-gray-500">{userEmail}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="px-2 py-2">
              <Sparkles className="mr-2 h-4 w-4" />
              <span>Upgrade to Pro</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="px-2 py-2">
              <Settings className="mr-2 h-4 w-4" />
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="px-2 py-2">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="px-2 py-2">
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="px-2 py-2 text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
