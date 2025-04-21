"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyPayment } from "@/services/Payments";
import { 
  Card, 
  CardContent,
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, Home, FileText, Mail, CreditCard, Save, DollarSign, ArrowRight } from "lucide-react";

// Type for payment data
interface PaymentData {
  order_id: string;
  name: string;
  email: string;
  method: string;
  is_verify: boolean;
  invoice_no: string;
  amount: number;
  currency: string;
  sp_message: string;
}

export default function VerifyPayment() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");
  
  const [isLoading, setIsLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return; // Prevent unnecessary API call
    const fetchPaymentVerification = async () => {
      if (!orderId) {
        setError("No order ID provided");
        setIsLoading(false);
        return;
      }

      try {
        const response = await verifyPayment(orderId);
        
        if (response.success && response.data?.length > 0) {
          setPaymentData(response.data[0]);
        } else {
          setError(response.message || "Failed to verify payment");
        }
      } catch (err) {
        setError("An error occurred while verifying payment");
        console.error("Payment verification error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentVerification();
  }, [orderId]);

  const handleHomeRedirect = () => {
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-blue-500">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    // <div className="min-h-screen flex justify-center items-center p-6 bg-gradient-to-br from-blue-50 to-blue-600">
    <div className="min-h-screen flex justify-center items-center p-6 bg-gradient-to-br from-blue-500 to-cyan-600">
      <Card className="w-full max-w-3xl shadow-xl rounded-xl border border-blue-200 overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className={`mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full shadow-lg ${paymentData?.is_verify ? 'bg-blue-900' : 'bg-red-600'}`}>
            {paymentData?.is_verify ? (
              <CheckCircle className="w-8 h-8 text-white" />
            ) : (
              <XCircle className="w-8 h-8 text-white" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold text-blue-900">
            Payment Verification
          </CardTitle>
          <CardDescription className="text-gray-600 mt-1">
            {paymentData?.is_verify 
              ? "Your payment has been successfully verified!" 
              : error || "Payment verification failed. Please check your order details."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {paymentData ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 p-2">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">Transaction ID:</span>
                <span className="text-sm">{paymentData.order_id}</span>
              </div>

              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">Customer:</span>
                <span>{paymentData.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">Email:</span>
                <span className="text-sm">{paymentData.email}</span>
              </div>

              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">Payment Method:</span>
                <span>{paymentData.method}</span>
              </div>

              <div className="flex items-center gap-2">
                {paymentData.is_verify ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="font-semibold">Payment Status:</span>
                <span className={paymentData.is_verify ? "text-green-500" : "text-red-500"}>
                  {paymentData.is_verify ? "Verified ✅" : "Not Verified ❌"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Save className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">Invoice No:</span>
                <span>{paymentData.invoice_no}</span>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">Amount:</span>
                <span className="text-green-600 font-semibold">
                  ৳{paymentData.amount} {paymentData.currency}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">Transaction Status:</span>
                <span>{paymentData.sp_message}</span>
              </div>
            </div>
          ) : (
            <div className="text-center text-red-500 text-lg font-bold p-4">
              No payment details found. Please check your order ID.
            </div>
          )}

          <div className="mt-6 text-center pb-2">
            <Button 
              onClick={handleHomeRedirect}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-semibold rounded-lg"
            >
              Go to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}