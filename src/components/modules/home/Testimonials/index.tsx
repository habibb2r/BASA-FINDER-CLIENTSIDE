"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, Home, Heart, User } from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    id: 1,
    quote:
      "Basa Finder made my apartment hunt incredibly smooth. Found my perfect home in just a week!",
    name: "Aminul Islam",
    location: "Dhaka",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 5,
    highlight: "Quick Search",
  },
  {
    id: 2,
    quote:
      "The detailed property listings and transparent information saved me so much time and hassle.",
    name: "Fatima Rahman",
    location: "Chittagong",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 4,
    highlight: "Comprehensive Details",
  },
  {
    id: 3,
    quote:
      "As a student, I found affordable and safe housing options perfectly matched to my budget.",
    name: "Rakib Hassan",
    location: "Sylhet",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 5,
    highlight: "Budget-Friendly",
  },
  {
    id: 4,
    quote:
      "The map-based search helped me find properties exactly in the neighborhoods I wanted.",
    name: "Tasnim Ahmed",
    location: "Rajshahi",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    rating: 4,
    highlight: "Location Precision",
  },
  {
    id: 5,
    quote:
      "Never thought finding a rental could be this easy. Basa Finder is a game-changer!",
    name: "Sharmin Akhter",
    location: "Khulna",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    rating: 5,
    highlight: "User-Friendly",
  },
  {
    id: 6,
    quote:
      "The filtering options are incredibly detailed. I could find exactly what I was looking for.",
    name: "Imran Khan",
    location: "Barisal",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    rating: 4,
    highlight: "Advanced Filters",
  },
];

const Testimonials = () => {
  return (
    // <div className="py-16 px-6 bg-gradient-to-br from-cyan-100 to-blue-300">
    <div className="py-16 px-6 ">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-800 flex justify-center items-center gap-3">
          <Home className="w-8 h-8 text-blue-500" /> Trusted by Happy Users
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Hear from our satisfied users who found their perfect home through
          Basa Finder
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="p-6 border-l-4 border-blue-600 shadow-md hover:shadow-lg transition-transform hover:scale-105"
          >
            <CardContent>
              <p className="text-gray-700 italic mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-blue-500" /> {testimonial.quote}
              </p>

              {/* User Info */}
              <div className="flex items-center mt-4">
                <Avatar className="mr-4 border-2 border-blue-300">
                  <AvatarImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                  <AvatarFallback>
                    <User className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-blue-600 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Rating and Highlight */}
              <div className="mt-4 flex justify-between items-center">
                <div className="flex">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${
                        index < testimonial.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {testimonial.highlight}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <p className="text-xl text-gray-700 mb-4">
          Ready to find your dream home?
        </p>
        <Link href="/listings">
          <Button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold shadow-md">
            Start Your Search
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Testimonials;
