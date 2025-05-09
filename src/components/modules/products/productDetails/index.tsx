"use client";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";

interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  offerPrice?: number;
  imageUrls: string[];
  stock: number;
  averageRating: number;
  brand?: {
    name: string;
  };
  category?: {
    name: string;
  };
}

const ProductDetails = ({ product }: { product: IProduct }) => {
  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={product.imageUrls[0] || "/placeholder.jpg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.imageUrls.slice(1, 4).map((image, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={image}
                    alt={`${product.name} - ${idx + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
              <p className="mt-4 text-gray-600">{product.description}</p>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 rounded-full">
                <Star className="w-4 h-4" fill="orange" stroke="orange" />
                <span>{product.averageRating} Rating</span>
              </div>
              <div className="px-3 py-1 bg-blue-50 rounded-full">
                Stock: {product.stock}
              </div>
            </div>

            <div className="border-t border-b border-gray-100 py-4">
              {product.brand && (
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span className="font-medium">Brand:</span>
                  <span>{product.brand.name}</span>
                </div>
              )}
              {product.category && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">Category:</span>
                  <span>{product.category.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.offerPrice || product.price}
                </span>
                {product.offerPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.price}
                  </span>
                )}
              </div>

              <div className="flex gap-4">
                <Button className="flex-1 h-12">Buy Now</Button>
                <Button variant="outline" className="flex-1 h-12">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
