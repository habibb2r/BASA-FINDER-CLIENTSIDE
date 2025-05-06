"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { TRentalListing } from "@/types";
import {
  MapPin,
  BedDouble,
  CalendarDays,
  Clock,
  FileText,
  Check,
  Bath,
  Home,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useUser } from "@/context/UserContext";
import { useRentalRequest } from "@/context/RentalRequestContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const ListingDetails = ({ listing }: { listing: TRentalListing }) => {
  const { user } = useUser();
  const { setListing } = useRentalRequest();
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [moveInDate, setMoveInDate] = useState("");
  const [rentalDuration, setRentalDuration] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");

  // ✅ Handle request button click
  const handleRequestRent = () => {
    setModalOpen(true);
  };

  // ✅ Handle form submission
  const handleSubmitRequest = () => {
    if (!moveInDate || !rentalDuration) {
      toast.error("Please provide move-in date and rental duration.");
      return;
    }

    // Store data in context and navigate
    setListing({
      ...listing, // Keep existing listing properties
      moveInDate,
      rentalDuration,
      specialRequirements,
    } as TRentalListing & {
      moveInDate?: string;
      rentalDuration?: string;
      specialRequirements?: string;
    });

    setModalOpen(false);
    router.push("/tenants/create");
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <Card className="bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Image Gallery */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="w-full aspect-[16/9] md:aspect-[2/1] max-h-[600px]"
          >
            {listing.images.map((image, idx) => (
              <SwiperSlide key={idx} className="relative">
                <Image
                  src={image.replace("http://", "https://") || "/placeholder.jpg"}
                  alt={`Listing Image ${idx}`}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Price Badge */}
          <div className="absolute bottom-6 left-6 z-10">
            <Badge className="px-4 py-2 bg-white/95 backdrop-blur-sm text-gray-900 shadow-lg rounded-lg text-lg font-semibold">
              ৳{listing.rentAmount.toLocaleString()}
              <span className="text-gray-500 text-sm ml-1">/month</span>
            </Badge>
          </div>
        </div>

        <CardContent className="p-6 md:p-8">
          <div className="grid md:grid-cols-[2fr,1fr] gap-8">
            {/* Main Content */}
            <div className="space-y-6">
              {/* Location and Title */}
              <div>
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">{listing.location}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{listing.description}</h1>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-y border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <BedDouble className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bedrooms</p>
                    <p className="font-semibold text-gray-900">{listing.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Bath className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bathrooms</p>
                    <p className="font-semibold text-gray-900">2</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Home className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Property Type</p>
                    <p className="font-semibold text-gray-900">House</p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 gap-3">
                  {listing.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="p-1 rounded-full bg-green-50">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-600">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24 bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-6">Request this property</h3>
                {user?.role === "tenant" ? (
                  <Button
                    onClick={handleRequestRent}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-12 font-medium transition-colors"
                  >
                    Request Rental
                  </Button>
                ) : (
                  <div className="text-center text-gray-500 text-sm">
                    Please login as a tenant to request this property
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rental Request Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">Request Rental</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Move-In Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Move-in Date</label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="date"
                  value={moveInDate}
                  onChange={(e) => setMoveInDate(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Rental Duration */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Rental Duration</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="e.g., 6 months"
                  value={rentalDuration}
                  onChange={(e) => setRentalDuration(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Special Requirements */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Special Requirements</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <Textarea
                  placeholder="Any special requirements or notes..."
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  className="pl-10 min-h-[100px]"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={() => setModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitRequest}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListingDetails;
