"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bath, BedDouble, MapPin, Home, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  const imageUrl = listing.images[0]?.replace("http://", "https://") || "/placeholder.jpg";

  return (
    <div className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-blue-100">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${listing.location} Property`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.jpg";
          }}
        />
        
        {/* Overlay and Price Badge */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
        <div className="absolute top-4 left-4">
          <Badge className="px-3 py-1.5 bg-white font-semibold text-gray-900 shadow-lg rounded-lg text-sm backdrop-blur-sm">
            ৳{listing.rentAmount.toLocaleString()}
            <span className="text-gray-500 text-xs ml-1">/month</span>
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Location */}
        <div className="flex items-start gap-2 mb-3">
          <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
          <h3 className="text-base font-medium text-gray-900 line-clamp-2">
            {listing.location}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {listing.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1.5">
            <BedDouble className="w-4 h-4 text-blue-500" />
            <span className="text-gray-600">{listing.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-blue-500" />
            <span className="text-gray-600">2 Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Home className="w-4 h-4 text-blue-500" />
            <span className="text-gray-600">House</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {listing.amenities.slice(0, 3).map((amenity, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-medium"
            >
              <Check className="w-3 h-3" />
              {amenity}
            </div>
          ))}
          {listing.amenities.length > 3 && (
            <div className="inline-flex items-center px-2 py-1 bg-gray-50 text-gray-600 rounded-md text-xs font-medium">
              +{listing.amenities.length - 3} more
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <Link href={`/listings/${listing?.id}`} className="block">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-10 font-medium transition-colors">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
