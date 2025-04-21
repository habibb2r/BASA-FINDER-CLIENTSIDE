// Payment Model (For Rent Payments)
export interface TRentalPayment {
    _id: string;
    tenantEmail: string;
    listingId: string;
    requestId: string;
    amount: number;
    status: "Pending" | "Paid" | "Failed" | "Cancelled";
    transaction: {
        id: string;
        transactionStatus: string;
        bank_status: string;
        sp_code: string;
        sp_message: string;
        method: string;
        date_time: string;
    };
    createdAt: string;
    updatedAt: string;
}
