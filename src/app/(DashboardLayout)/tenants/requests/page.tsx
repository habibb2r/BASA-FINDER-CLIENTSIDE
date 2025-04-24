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
        phone: user.phone || "",
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
        console.log(checkoutUrl)
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
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-md p-8 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m0 0v2m0-2h2m-2 0H10m9-5a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Authentication Required
          </h3>
          <p className="text-gray-600">
            Please log in to view your rental requests
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Rental Requests</h2>
          <p className="text-gray-600 mt-1">
            {user.role === "tenant"
              ? "Track and manage your rental applications"
              : user.role === "landlord"
              ? "Review and respond to tenant applications"
              : "Overview of all rental applications"}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-8 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            No Requests Found
          </h3>
          <p className="text-gray-600">
            You haven&apos;t made any rental requests yet
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-100">
                  <TableCell className="font-semibold text-gray-700">
                    Property
                  </TableCell>
                  <TableCell className="font-semibold text-gray-700">
                    Rent Amount
                  </TableCell>
                  <TableCell className="font-semibold text-gray-700">
                    Request Status
                  </TableCell>
                  {user.role === "tenant" && (
                    <>
                      <TableCell className="font-semibold text-gray-700">
                        Landlord Contact
                      </TableCell>
                      <TableCell className="font-semibold text-gray-700">
                        Payment Status
                      </TableCell>
                    </>
                  )}
                  <TableCell className="font-semibold text-gray-700">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow
                    key={request._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <TableCell className="font-medium">
                      {request.location}
                    </TableCell>
                    <TableCell className="text-gray-900">
                      <span className="font-semibold">
                        ৳ {request.rentAmount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`
                          px-3 py-1 rounded-full font-medium
                          ${
                            request.status === "pending"
                              ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                              : request.status === "approved"
                              ? "bg-green-100 text-green-700 border border-green-200"
                              : "bg-red-100 text-red-700 border border-red-200"
                          }
                        `}
                      >
                        {request.status}
                      </Badge>
                    </TableCell>

                    {user.role === "tenant" && (
                      <>
                        <TableCell>
                          {request.status === "approved" ? (
                            <div className="flex items-center gap-2 text-gray-700">
                              <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <svg
                                  className="w-4 h-4 text-blue-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                  />
                                </svg>
                              </span>
                              <span className="font-medium">
                                {request.landlordPhone || "Not Provided"}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-400 italic">
                              Not available yet
                            </span>
                          )}
                        </TableCell>

                        <TableCell>
                          <Badge
                            className={`
                              px-3 py-1 rounded-full font-medium
                              ${
                                request.paymentStatus === "paid"
                                  ? "bg-green-100 text-green-700 border border-green-200"
                                  : "bg-orange-100 text-orange-700 border border-orange-200"
                              }
                            `}
                          >
                            {request.paymentStatus || "unpaid"}
                          </Badge>
                        </TableCell>
                      </>
                    )}

                    <TableCell>
                      {user.role === "tenant" && (
                        <Button
                          variant={
                            request.paymentStatus === "paid"
                              ? "outline"
                              : "default"
                          }
                          size="sm"
                          onClick={() => handleProceedToPayment(request)}
                          disabled={
                            request.status !== "approved" ||
                            request.paymentStatus === "paid"
                          }
                          className={`
                            rounded-full px-4 transition-all duration-200
                            ${
                              request.paymentStatus === "paid"
                                ? "text-green-600 border-green-200 hover:bg-green-50"
                                : "bg-blue-600 hover:bg-blue-700"
                            }
                          `}
                        >
                          {request.paymentStatus === "paid" ? (
                            <span className="flex items-center gap-2">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              Paid
                            </span>
                          ) : (
                            "Make Payment"
                          )}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Existing dialogs with enhanced styling */}
      <Dialog open={infoDialogOpen} onOpenChange={setInfoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Complete Your Information
            </DialogTitle>
          </DialogHeader>

          {currentRequest && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleInfoSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your full name"
                            {...field}
                            className="rounded-lg border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                          />
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
                        <FormLabel className="text-gray-700">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your phone number"
                            {...field}
                            className="rounded-lg border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                          />
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
                        <FormLabel className="text-gray-700">Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your complete address"
                            rows={3}
                            {...field}
                            className="rounded-lg border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                  >
                    Continue to Payment
                  </Button>
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
            <DialogTitle className="text-xl font-bold">
              Confirm Payment
            </DialogTitle>
          </DialogHeader>
          <div className="py-6 space-y-6">
            <Card className="border border-gray-100">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Payment Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Property Location</span>
                    <span className="font-medium text-gray-900">
                      {currentRequest?.location}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Amount to Pay</span>
                    <span className="text-lg font-semibold text-green-600">
                      ৳{currentRequest?.rentAmount?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator className="bg-gray-100" />

            <Card className="border border-gray-100">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      {currentRequest?.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      {currentRequest?.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      {currentRequest?.address}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                Please review your information carefully before proceeding with
                the payment.
              </p>
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={() => setPaymentDialogOpen(false)}
              className="rounded-lg border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmPayment}
              disabled={isProcessingPayment}
              className="rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              {isProcessingPayment ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </span>
              ) : (
                "Proceed to Payment"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewRequests;
