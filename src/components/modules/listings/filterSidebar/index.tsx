"use client";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getAllCategories } from "@/services/Category";
import { getAllBrands } from "@/services/Brand";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterSidebar() {
  const [price, setPrice] = useState([0]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [{ data: categoriesData }, { data: brandsData }] = await Promise.all([
          getAllCategories(),
          getAllBrands(),
        ]);
        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (error: any) {
        console.error(error);
        toast.error("Failed to fetch filters");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(query, value.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <aside className="p-6 bg-white rounded-2xl shadow-md space-y-8 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
        {searchParams.toString().length > 0 && (
          <Button
            onClick={() => router.push(`${pathname}`, { scroll: false })}
            size="sm"
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Price Filter */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Price</h3>
        <div className="text-sm flex justify-between text-gray-600 mb-2">
          <span>$0</span>
          <span>$500000</span>
        </div>
        <Slider
          max={500000}
          step={1}
          onValueChange={(value) => {
            setPrice(value);
            handleSearchQuery("price", value[0]);
          }}
        />
        <p className="text-sm text-gray-500 mt-1">Selected: ${price[0]}</p>
      </section>

      {/* Categories */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Product Category</h3>
        {!isLoading && (
          <RadioGroup className="space-y-3">
            {categories.map((category: { _id: string; name: string }) => (
              <div key={category._id} className="flex items-center gap-2">
                <RadioGroupItem
                  id={category._id}
                  value={category._id}
                  onClick={() => handleSearchQuery("category", category._id)}
                />
                <Label htmlFor={category._id} className="text-gray-600">
                  {category.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </section>

      {/* Brands */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Brands</h3>
        {!isLoading && (
          <RadioGroup className="space-y-3">
            {brands.map((brand: { _id: string; name: string }) => (
              <div key={brand._id} className="flex items-center gap-2">
                <RadioGroupItem
                  id={brand._id}
                  value={brand._id}
                  onClick={() => handleSearchQuery("brand", brand._id)}
                />
                <Label htmlFor={brand._id} className="text-gray-600">
                  {brand.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </section>

      {/* Rating */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Rating</h3>
        <RadioGroup className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <RadioGroupItem
                id={`rating-${rating}`}
                value={`${rating}`}
                onClick={() => handleSearchQuery("rating", rating)}
              />
              <Label htmlFor={`rating-${rating}`} className="flex gap-1 items-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < rating ? "#fbbf24" : "lightgray"}
                    stroke={i < rating ? "#fbbf24" : "lightgray"}
                  />
                ))}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </section>
    </aside>
  );
}
