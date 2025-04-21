import { Button } from "@/components/ui/button";

import Banner from "../../../../assets/Banner.jpg";
import NMContainer from "@/components/ui/core/NMContainer";
import Link from "next/link";

const HeroSection = () => {
  return (
    <NMContainer>
      <div
        className="relative bg-cover bg-center bg-no-repeat rounded-3xl mt-10 overflow-hidden"
        style={{
          backgroundImage: `url(${Banner.src})`,
          height: "600px", // Adjust height as needed
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50">
          {" "}
          {/* Optional overlay for better text visibility */}
          <div className="grid grid-cols-2 items-center gap-4 h-full">
            <div className="pl-12 text-white z-10">
              {" "}
              {/* Ensure text is visible */}
              <h1 className="text-4xl font-bold leading-normal text-white">
                Find Your Perfect Home, <br />
                Simplified with <br />
                BasaFinder
              </h1>
              <p className="my-5 text-gray-200">
                Connecting landlords and tenants seamlessly. Discover, rent, and
                manage properties with ease. Your ideal rental journey starts
                here.
              </p>
              <Link href="/listings">
                <Button
                  size="lg"
                  className="mr-5 mb-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Rent Now
                </Button>
              </Link>
              <Link href="/listings">
                <Button
                  size="lg"
                  className="rounded-full bg-white text-black hover:bg-blue-500 hover:text-white"
                >
                  All Listings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </NMContainer>
  );
};

export default HeroSection;
