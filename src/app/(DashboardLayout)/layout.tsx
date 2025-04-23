import { AppSidebar } from "@/components/modules/dashboard/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/10 backdrop-blur-sm bg-white/50 px-6 transition-all duration-300 ease-in-out">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="-ml-2 hover:bg-sidebar-accent/80 transition-all duration-200 rounded-lg" />
              <div className="h-6 w-px bg-sidebar-border/20" />
              <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="mx-auto w-full max-w-7xl p-6 transition-all duration-300 ease-in-out">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
