"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Banner from "../../../../assets/Banner.jpg";
import NMContainer from "@/components/ui/core/NMContainer";
import Link from "next/link";
import { Search, ArrowRight, Home, Users, Building } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  const stats = [
    { label: "Active Listings", value: "500+", icon: Building },
    { label: "Happy Users", value: "1000+", icon: Users },
    { label: "Cities Covered", value: "10+", icon: Home },
  ];

  return (
    <NMContainer>
      <div className="relative rounded-3xl mt-6 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="grid lg:grid-cols-2 min-h-[calc(100vh-120px)]">
          {/* Left Content Section */}
          <div className="px-6 lg:px-12 py-12 flex flex-col justify-center relative z-10">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-sm font-medium text-blue-800">
                <Home className="w-4 h-4" />
                Find Your Dream Home Today
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-4xl lg:text-7xl font-bold leading-tight mb-6 text-gray-900 font-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Your Perfect
              <br />
              Home Awaits
              <br />
              <span className="text-blue-600">With BasaFinder</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg text-gray-600 max-w-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Connecting landlords and tenants seamlessly. Discover, rent, and
              manage properties with ease. Your ideal rental journey starts
              here.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/listings">
                <Button
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Search Properties
                </Button>
              </Link>
              <Link href="/listings">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full bg-white hover:bg-blue-50 text-blue-600 border-2 border-blue-200 px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
                >
                  View All Listings
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100"
                >
                  <stat.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Decorative Gradient */}
            <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-48 h-48 bg-blue-100 rounded-full blur-3xl" />
            <div className="absolute -left-16 bottom-16 w-32 h-32 bg-blue-50 rounded-full blur-3xl" />
          </div>

          {/* Right Image Section */}
          <div className="relative h-full">
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <Image
                src={Banner.src}
                alt="Luxury Home"
                fill
                className="object-cover object-center"
                priority
              />
              {/* Image Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-white/90 lg:to-white" />
            </motion.div>
          </div>
        </div>
      </div>
    </NMContainer>
  );
};

export default HeroSection;
