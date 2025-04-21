"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { createListing } from "@/services/Listings";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const CreateRentalListing = () => {
  const { user } = useUser();
  const router = useRouter();

  // Redirect if user is not a landlord
  useEffect(() => {
    if (user?.role !== "landlord") {
      toast.error("Access Denied! Only landlords can add listings.");
      router.push("/");
    }
  }, [user, router]);

  // Form state with proper types
  const [listingData, setListingData] = useState({
    location: "",
    description: "",
    rentAmount: "",
    bedrooms: "",
  });

  // Amenities state as an array
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Available amenities options
  const amenitiesOptions = [
    { id: "wifi", label: "WiFi" },
    { id: "parking", label: "Parking" },
    { id: "gym", label: "Gym" },
    { id: "pool", label: "Swimming Pool" },
    { id: "furnished", label: "Furnished" },
    { id: "ac", label: "Air Conditioning" },
    { id: "balcony", label: "Balcony" },
    { id: "security", label: "24/7 Security" },
    { id: "lift", label: "Lift" },
  ];

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setListingData({ ...listingData, [name]: value });

    // Clear error for this field when it's being edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setListingData({ ...listingData, [name]: value });

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle amenity toggle
  const handleAmenityToggle = (amenityId: string) => {
    setSelectedAmenities((prev) => {
      if (prev.includes(amenityId)) {
        return prev.filter((id) => id !== amenityId);
      } else {
        return [...prev, amenityId];
      }
    });
  };

  // Handle image upload to Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);

    setIsUploading(true);
    const toastId = toast.loading("Uploading images...");

    try {
      const uploadedUrls: string[] = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "cfzfnkte");
        formData.append("cloud_name", "dairs3nkn");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dairs3nkn/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) throw new Error("Upload failed");

        const result = await res.json();
        uploadedUrls.push(result.url);
      }

      setImageUrls((prev) => [...prev, ...uploadedUrls]);

      // Clear image error if it exists
      if (errors.images) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.images;
          return newErrors;
        });
      }

      toast.success("Images uploaded successfully!");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Image upload failed!");
    } finally {
      toast.dismiss(toastId);
      setIsUploading(false);
    }
  };

  // Remove image
  const handleRemoveImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
    toast.success("Image removed");

    // Set error if no images remain
    if (imageUrls.length <= 1) {
      setErrors((prev) => ({
        ...prev,
        images: "At least one image is required",
      }));
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!listingData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!listingData.rentAmount || Number(listingData.rentAmount) <= 0) {
      newErrors.rentAmount = "Valid rent amount is required";
    }

    if (!listingData.bedrooms) {
      newErrors.bedrooms = "Number of bedrooms is required";
    }

    if (imageUrls.length === 0) {
      newErrors.images = "At least one image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setLoading(true);

    try {
      // Map selectedAmenities IDs to their labels for better readability
      const amenitiesLabels = selectedAmenities.map(
        (id) => amenitiesOptions.find((option) => option.id === id)?.label || id
      );

      // Create the submission data object
      const submissionData = {
        location: listingData.location,
        description: listingData.description,
        rentAmount: Number(listingData.rentAmount),
        bedrooms: Number(listingData.bedrooms),
        images: imageUrls,
        amenities: amenitiesLabels,
      };

      // Log the data being sent (for debugging)
      console.log("Sending data:", submissionData);

      // Send to the API
      const res = await createListing(submissionData);
      console.log("Response:", res);

      if (res.success) {
        toast.success("Listing created successfully!");
        // router.push("/landlords/properties");
        router.push("/listings");
      } else {
        toast.error(res.message || "Failed to create listing.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md my-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Create/Post a New Listing
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Location <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="location"
            value={listingData.location}
            onChange={handleChange}
            className={`mt-2 ${errors.location ? "border-red-500" : ""}`}
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">{errors.location}</p>
          )}
        </div>

        {/* Rent Amount & Bedrooms */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Rent Amount <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              name="rentAmount"
              value={listingData.rentAmount}
              onChange={handleChange}
              className={`mt-2 ${errors.rentAmount ? "border-red-500" : ""}`}
              min="1"
            />
            {errors.rentAmount && (
              <p className="text-red-500 text-xs mt-1">{errors.rentAmount}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Bedrooms <span className="text-red-500">*</span>
            </label>
            <Select
              onValueChange={(value) => handleSelectChange("bedrooms", value)}
              defaultValue={listingData.bedrooms}
            >
              <SelectTrigger
                className={`mt-2 ${errors.bedrooms ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder="Select bedrooms" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="0">Studio</SelectItem> */}
                <SelectItem value="1">1 Bedroom</SelectItem>
                <SelectItem value="2">2 Bedrooms</SelectItem>
                <SelectItem value="3">3 Bedrooms</SelectItem>
                <SelectItem value="4">4 Bedrooms</SelectItem>
                <SelectItem value="5">5+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>
            {errors.bedrooms && (
              <p className="text-red-500 text-xs mt-1">{errors.bedrooms}</p>
            )}
          </div>
        </div>

        {/* Amenities Checkboxes */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Amenities
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {amenitiesOptions.map((amenity) => (
              <div key={amenity.id} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity.id}
                  checked={selectedAmenities.includes(amenity.id)}
                  onCheckedChange={() => handleAmenityToggle(amenity.id)}
                />
                <Label htmlFor={amenity.id} className="text-sm">
                  {amenity.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            name="description"
            value={listingData.description}
            onChange={handleChange}
            className="mt-2"
            rows={4}
            placeholder="Describe your property"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className={errors.images ? "border-red-500" : ""}
              disabled={isUploading}
            />
            {isUploading && (
              <div className="flex items-center mt-2 text-blue-500">
                <Loader2 className="animate-spin mr-2" size={16} />
                <span className="text-sm">Uploading images...</span>
              </div>
            )}
            {errors.images && (
              <p className="text-red-500 text-xs mt-1">{errors.images}</p>
            )}
          </div>
        </div>

        {/* Image Previews */}
        {imageUrls.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            {imageUrls.map((url, idx) => (
              <div key={idx} className="relative group">
                <div className="relative w-full h-24">
                  <Image
                    src={url}
                    alt={`Preview ${idx}`}
                    fill
                    className="object-cover rounded-lg shadow-md"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <XCircle size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={loading || isUploading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin mr-2" size={16} />
              Creating...
            </span>
          ) : (
            "Create Listing"
          )}
        </Button>
      </form>
    </div>
  );
};

export default CreateRentalListing;
