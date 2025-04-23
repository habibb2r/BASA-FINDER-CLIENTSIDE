"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarMenu>
      {items.map((item, index) => (
        <SidebarGroup key={index}>
          {item.items ? (
            <Collapsible>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    isActive={item.isActive}
                    className="hover:bg-sidebar-accent/60 hover:shadow-sm transition-all duration-200 relative after:absolute after:inset-0 after:rounded-lg after:ring-1 after:ring-sidebar-border/5 after:transition-opacity after:opacity-0 hover:after:opacity-100 group"
                  >
                    <item.icon className="text-sidebar-foreground/70 group-hover:text-sidebar-foreground/90 transition-colors duration-200" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <SidebarMenuAction>
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-[[data-state=open]]:rotate-90" />
                </SidebarMenuAction>
              </SidebarMenuItem>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items.map((subItem, subIndex) => (
                    <SidebarMenuSubItem key={subIndex}>
                      <SidebarMenuSubButton
                        asChild
                        className="hover:bg-sidebar-accent/60 hover:shadow-sm transition-all duration-200 relative after:absolute after:inset-0 after:rounded-lg after:ring-1 after:ring-sidebar-border/5 after:transition-opacity after:opacity-0 hover:after:opacity-100"
                      >
                        <Link href={subItem.url}>
                          <span className="text-sidebar-foreground/80 hover:text-sidebar-foreground/90 transition-colors duration-200">
                            {subItem.title}
                          </span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={item.isActive}
                className="hover:bg-sidebar-accent/60 hover:shadow-sm transition-all duration-200 relative after:absolute after:inset-0 after:rounded-lg after:ring-1 after:ring-sidebar-border/5 after:transition-opacity after:opacity-0 hover:after:opacity-100 group"
              >
                <Link href={item.url}>
                  <item.icon className="text-sidebar-foreground/70 group-hover:text-sidebar-foreground/90 transition-colors duration-200" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarGroup>
      ))}
    </SidebarMenu>
  );
}
