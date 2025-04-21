export interface TRentalListing {
    _id: string;
    landlordId: string;  // ID of the landlord who owns the property
    location: string;  // Address or city
    description: string;  // Property details
    rentAmount: number;  // Monthly rent price
    bedrooms: number;  // Number of bedrooms
    bathrooms: number;  // Number of bathrooms
    areaSize: number;  // Size in square feet or meters
    images: string[];  // Array of image URLs
    amenities: string[];  // List of amenities (Wi-Fi, Parking, etc.)
    isAvailable: boolean;  // Availability status
    isDeleted: boolean;  // Soft delete status
    createdAt: string;
    updatedAt: string;

    // optional fields for rental request
    moveInDate?: string;
    rentalDuration?: string;
    specialRequirements?: string;
};