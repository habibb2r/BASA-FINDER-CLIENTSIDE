"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { TRentalListing } from "@/types";

interface RentalRequestContextType {
  listing: TRentalListing | null;
  setListing: (listing: TRentalListing | null) => void;
}

const RentalRequestContext = createContext<RentalRequestContextType | undefined>(undefined);

export const RentalRequestProvider = ({ children }: { children: ReactNode }) => {
  const [listing, setListing] = useState<TRentalListing | null>(null);

  return (
    <RentalRequestContext.Provider value={{ listing, setListing }}>
      {children}
    </RentalRequestContext.Provider>
  );
};

export const useRentalRequest = () => {
  const context = useContext(RentalRequestContext);
  if (!context) {
    throw new Error("useRentalRequest must be used within RentalRequestProvider");
  }
  return context;
};
