"use client";

import UserProvider from "@/context/UserContext";
import { RentalRequestProvider } from "@/context/RentalRequestContext";
import StoreProvider from "./StoreProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <RentalRequestProvider> 
        <StoreProvider>{children}</StoreProvider>
      </RentalRequestProvider>
    </UserProvider>
  );
};

export default Providers;
