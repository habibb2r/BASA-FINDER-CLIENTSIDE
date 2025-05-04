"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bath, BedDouble, MapPin, Home } from "lucide-react";
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
  const imageUrl =
    listing.images[0]?.replace("http://", "https://") || "/placeholder.jpg";

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={`${listing.location} Property`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="transition-transform duration-500 group-hover:scale-105 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Price Badge */}
        <div className="absolute top-4 left-4 z-10">
          <Badge className="px-4 py-2 bg-white/95 backdrop-blur-sm text-gray-900 font-semibold shadow-lg rounded-full text-base">
            ৳{listing.rentAmount.toLocaleString()}
          </Badge>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Location */}
        <div className="flex items-start gap-2 mb-3">
          <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 leading-tight min-h-[48px]">
            {listing.location}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed min-h-[40px]">
          {listing.description}
        </p>

        {/* Features */}
        <div className="flex items-center gap-6 mb-4 text-gray-700">
          <div className="flex items-center gap-2">
            <BedDouble className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium">{listing.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium">2 Baths</span>
          </div>
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium">House</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-5 min-h-[32px]">
          {listing.amenities.slice(0, 3).map((amenity, idx) => (
            <Badge
              key={idx}
              variant="default"
              className="bg-blue-50/50 text-blue-700 hover:bg-blue-100 transition-colors duration-200 px-3 py-1"
            >
              {amenity}
            </Badge>
          ))}
          {listing.amenities.length > 3 && (
            <Badge
              variant="default"
              className="text-gray-600 hover:bg-gray-50 transition-colors duration-200 px-3 py-1"
            >
              +{listing.amenities.length - 3} more
            </Badge>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <Link href={`/listings/${listing?.id}`} className="block">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl py-6 font-medium shadow-lg hover:shadow-xl transition-all duration-300">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
