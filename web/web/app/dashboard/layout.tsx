import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/components/ui/sidebar"
import Link from "next/link"
import { MessageSquare, Users } from 'lucide-react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen w-full">
          <SidebarProvider>
            <Sidebar className="w-64 flex-shrink-0">
              <SidebarHeader>
                <h1 className="text-xl font-bold p-4">Agent Dashboard</h1>
              </SidebarHeader>
              <SidebarContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/agents">
                        <Users className="mr-2" />
                        Agents
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/conversations">
                        <MessageSquare className="mr-2" />
                        Conversations
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
            </Sidebar>
            <main className="flex-grow overflow-hidden">
              {children}
            </main>
          </SidebarProvider>
        </div>
      </body>
    </html>
  )
}
