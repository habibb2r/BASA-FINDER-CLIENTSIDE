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
import ListingCard from "@/components/ui/core/ListingCard";
import NMContainer from "@/components/ui/core/NMContainer";
import { getAllListings } from "@/services/Listings";
import { TRentalListing } from "@/types";

type ListingWithId = TRentalListing & { _id: string };

interface RentalListingsProps {
  initialListings: ListingWithId[];
}

const RentalListings: React.FC<RentalListingsProps> = ({ initialListings }) => {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [bedrooms, setBedrooms] = useState("any");
  const [filteredListings, setFilteredListings] = useState<ListingWithId[]>(initialListings);

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

  return (
    <NMContainer className="my-20">
      {/* Filter Section */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Filter Rental Properties</h2>
        <div className="grid gap-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1">
          {/* Location Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <Input
              placeholder="e.g., Dhaka, Chattogram..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium mb-2">Price Range</label>
            <div className="px-1">
              <Slider
                min={0}
                max={50000}
                step={1000}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value)}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>৳{priceRange[0].toLocaleString()}</span>
                <span>৳{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Bedrooms Select */}
          <div>
            <label className="block text-sm font-medium mb-2">Bedrooms</label>
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col justify-end gap-3">
            <Button onClick={handleSearch} className="bg-primary text-white hover:bg-primary/90">
              Search
            </Button>
            <Button onClick={handleReset} variant="outline" className="text-primary border-primary">
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Listings Header */}
      <div className="flex items-center justify-center mb-6">
        <h2 className="text-3xl font-bold">All Listings</h2>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="col-span-full text-center py-10">
            <p className="text-lg text-muted-foreground">
              No listings match your search criteria.
            </p>
          </div>
        )}
      </div>
    </NMContainer>
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
