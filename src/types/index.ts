export * from "./user";
export * from "./meta";
export * from "./listings";
export * from "./rentalRequest";

export interface ICategory {
  _id: string;
  name: string;
  icon: string;
  description?: string;
}
