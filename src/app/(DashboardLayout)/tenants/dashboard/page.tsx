"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Building2, FileText, Clock, BellRing } from "lucide-react";
import { getTenantRequests } from "@/services/Requests";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";

const TenantDashboard = () => {
  const router = useRouter();
  const { user } = useUser();
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    recentActivity: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getTenantRequests();

        if (response?.success) {
          const requests = response.data || [];
          setStats({
            totalRequests: requests.length,
            pendingRequests: requests.filter(
              (req: any) => req.status === "pending"
            ).length,
            approvedRequests: requests.filter(
              (req: any) => req.status === "approved"
            ).length,
            recentActivity: requests.filter((req: any) => {
              const requestDate = new Date(req.updatedAt);
              const now = new Date();
              const daysDiff = Math.floor(
                (now.getTime() - requestDate.getTime()) / (1000 * 3600 * 24)
              );
              return daysDiff <= 7;
            }).length,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const quickActions = [
    {
      title: "Browse Listings",
      description: "Find your perfect rental property",
      icon: Building2,
      action: () => router.push("/listings"),
    },
    {
      title: "View Requests",
      description: "Check your rental applications",
      icon: FileText,
      action: () => router.push("/tenants/requests"),
    },
    {
      title: "Payment History",
      description: "View your rental payments",
      icon: Clock,
      action: () => router.push("/tenants/payment-history"),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}
        </h1>
        <p className="text-gray-600">
          Manage your rental applications and payments from your dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-600">
              Total Requests
            </h3>
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {stats.totalRequests}
          </p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-600">Pending</h3>
            <Clock className="h-5 w-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {stats.pendingRequests}
          </p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-600">Approved</h3>
            <Building2 className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {stats.approvedRequests}
          </p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-600">
              Recent Activity
            </h3>
            <BellRing className="h-5 w-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {stats.recentActivity}
          </p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={action.action}
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <action.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
