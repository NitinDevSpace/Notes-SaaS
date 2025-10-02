import type React from "react"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { AppHeader } from "@/components/layout/app-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <AppSidebar />
      <div className="lg:pl-64">
        <AppHeader />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
