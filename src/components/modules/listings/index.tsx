import ListingCard from "@/components/ui/core/ListingCard";
import { TRentalListing } from "@/types";
// import FilterSidebar from "./FilterSidebar";
import FilterSidebar from "./filterSidebar";

const AllListings = ({ listings }: { listings: TRentalListing[] }) => {
  return (
    <div className="flex gap-8 my-10">
      {/* Filter Sidebar */}
      <div className="w-full max-w-sm">
        <FilterSidebar />
      </div>

      {/* Listings Grid */}
      <div className="flex-1">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings?.map((listing: TRentalListing, idx: number) => (
            <ListingCard key={idx} listing={listing} />
          ))}
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {listings
            ?.slice(0, 6)
            .map((listing: TRentalListing & { _id: string }, idx: number) => (
              <ListingCard
                key={idx}
                listing={{
                  id: listing._id, // ✅ Mapping _id to id
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
      </div>
    </div>
  );
};

export default AllListings;
