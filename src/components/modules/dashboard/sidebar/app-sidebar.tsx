"use client";

import * as React from "react";
import {
  Bot,
  Building,
  SquareTerminal,
  Users,
  Settings,
  Send,
  LifeBuoy,
  FileText,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import Logo from "@/assets/svgs/Logo";
import { usePathname } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  // Detect the user role from the URL path
  const isAdmin = pathname.includes("/admin");
  const isLandlord = pathname.includes("/landlords");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isTenant = pathname.includes("/tenants");

  // Admin Navigation Data
  const adminNavData = {
    navMain: [
      {
        title: "Dashboard",
        // url: "/admin/dashboard",
        url: "/admin/dashboard",
        icon: SquareTerminal,
        isActive: pathname === "/admin/dashboard",
      },
      {
        title: "User Management",
        url: "/admin/users",
        icon: Users,
        items: [
          {
            title: "All Users",
            url: "/admin/users",
          },
          {
            title: "Manage Roles",
            // url: "/admin/users/manage-roles",
            url: "/admin/manage-roles",
          },
        ],
      },
      {
        title: "Rental Listings",
        url: "/admin/listings",
        icon: Building,
        items: [
          {
            title: "All Listings",
            url: "/admin/listings",
          },
          {
            title: "Update Listings",
            url: "/admin/update-listing",
          },
          {
            title: "Delete Listings",
            url: "/admin/delete-listing",
          },
          {
            title: "Review/Oversee Listings",
            url: "/admin/reviewListings",
          },
        ],
      },
      {
        title: "Profile",
        // url: "/admin/myProfile",
        url: "/admin/my-profile",
        icon: User,
      },
      {
        title: "Settings",
        url: "/admin/update-profile",
        icon: Settings,
        items: [
          {
            title: "Admin Preferences",
            // url: "/update-profile",
            url: "/admin/update-profile",
          },
          {
            title: "Change Password",
            // url: "/change-password",
            url: "/admin/change-password",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Help Center",
        url: "/help",
        icon: LifeBuoy,
      },
      {
        title: "Contact Support",
        url: "/contact",
        icon: Send,
      },
    ],
  };

  // Tenant Navigation Data
  const tenantNavData = {
    navMain: [
      {
        title: "Dashboard",
        url: "/tenants/dashboard",
        icon: SquareTerminal,
        isActive: pathname === "/tenants/dashboard",
      },
      {
        title: "Manage Rental Requests",
        url: "/tenants/requests",
        icon: Bot,
        items: [
          {
            title: "Make Rental Request",
            url: "/tenants/makeRequests",
          },
          {
            title: "View Rental Request",
            url: "/tenants/requests",
          },
          {
            title: "Payment History",
            // url: "/payment/my-payments",
            url: "/tenants/payment-history",
          },
        ],
      },
      {
        title: "Profile",
        // url: "/profile",
        url: "/tenants/dashboard/my-profile",
        icon: User,
      },
      {
        title: "Account Settings",
        // url: "/update-profile",
        url: "/tenants/dashboard/accountSettings",
        icon: Settings,
        items: [
          {
            title: "Update Profile",
            // url: "/update-profile",
            url: "/tenants/dashboard/update-profile",
          },
          {
            title: "Change Password",
            // url: "/change-password",
            url: "/tenants/dashboard/change-password",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "/help",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "/feedback",
        icon: Send,
      },
    ],
  };

  // Landlord Navigation Data
  const landlordNavData = {
    navMain: [
      {
        title: "Dashboard",
        url: "/landlords/dashboard",
        icon: SquareTerminal,
        isActive: pathname === "/landlords/dashboard",
      },
      {
        title: "Manage Listings",
        url: "/landlords/listings",
        icon: Building,
        items: [
          {
            title: "All Listings",
            // url: "/listings",
            url: "/landlords/allListings",
          },
          {
            title: "Post New Listing",
            url: "/landlords/listings",
          },
          {
            title: "View My Listing",
            url: "/landlords/listings/view",
          },
        ],
      },
      {
        title: "Rental Requests",
        url: "/landlords/requests",
        icon: FileText,
        items: [
          {
            title: "All Requests",
            // url: "/landlord/requests",
            url: "/landlords/requests",
          },
          {
            title: "Pending Requests",
            // url: "/landlord/requests/pending",
            url: "/landlords/pendingRequests",
          },
        ],
      },
      {
        title: "Profile",
        // url: "/profile",
        url: "/landlords/my-profile",
        icon: User,
      },
      {
        title: "Account Settings",
        // url: "/update-profile",
        url: "/landlords/update-profile",
        icon: Settings,
        items: [
          {
            title: "Update Profile",
            // url: "/update-profile",
            url: "/landlords/update-profile",
          },
          {
            title: "Change Password",
            // url: "/change-password",
            url: "/landlords/change-password",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Help Center",
        url: "/help",
        icon: LifeBuoy,
      },
      {
        title: "Contact Us",
        url: "/contact",
        icon: Send,
      },
    ],
  };

  // Select the appropriate navigation data
  const data = isAdmin
    ? adminNavData
    : isLandlord
    ? landlordNavData
    : tenantNavData;

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-sidebar-border/10 bg-white/80 backdrop-blur-sm"
      {...props}
    >
      <SidebarHeader className="border-b border-sidebar-border/10 bg-gradient-to-br from-white to-blue-50/50 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:scale-105 hover:shadow-lg transition-all duration-300 rounded-xl"
            >
              <Link href="/">
                <div className="flex items-center justify-center">
                  <Logo />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-gradient-to-b from-transparent via-blue-50/30 to-transparent">
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/10 bg-gradient-to-t from-white to-blue-50/50 p-4">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
