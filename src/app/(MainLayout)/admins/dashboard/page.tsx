"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Building2, Users, ClipboardList, TrendingUp } from "lucide-react";
import { getAllListings } from "@/services/Listings";
import { getAllUsers } from "@/services/Admin";
import { getAllRequests } from "@/services/Requests";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalListings: 0,
    totalUsers: 0,
    totalRequests: 0,
    activeListings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [listingsRes, usersRes, requestsRes] = await Promise.all([
          getAllListings(),
          getAllUsers(),
          getAllRequests(),
        ]);

        setStats({
          totalListings: listingsRes.data?.length || 0,
          totalUsers: usersRes.data?.length || 0,
          totalRequests: requestsRes.data?.length || 0,
          activeListings:
            listingsRes.data?.filter((l: any) => !l.isBlocked)?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const quickActions = [
    {
      title: "Manage Users",
      description: "View and manage user accounts",
      icon: Users,
      action: () => router.push("/admin/users"),
    },
    {
      title: "Review Listings",
      description: "Review and moderate property listings",
      icon: Building2,
      action: () => router.push("/admin/reviewListings"),
    },
    {
      title: "Manage Requests",
      description: "Handle rental requests and applications",
      icon: ClipboardList,
      action: () => router.push("/admin/requests"),
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Overview and management of your rental platform
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Listings Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Listings
                </p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {loading ? "..." : stats.totalListings}
                </h3>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{stats.activeListings} active</span>
            </div>
          </Card>

          {/* Total Users Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {loading ? "..." : stats.totalUsers}
                </h3>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">Across all roles</span>
            </div>
          </Card>

          {/* Total Requests Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <ClipboardList className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Requests
                </p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {loading ? "..." : stats.totalRequests}
                </h3>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">Rental applications</span>
            </div>
          </Card>

          {/* System Status Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  System Status
                </p>
                <h3 className="text-2xl font-bold text-gray-900">Active</h3>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">All services operational</span>
            </div>
          </Card>
        </div>

        {/* Quick Actions Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="p-6 cursor-pointer hover:shadow-lg transition-all group"
                onClick={action.action}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 rounded-full group-hover:bg-blue-100 transition-colors">
                    <action.icon className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              System Overview
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">User Management System</span>
                </div>
                <span className="text-sm text-green-600">Operational</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">
                    Rental Listings Database
                  </span>
                </div>
                <span className="text-sm text-green-600">Operational</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Payment Processing</span>
                </div>
                <span className="text-sm text-green-600">Operational</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
