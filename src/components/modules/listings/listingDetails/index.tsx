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
  ChevronDown,
  Mail,
  MessageCircle,
  PhoneCall,
  
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
      <Card className=" bg-white rounded-2xl shadow-md overflow-hidden">
       <div className="flex flex-col md:flex-row  justify-center items-start gap-6 px-4 py-3">
         {/* Image Gallery */}
         <div className="relative w-full md:w-[55%]">
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
                  className="object-cover rounded-md"
                  priority={idx === 0}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Price Badge */}
          <div className="absolute top-6 left-6 z-10">
            <Badge className="px-4 py-2 bg-white/95 backdrop-blur-sm text-gray-900 shadow-lg rounded-lg text-lg font-semibold">
              ৳{listing.rentAmount.toLocaleString()}
              <span className="text-gray-500 text-sm ml-1">/month</span>
            </Badge>
          </div>

          {/* Add Q&A section before the sidebar */}
            <div className="mt-8 space-y-4 border rounded-lg p-6 bg-white">
              <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
              
              <Collapsible className="space-y-2">
                <CollapsibleTrigger className="flex justify-between w-full px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <span className="font-medium">How does the rental request process work?</span>
                  </div>
                  <ChevronDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 py-2">
                  <ol className="list-decimal ml-4 space-y-2">
                    <li>Browse and select your desired accommodation</li>
                    <li>Click on &quot;Request to Rent&quot; button</li>
                    <li>Fill in your rental duration and any special requirements</li>
                    <li>Submit your request and wait for owner approval</li>
                    <li>Once approved, proceed with the payment</li>
                  </ol>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible className="space-y-2">
                <CollapsibleTrigger className="flex justify-between w-full px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <span className="font-medium">What is the payment procedure?</span>
                  </div>
                  <ChevronDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 py-2">
                  <ul className="list-disc ml-4 space-y-2">
                    <li>We accept various payment methods including credit cards and bank transfers</li>
                    <li>A security deposit may be required (refundable)</li>
                    <li>Payment is processed securely through our platform</li>
                    <li>Monthly rent is due on the agreed date each month</li>
                  </ul>
                </CollapsibleContent>
              </Collapsible>

              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <p>Chat with us through the messaging system</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <p>Email: support@basafinder.com</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <PhoneCall className="h-5 w-5 text-primary" />
                    <p>Call: +123 456 7890</p>
                  </div>
                </div>
              </div>
            </div>
        </div>

        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col justify-center gap-6">
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
       </div>
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
