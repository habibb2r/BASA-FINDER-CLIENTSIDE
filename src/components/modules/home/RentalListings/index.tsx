import { Button } from "@/components/ui/button";
import ListingCard from "@/components/ui/core/ListingCard";
import NMContainer from "@/components/ui/core/NMContainer";
import { getAllListings } from "@/services/Listings";
import { TRentalListing } from "@/types";
import Link from "next/link";
import { Building } from "lucide-react";

const RentalListings = async () => {
  const { data: listings } = await getAllListings();

  return (
    <section className="bg-gray-50/50 py-20">
      <NMContainer>
        <div className="flex flex-col space-y-2 mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                Latest Listings
              </h2>
            </div>
            <Link href="/listings">
              <Button
                variant="outline"
                className="rounded-full px-6 hover:bg-blue-50 border-blue-200 text-blue-700 hover:text-blue-800 transition-colors"
              >
                View All Listings
              </Button>
            </Link>
          </div>
          <p className="text-gray-500 max-w-2xl">
            Discover our newest rental properties. Each listing is verified for
            quality and value.
          </p>
        </div>

        {listings && listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings
              .slice(0, 8)
              .map((listing: TRentalListing & { _id: string }) => (
                <ListingCard
                  key={listing._id}
                  listing={{
                    id: listing._id,
                    location: listing.location,
                    rentAmount: listing.rentAmount,
                    bedrooms: listing.bedrooms,
                    amenities: listing.amenities,
                    description: listing.description,
                    images: listing.images,
                  }}
                />
              ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No listings available
            </h3>
            <p className="text-gray-500">Check back later for new properties</p>
          </div>
        )}
      </NMContainer>
    </section>
  );
};

export default RentalListings;
