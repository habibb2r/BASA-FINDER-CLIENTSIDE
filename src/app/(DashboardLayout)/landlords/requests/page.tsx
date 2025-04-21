import LandlordTenantRequests from "@/app/(MainLayout)/landlord/requests/page";
import React from "react";

const requestsPage = () => {
  return (
    <div className="text-xl text-center font-semibold">
      <h1>Rental Requests</h1>
      <LandlordTenantRequests />
    </div>
  );
};

export default requestsPage;
