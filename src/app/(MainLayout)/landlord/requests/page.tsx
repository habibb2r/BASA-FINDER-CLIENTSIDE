"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { getLandlordRequests, updateRequestStatus } from "@/services/Requests";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2,  XCircle, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/Modal";

const LandlordTenantRequests = () => {
  const { user } = useUser();
  const router = useRouter();

  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  const [landlordPhone, setLandlordPhone] = useState("");
  const [currentRequestId, setCurrentRequestId] = useState("");

  // Redirect if user is not a landlord
  useEffect(() => {
    if (user?.role !== "landlord") {
      toast.error("Access Denied! Only landlords can view rental requests.");
      router.push("/");
    }
  }, [user, router]);

  // Fetch rental requests
  useEffect(() => {
    if (!user) return;

    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await getLandlordRequests();
        if (response?.success) {
          setRequests(response.data || []);
        } else {
          toast.error(response?.message || "Failed to fetch rental requests");
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
        toast.error("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  // Handle approval with phone number
  const handleApproval = (requestId: string) => {
    setCurrentRequestId(requestId);
    setPhoneModalVisible(true);
  };

  const handlePhoneSubmit = async () => {
    if (!landlordPhone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    setUpdating(currentRequestId);

    try {
      const response = await updateRequestStatus(
        currentRequestId,
        "approved",
        landlordPhone
      );

      if (response.success) {
        toast.success("Request approved successfully!");
        setRequests((prev) =>
          prev.map((req) =>
            req._id === currentRequestId
              ? { ...req, status: "approved", landlordPhone }
              : req
          )
        );
        setPhoneModalVisible(false);
        setLandlordPhone("");
      } else {
        toast.error(response.message || "Failed to approve request.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Approval error:", error);
    } finally {
      setUpdating(null);
    }
  };

  // Handle rejection
  const handleReject = async (requestId: string) => {
    setUpdating(requestId);

    try {
      const response = await updateRequestStatus(requestId, "rejected");

      if (response.success) {
        toast.success("Request rejected successfully!");
        setRequests((prev) =>
          prev.map((req) =>
            req._id === requestId ? { ...req, status: "rejected" } : req
          )
        );
      } else {
        toast.error(response.message || "Failed to reject request.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Rejection error:", error);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h2 className="text-2xl font-semibold mb-6">Tenant Rental Requests</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading requests...</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-500">No rental requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Tenant ID</TableCell>
                <TableCell>Tenant message</TableCell>
                <TableCell>Property</TableCell>
                <TableCell>Rent Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request._id}>
                  {/* <TableCell>{request.tenant?.name || "N/A"}</TableCell> */}
                  <TableCell>{request.tenantId || "N/A"}</TableCell>
                  <TableCell>{request.message || "N/A"}</TableCell>
                  <TableCell>{request.location}</TableCell>
                  <TableCell>৳ {request.rentAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        request.status === "pending"
                          ? "bg-yellow-500"
                          : request.status === "approved"
                          ? "bg-green-500"
                          : "bg-red-500"
                      } text-white`}
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    {request.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={updating === request._id}
                          onClick={() => handleApproval(request._id)}
                        >
                          {updating === request._id ? (
                            <Loader2 className="animate-spin w-4 h-4" />
                          ) : (
                            <CheckCircle className="w-4 h-4" />
                          )}
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={updating === request._id}
                          onClick={() => handleReject(request._id)}
                        >
                          {updating === request._id ? (
                            <Loader2 className="animate-spin w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                          Reject
                        </Button>
                      </>
                    )}
                    {request.status === "approved" && (
                      <Badge className="bg-green-600 text-white">
                        Approved
                      </Badge>
                    )}
                    {request.status === "rejected" && (
                      <Badge className="bg-red-600 text-white">Rejected</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Phone Number Modal */}
      <Modal
        title="Provide Your Contact Number"
        open={phoneModalVisible}
        onOk={handlePhoneSubmit}
        // onCancel={() => {
        //   setPhoneModalVisible(false);
        //   setLandlordPhone("");
        // }}
        onClose={() => setPhoneModalVisible(false)} // ✅ Use onClose instead of onCancel
        okText="Submit & Approve"
      >
        <div className="py-4">
          <p>Please provide your phone number for the tenant to contact you:</p>
          <Input
            placeholder="Enter your phone number"
            value={landlordPhone}
            onChange={(e) => setLandlordPhone(e.target.value)}
            className="w-full"
            type="tel"
          />
        </div>
      </Modal>
    </div>
  );
};

export default LandlordTenantRequests;
