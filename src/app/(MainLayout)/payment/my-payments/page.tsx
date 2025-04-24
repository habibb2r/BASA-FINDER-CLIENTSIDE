'use client'

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { getMyPayments } from "@/services/Payments";

// Define the interface for a payment entry
interface Payment {
  _id: string;
  name: string;
  address: string;
  phone: string;
  tenantEmail: string;
  amount: number;
  transaction: {
    id: string;
    method: string;
    bank_status: string;
    date_time: string;
  };
  status: string;
  createdAt: string;
}

// Define the response structure
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface PaymentResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    result: Payment[];
  };
}


const PaymentHistory = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await getMyPayments();
        if (response.success) {
          setPayments(response.data.result || []);
        } else {
          setError(response.message);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to fetch payment history");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-center md:text-2xl">Payment History</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : payments.length === 0 ? (
        <p className="text-center md:text-xl">No payments found.</p>
      ) : (
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment._id}>
                    <TableCell>{payment.name}</TableCell>
                    <TableCell>{payment.address}</TableCell>
                    <TableCell>{payment.phone}</TableCell>
                    <TableCell>{payment.tenantEmail}</TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>{payment?.transaction?.method}</TableCell>
                    <TableCell>{payment.status}</TableCell>
                    <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaymentHistory;