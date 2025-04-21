"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import {
  getTenantRequests,
  getLandlordRequests,
  getAllRequests,
} from "@/services/Requests";
import { makePayment } from "@/services/Payments";
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
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
});

const ViewRequests = () => {
  const { user } = useUser();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<any>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const router = useRouter();

  // Initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  // Fetch rental requests based on user role
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchRequests = async () => {
      try {
        setLoading(true);
        let response;

        if (user.role === "tenant") {
          response = await getTenantRequests();
        } else if (user.role === "landlord") {
          response = await getLandlordRequests();
        } else if (user.role === "admin") {
          response = await getAllRequests();
        }

        if (response?.success) {
          setRequests(response.data || []);
        } else {
          if (
            response?.message === "Authentication token not found" ||
            response?.message === "You are not authorized!"
          ) {
            toast.error("Please login to view your requests");
          } else {
            toast.error(response?.message || "Failed to fetch rental requests");
          }
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
        toast.error("Something went wrong while fetching your requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user, router]);

  // Update form defaults when a request is selected
  useEffect(() => {
    if (currentRequest && user) {
      form.reset({
        name: user.name || "",
        // phone: user.phone || "",
        phone: user.phone_number || "",
        address: user.address || "",
      });
    }
  }, [currentRequest, user, form]);

  // Handle opening the payment info dialog
  const handleProceedToPayment = (request: any) => {
    setCurrentRequest(request);
    setInfoDialogOpen(true);
  };

  // Handle info form submission and proceed to payment confirmation
  const handleInfoSubmit = (values: z.infer<typeof formSchema>) => {
    if (!currentRequest) return;

    // Update current request with form values
    setCurrentRequest({
      ...currentRequest,
      name: values.name,
      phone: values.phone,
      address: values.address,
    });

    // Close info dialog and open payment confirmation
    setInfoDialogOpen(false);
    setPaymentDialogOpen(true);
  };

  // Handle payment confirmation
  const handleConfirmPayment = async () => {
    if (!currentRequest || !user) return;

    try {
      setIsProcessingPayment(true);

      const paymentData = {
        requestId: currentRequest._id,
        listingId: currentRequest.rentalHouseId,
        tenantEmail: user.email || "",
        amount: currentRequest.rentAmount,
        name: currentRequest.name,
        phone: currentRequest.phone,
        address: currentRequest.address,
        status: "pending",
      };

      const response = await makePayment(paymentData);

      if (response.success) {
        toast.success("Payment initiated successfully!");

        // Redirect if checkout URL exists
        const checkoutUrl = response?.data?.checkoutUrl;
        if (
          typeof checkoutUrl === "string" &&
          checkoutUrl.startsWith("https")
        ) {
          window.location.href = checkoutUrl;
        } else {
          toast.error("Invalid payment URL received.");
        }
      } else {
        toast.error(response.message || "Payment failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Payment was not successful");
      console.error("Payment error:", error);
    } finally {
      setIsProcessingPayment(false);
      setPaymentDialogOpen(false);
      setCurrentRequest(null);
      form.reset();
    }
  };

  // Return loading state or error message if needed
  if (!user) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
        <p className="text-center text-gray-500">
          Please log in to view your requests.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h2 className="text-2xl font-semibold mb-6">Rental Requests</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading requests...</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-500">No rental requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Property</TableCell>
                <TableCell>Rent Amount</TableCell>
                <TableCell>Request Status</TableCell>
                {user.role === "tenant" && (
                  <>
                    <TableCell>Lnadlord Contact</TableCell>
                    <TableCell>Payment Status</TableCell>
                  </>
                )}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request._id}>
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

                  {/* Contact Info for Tenant when Approved */}
                  {user.role === "tenant" && (
                    <>
                      <TableCell>
                        {request.status === "approved" ? (
                          <div className="text-sm text-gray-700">
                            📞 {request.landlordPhone || "Not Provided"}
                          </div>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </TableCell>

                      {/* Payment Status */}
                      <TableCell>
                        <Badge
                          className={`${
                            request.paymentStatus === "paid"
                              ? "bg-green-500"
                              : "bg-orange-500"
                          } text-white`}
                        >
                          {request.paymentStatus || "unpaid"}
                        </Badge>
                      </TableCell>
                    </>
                  )}

                  <TableCell>
                    {user.role === "tenant" && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleProceedToPayment(request)}
                        disabled={
                          request.status !== "approved" ||
                          request.paymentStatus === "paid"
                        }
                      >
                        {request.paymentStatus === "paid"
                          ? "Paid"
                          : "Make Payment"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Tenant Information Dialog */}
      {/* <Dialog open={infoDialogOpen} onOpenChange={setInfoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Your Contact Information</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(handleInfoSubmit)}>
            <div className="space-y-4 py-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your complete address"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">Continue to Payment</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog> */}
      {/* Tenant Information Dialog */}
      <Dialog open={infoDialogOpen} onOpenChange={setInfoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Your Contact Information</DialogTitle>
          </DialogHeader>

          {/* Ensure currentRequest exists before rendering the form */}
          {currentRequest && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleInfoSubmit)}>
                <div className="space-y-4 py-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your complete address"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter className="mt-4">
                  <Button type="submit">Continue to Payment</Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Confirmation Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Payment Details</h3>
                <div className="flex justify-between mb-2">
                  <span>Property:</span>
                  <span className="font-semibold">
                    {currentRequest?.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-semibold text-green-600">
                    ৳{currentRequest?.rentAmount?.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Separator className="my-4" />

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span>👤</span>
                    <span>{currentRequest?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📞</span>
                    <span>{currentRequest?.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{currentRequest?.address}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="mt-4 text-sm">
              Are you sure you want to proceed with this payment?
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPaymentDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmPayment}
              disabled={isProcessingPayment}
            >
              {isProcessingPayment ? "Processing..." : "Pay Now"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewRequests;
