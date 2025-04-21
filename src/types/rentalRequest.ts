export interface TRentalRequest {
    _id: string;
    tenantId: string;  // ID of the tenant making the request
    listingId: string;  // ID of the rental listing being requested
    status: "pending" | "approved" | "rejected";  // Request status
    message?: string;  // Optional message from the tenant
    createdAt: string;
    updatedAt: string;

    location: string;
    rentAmount: number;
};