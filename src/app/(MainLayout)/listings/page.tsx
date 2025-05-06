'use client';

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import ListingCard from "@/components/ui/core/ListingCard";
import NMContainer from "@/components/ui/core/NMContainer";
import { getAllListings } from "@/services/Listings";
import { TRentalListing } from "@/types";
import { Search, X, SlidersHorizontal, MapPin } from "lucide-react";

type ListingWithId = TRentalListing & { _id: string };

interface RentalListingsProps {
  initialListings: ListingWithId[];
}

const RentalListings: React.FC<RentalListingsProps> = ({ initialListings }) => {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [bedrooms, setBedrooms] = useState("any");
  const [filteredListings, setFilteredListings] = useState<ListingWithId[]>(initialListings);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    setFilteredListings(initialListings);
  }, [initialListings]);

  const handleSearch = () => {
    const filtered = initialListings.filter((listing) => {
      const locationMatch =
        location === "" ||
        listing.location.toLowerCase().includes(location.toLowerCase());

      const priceMatch =
        listing.rentAmount >= priceRange[0] &&
        listing.rentAmount <= priceRange[1];

      const bedroomsMatch =
        bedrooms === "any" || listing.bedrooms.toString() === bedrooms;

      return locationMatch && priceMatch && bedroomsMatch;
    });

    setFilteredListings(filtered);
  };

  const handleReset = () => {
    setLocation("");
    setPriceRange([0, 50000]);
    setBedrooms("any");
    setFilteredListings(initialListings);
  };

  const FilterContent = () => (
    <div className="w-full">
      {/* Location Input */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Location
        </label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Enter city or area..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-12 h-12 w-full bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-all"
          />
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Price Range
        </label>
        <div className="px-2">
          <Slider
            min={0}
            max={50000}
            step={1000}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value)}
            className="my-6"
          />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center px-4 py-2 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-blue-600">৳{priceRange[0].toLocaleString()}</span>
            </div>
            <div className="flex-1 mx-4 border-t border-dashed border-gray-300"></div>
            <div className="flex items-center px-4 py-2 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-blue-600">৳{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bedrooms Select */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Bedrooms
        </label>
        <Select value={bedrooms} onValueChange={setBedrooms}>
          <SelectTrigger className="h-12 w-full bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-all">
            <SelectValue placeholder="Select number of bedrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="1">1 Bedroom</SelectItem>
            <SelectItem value="2">2 Bedrooms</SelectItem>
            <SelectItem value="3">3 Bedrooms</SelectItem>
            <SelectItem value="4">4 Bedrooms</SelectItem>
            <SelectItem value="5">5+ Bedrooms</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Button 
          onClick={() => {
            handleSearch();
            setIsMobileFilterOpen(false);
          }}
          className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Search className="w-5 h-5 mr-2" />
          Search
        </Button>
        <Button 
          onClick={() => {
            handleReset();
            setIsMobileFilterOpen(false);
          }}
          variant="outline" 
          className="flex-1 h-12 border-2 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-300"
        >
          <X className="w-5 h-5 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NMContainer className="py-8 lg:py-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Find Your Perfect Home</h1>
            <p className="text-gray-600">Discover properties that match your preferences</p>
          </div>
          
          {/* Mobile Filter Button */}
          <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                className="lg:hidden border-2 border-gray-200 hover:bg-gray-50 rounded-xl h-12 px-6"
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-lg border-r">
              <SheetHeader className="mb-8">
                <SheetTitle className="text-2xl font-bold">Filters</SheetTitle>
                <SheetDescription>
                  Refine your search to find the perfect property
                </SheetDescription>
              </SheetHeader>
              <FilterContent />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Section */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Filter Properties</h2>
              <FilterContent />
            </div>
          </div>

          {/* Results Section */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  {filteredListings.length > 0 
                    ? `${filteredListings.length} Properties Available`
                    : 'No Properties Found'}
                </h2>
              </div>

              {/* Listings Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredListings.length > 0 ? (
                  filteredListings.map((listing, idx) => (
                    <ListingCard
                      key={idx}
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
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-16">
                    <Search className="w-12 h-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No matches found</h3>
                    <p className="text-gray-500 text-center max-w-md">
                      Try adjusting your search criteria or removing some filters
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </NMContainer>
    </div>
  );
};

export default function RentalListingsPage() {
  const [initialListings, setInitialListings] = useState<ListingWithId[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getAllListings();
        setInitialListings(data || []);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setInitialListings([]);
      }
    }

    fetchData();
  }, []);

  return <RentalListings initialListings={initialListings} />;
}
