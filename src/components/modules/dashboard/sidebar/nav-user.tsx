"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/services/AuthService";
import { protectedRoutes } from "@/contants";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, setIsLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-sidebar-accent/60 hover:shadow-sm transition-all duration-300 group relative after:absolute after:inset-0 after:rounded-lg after:ring-1 after:ring-sidebar-border/5 after:transition-opacity after:opacity-0 hover:after:opacity-100"
            >
              <Avatar className="h-8 w-8 rounded-lg ring-2 ring-sidebar-ring/20 transition-all duration-200 group-hover:ring-sidebar-ring/40 group-hover:scale-105">
                <AvatarImage alt={user?.name} src={user?.photoURL} />
                <AvatarFallback className="font-medium text-sidebar-foreground/90">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start flex-1 min-w-0">
                <span className="text-sm font-medium truncate">
                  {user?.name}
                </span>
                <span className="text-xs text-sidebar-foreground/60 truncate">
                  {user?.email}
                </span>
              </div>
              <ChevronsUpDown className="h-4 w-4 text-sidebar-foreground/50 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align={isMobile ? "center" : "start"}
            className="w-56 bg-white/95 backdrop-blur-sm"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
