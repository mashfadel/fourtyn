"use client"

import localFont from "next/font/local";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import dynamic from 'next/dynamic'
import "./globals.css";
import { CommandMenu } from '@/components/command-menu'
import { useEffect } from 'react'

const AppSidebar = dynamic(() => import('@/components/app-sidebar').then(mod => mod.AppSidebar), { ssr: false })

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        // TODO: Implement opening the command menu
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider
          style={{
            "--sidebar-width": "240px",
            "--sidebar-width-mobile": "280px",
          } as React.CSSProperties}
        >
          <div className="flex h-screen">
            <AppSidebar />
            <main className="flex-1 overflow-auto">
              <SidebarTrigger />
              <CommandMenu />
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
