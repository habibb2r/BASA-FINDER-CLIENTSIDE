"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, MessageCircle, User } from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    id: 1,
    quote:
      "বাসা ফাইন্ডার আমার জন্য একটি চমৎকার স্থান। আমি মাত্র কয়েকদিনেই আমার পছন্দের বাসা খুঁজে পেয়েছি!",
    englishQuote:
      "Found my ideal apartment through Basa Finder's verified listings. The whole process was smooth and trustworthy!",
    name: "Tanvir Rahman",
    profession: "Software Engineer",
    location: "Gulshan, Dhaka",
    avatar: "/testimonials/user1.jpg",
    rating: 5,
    highlight: "Quick & Easy",
  },
  {
    id: 2,
    quote:
      "সব তথ্য খুব পরিষ্কার ভাবে দেওয়া, যা বাসা খোঁজার কাজটা অনেক সহজ করে দিয়েছে।",
    englishQuote:
      "As a working professional, I appreciate how detailed and organized the property information is. Saved me countless hours!",
    name: "Fahmida Akter",
    profession: "Bank Executive",
    location: "Dhanmondi, Dhaka",
    avatar: "/testimonials/user2.jpg",
    rating: 5,
    highlight: "Well Organized",
  },
  {
    id: 3,
    quote:
      "ছাত্র হিসেবে বাজেট অনুযায়ী বাসা খুঁজে পাওয়া কঠিন ছিল, কিন্তু বাসা ফাইন্ডার সেটা সহজ করে দিয়েছে।",
    englishQuote:
      "Perfect for students! Found affordable housing near my university with all the amenities I needed.",
    name: "Mehedi Hassan",
    profession: "University Student",
    location: "Mohammadpur, Dhaka",
    avatar: "/testimonials/user3.jpg",
    rating: 4,
    highlight: "Student Friendly",
  },
  {
    id: 4,
    quote:
      "ম্যাপ ভিত্তিক সার্চ সিস্টেম অসাধারণ, আমি ঠিক আমার পছন্দের এলাকায় বাসা খুঁজে পেয়েছি।",
    englishQuote:
      "The map-based search is brilliant! Found a place in my preferred neighborhood with great accuracy.",
    name: "Tasnia Farin",
    profession: "Marketing Manager",
    location: "Bashundhara, Dhaka",
    avatar: "/testimonials/user4.jpg",
    rating: 5,
    highlight: "Location Perfect",
  },
  {
    id: 5,
    quote:
      "ভাড়াটিয়া হিসেবে নিরাপদ এবং বিশ্বস্ত প্ল্যাটফর্ম খুঁজছিলাম, বাসা ফাইন্ডার সেটাই দিয়েছে।",
    englishQuote:
      "Finally, a trustworthy platform for tenants! Verified listings gave me peace of mind.",
    name: "Nusrat Jahan",
    profession: "Teacher",
    location: "Uttara, Dhaka",
    avatar: "/testimonials/user5.jpg",
    rating: 5,
    highlight: "Trustworthy",
  },
  {
    id: 6,
    quote:
      "ফিল্টারিং অপশনগুলো খুবই ডিটেইলড, যা আমার পছন্দমত বাসা খুঁজে পেতে সাহায্য করেছে।",
    englishQuote:
      "The filtering options are incredibly detailed. Found exactly what I was looking for within my budget.",
    name: "Rafiq Islam",
    profession: "Business Owner",
    location: "Mirpur, Dhaka",
    avatar: "/testimonials/user6.jpg",
    rating: 5,
    highlight: "Smart Filters",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover why people across Bangladesh choose Basa Finder for their
            housing needs
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <CardContent className="p-6">
                {/* Quote */}
                <div className="mb-6">
                  <MessageCircle className="w-10 h-10 text-blue-500 mb-4 opacity-80" />
                  <p className="text-gray-600 mb-3 font-medium leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <p className="text-gray-500 text-sm italic">
                    {testimonial.englishQuote}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  {/* User Info */}
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 border-2 border-white ring-2 ring-blue-100">
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback>
                        <User className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.profession} • {testimonial.location}
                      </p>
                    </div>
                  </div>

                  {/* Rating and Tag */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < testimonial.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/10">
                      {testimonial.highlight}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Ready to Find Your Perfect Home?
          </h3>
          <Link href="/listings">
            <Button className="px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Browsing Properties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
