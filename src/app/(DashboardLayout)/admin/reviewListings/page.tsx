"use client";

import { useEffect, useState } from "react";
import { getAllListings } from "@/services/Listings";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { IUser, TRentalListing } from "@/types";
import { getSingleUser } from "@/services/Users";

const ReviewListings = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  type ListingWithId = TRentalListing & { _id: string; landlordId: string };
  const [listings, setListings] = useState<ListingWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [landlords, setLandlords] = useState<{ [key: string]: IUser }>({});

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data } = await getAllListings();
        setListings(data || []);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings([]);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchLandlordDetails() {
      const landlordData: { [key: string]: IUser } = {};
      await Promise.all(
        listings.map(async (listing) => {
          if (!landlords[listing.landlordId]) {
            try {
              const response = await getSingleUser(listing.landlordId);
              // Extract the user data from the response
              landlordData[listing.landlordId] = response.data;
            } catch (error) {
              console.error("Error fetching landlord details:", error);
            }
          }
        })
      );
      setLandlords((prev) => ({ ...prev, ...landlordData }));
    }
    if (listings.length > 0) {
      fetchLandlordDetails();
    }
  }, [listings, landlords]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">All Listings Overview</h2>

      {loading ? (
        <p className="text-center text-gray-500 flex items-center justify-center">
          <Loader2 className="animate-spin mr-2" />
          Loading listings...
        </p>
      ) : listings.length === 0 ? (
        <p className="text-center text-gray-500">No listings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead>Rent Amount</TableHead>
                <TableHead>Bedrooms</TableHead>
                <TableHead>Amenities</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Landlord Name</TableHead>
                <TableHead>Landlord Email</TableHead>
                <TableHead>Landlord Phone No.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((listing) => (
                <TableRow key={listing._id}>
                  <TableCell>{listing.location}</TableCell>
                  <TableCell>৳ {listing.rentAmount.toLocaleString()}</TableCell>
                  <TableCell>{listing.bedrooms}</TableCell>
                  <TableCell>{listing.amenities.join(", ")}</TableCell>
                  <TableCell>
                    {listing.isAvailable ? "Available" : "Not Available"}
                  </TableCell>
                  <TableCell>
                    {new Date(listing.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {landlords[listing.landlordId]?.name || "Loading..."}
                  </TableCell>
                  <TableCell>
                    {landlords[listing.landlordId]?.email || "Loading..."}
                  </TableCell>
                  <TableCell>
                    {landlords[listing.landlordId]?.phone || "N/A"}
                  </TableCell>

                
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ReviewListings;