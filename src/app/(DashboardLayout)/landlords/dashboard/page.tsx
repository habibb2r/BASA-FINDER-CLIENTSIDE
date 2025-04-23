"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { getLandlordListings } from "@/services/Listings";
import { getLandlordRequests } from "@/services/Requests";
import { toast } from "sonner";
import { Building2, ListChecks, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

const LandlordHomePage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    totalRequests: 0,
    pendingRequests: 0,
  });

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [listingsRes, requestsRes] = await Promise.all([
          getLandlordListings(),
          getLandlordRequests(),
        ]);

        if (listingsRes?.success && requestsRes?.success) {
          setStats({
            totalListings: listingsRes.data?.length || 0,
            activeListings:
              listingsRes.data?.filter((l: any) => l.isAvailable)?.length || 0,
            totalRequests: requestsRes.data?.length || 0,
            pendingRequests:
              requestsRes.data?.filter((r: any) => r.status === "pending")
                ?.length || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const quickActions = [
    {
      title: "Post New Listing",
      description: "Create a new rental property listing",
      icon: Building2,
      action: () => router.push("/landlords/listings"),
    },
    {
      title: "View My Listings",
      description: "Manage your property listings",
      icon: ListChecks,
      action: () => router.push("/landlords/listings/view"),
    },
    {
      title: "Rental Requests",
      description: "View and manage rental requests",
      icon: FileText,
      action: () => router.push("/landlords/requests"),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2">
          Landlord Dashboard
        </h1>
        <p className="text-lg md:text-xl text-gray-600 text-center mb-8">
          Welcome back, {user?.name}
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Listings</h3>
          <p className="text-3xl font-bold">
            {loading ? "..." : stats.totalListings}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Active Listings</h3>
          <p className="text-3xl font-bold">
            {loading ? "..." : stats.activeListings}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Requests</h3>
          <p className="text-3xl font-bold">
            {loading ? "..." : stats.totalRequests}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Pending Requests</h3>
          <p className="text-3xl font-bold">
            {loading ? "..." : stats.pendingRequests}
          </p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={action.action}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <action.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{action.title}</h3>
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

export default LandlordHomePage;
