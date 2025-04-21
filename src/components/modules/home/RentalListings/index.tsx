import { Button } from "@/components/ui/button";
import ListingCard from "@/components/ui/core/ListingCard";
import NMContainer from "@/components/ui/core/NMContainer";
import { getAllListings } from "@/services/Listings";
import { TRentalListing } from "@/types";
import Link from "next/link";

const RentalListings = async () => {
  const { data: listings } = await getAllListings();
  // console.log('f-Listings :', listings);

  return (
    <NMContainer className="my-20">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Latest Listings</h2>
        <Link href="/listings">
          <Button variant="outline" className="rounded-full">
            View All
          </Button>
        </Link>
      </div>
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
    </NMContainer>
  );
};

export default RentalListings;
