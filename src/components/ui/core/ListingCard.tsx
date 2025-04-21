import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { Heart } from "lucide-react";

interface ListingCardProps {
  listing: {
    id: string;
    location: string;
    rentAmount: number;
    bedrooms: number;
    amenities: string[];
    description: string;
    images: string[];
  };
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <div className="border rounded-3xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-300">
      <div className="relative w-full h-56">
        <Image
          src={
            listing.images[0].replace("http://", "https://") ||
            "/placeholder.jpg"
          }
          // src="https://res.cloudinary.com/dd3w1s9gq/image/upload/v1741706390/phmc6upqdltab6ncwwiv.jpg"

          alt="Listing Image"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
          {/* <Heart className="text-red-500 w-5 h-5" /> */}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800">
          {listing.location}
        </h3>
        <p className="text-gray-500 text-sm mb-3">{listing.description}</p>

        <div className="flex justify-between items-center text-gray-600 mb-4">
          <span className="text-lg font-bold text-primary">
            ৳{listing.rentAmount}
          </span>
          <span className="text-sm">{listing.bedrooms} Bedrooms</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {listing.amenities.slice(0, 3).map((amenity, idx) => (
            <span
              key={idx}
              className="text-xs bg-blue-100 text-blue-500 px-2 py-1 rounded-full"
            >
              {amenity}
            </span>
          ))}
          {listing.amenities.length > 3 && (
            <span className="text-xs">+ more</span>
          )}
        </div>
        {/* <Link href='listingId'> */}
        <Link href={`/listings/${listing?.id}`} passHref>
          <Button className="w-full bg-gradient-to-r from-blue-700 to-cyan-500 text-white rounded-full hover:opacity-90">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;
