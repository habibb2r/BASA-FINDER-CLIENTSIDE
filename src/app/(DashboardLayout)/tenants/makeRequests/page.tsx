"use client";

import RentalListingsPage from "@/app/(MainLayout)/listings/page";
import { Card } from "@/components/ui/card";
import { Search, FileSearch, SendHorizonal, CheckCircle2 } from "lucide-react";

const makeRequestsPage = () => {
  const steps = [
    {
      icon: Search,
      title: "Search Listings",
      description:
        "Use filters to find your desired rental property based on location, price, and bedrooms.",
    },
    {
      icon: FileSearch,
      title: "View Details",
      description:
        "Click on a listing to view detailed information about the property.",
    },
    {
      icon: SendHorizonal,
      title: "Make Request",
      description:
        "Click the 'Request Rental' button on the property details page.",
    },
    {
      icon: CheckCircle2,
      title: "Submit Form",
      description:
        "Fill in the required information in the modal form and submit your request.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Instructions Section */}
      <Card className="p-6 bg-gradient-to-b from-white to-blue-50/50">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
          How to Make a Rental Request
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-full h-[2px] bg-blue-200">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              )}

              {/* Step Content */}
              <div className="relative flex flex-col items-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {<step.icon size={24} />}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Listings Section */}
      <Card className="p-6 bg-white">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Available Rental Properties
        </h2>
        <RentalListingsPage />
      </Card>
    </div>
  );
};

export default makeRequestsPage;
