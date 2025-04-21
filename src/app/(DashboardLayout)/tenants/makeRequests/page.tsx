import RentalListingsPage from "@/app/(MainLayout)/listings/page";
import React from "react";

const makeRequestsPage = () => {
  return (
    <div>
      <div>
        <h1 className="text-center font-semibold md:text-xl">
          How to make rental requests
        </h1>
        <p className="text-center font-semibold ">
          At first search your desired rental listing . Go to the Details page .
          Click the Request Rental button . Give the information in the modal
          form .Then Submit Request .
        </p>
      </div>
      <RentalListingsPage />
    </div>
  );
};

export default makeRequestsPage;
