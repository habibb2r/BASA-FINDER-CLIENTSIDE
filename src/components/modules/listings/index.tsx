import ListingCard from "@/components/ui/core/ListingCard";
import { TRentalListing } from "@/types";

import { Button } from "@/components/ui/button";
import { Building, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const AllListings = ({ listings }: { listings: TRentalListing[] }) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div className="bg-gradient-to-b from-white to-blue-50/30 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="py-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Building className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Available Properties
              </h1>
            </div>

            {/* Mobile Filter Button */}
            <Sheet
              open={isMobileFilterOpen}
              onOpenChange={setIsMobileFilterOpen}
            >
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="lg:hidden flex items-center gap-2 rounded-full border-blue-200 text-blue-700"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
                
              </SheetContent>
            </Sheet>
          </div>
          <p className="text-gray-600 max-w-2xl">
            Browse through our curated collection of properties. Use filters to
            find your perfect match.
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-full max-w-[300px] bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-24 h-fit overflow-hidden">

          </div>

          {/* Listings Grid */}
          <div className="flex-1">
            {listings && listings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing: TRentalListing & { _id: string }) => (
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
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <Building className="w-12 h-12 text-blue-600/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No properties found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or check back later for new
                  listings
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllListings;
