"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getSingleListing, updateListing } from "@/services/Listings";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, XCircle, UploadCloud } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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

const EditListing = () => {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  const [listingData, setListingData] = useState({
    location: "",
    description: "",
    rentAmount: "",
    bedrooms: "",
    amenities: "",
  });

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch listing details when component mounts
  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      const response = await getSingleListing(id as string);

      if (response.success) {
        setListingData({
          location: response.data.location,
          description: response.data.description,
          rentAmount: response.data.rentAmount.toString(),
          bedrooms: response.data.bedrooms.toString(),
          amenities: response.data.amenities.join(", "),
        });

        setImageUrls(response.data.images || []);
      } else {
        toast.error(response.message || "Failed to load listing details.");
      }

      setLoading(false);
    };

    fetchListing();
  }, [id]);

  // Handle Input Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setListingData({ ...listingData, [name]: value });

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
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

    if (!listingData.bedrooms || Number(listingData.bedrooms) < 0) {
      newErrors.bedrooms = "Valid number of bedrooms is required";
    }

    // Optional: Add validation for amenities if needed
    if (listingData.amenities.trim() === "") {
      newErrors.amenities = "Select at least one amenity";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Image Upload (Cloudinary)
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

  // Remove an image
  const handleRemoveImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
    toast.success("Image removed");

    if (imageUrls.length <= 1) {
      setErrors((prev) => ({
        ...prev,
        images: "At least one image is required",
      }));
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setUpdating(true);

    // Create JSON payload
    const updatedData = {
      location: listingData.location,
      description: listingData.description,
      rentAmount: Number(listingData.rentAmount),
      bedrooms: Number(listingData.bedrooms),
      images: imageUrls,
      amenities: listingData.amenities.split(",").map((a) => a.trim()),
    };

    try {
      const response = await updateListing(id as string, updatedData);
      console.log("Response:", response);

      if (response.success) {
        toast.success("Listing updated successfully!");
        // router.push("/landlords/listings/view");
      } else {
        toast.error(response.message || "Failed to update listing");
      }
    } catch (error) {
      toast.error("Something went wrong while updating.");
      console.error("Error updating listing:", error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h2 className="text-2xl font-semibold mb-6">Edit Listing</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin mr-2 h-8 w-8 text-gray-500" />
          <p className="text-gray-500">Loading listing details...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Location */}
          <div>
            <Label>Location</Label>
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

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              value={listingData.description}
              onChange={handleChange}
              className={`mt-2 ${errors.description ? "border-red-500" : ""}`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Rent Amount */}
          <div>
            <Label>Rent Amount</Label>
            <Input
              type="number"
              name="rentAmount"
              value={listingData.rentAmount}
              onChange={handleChange}
              className={`mt-2 ${errors.rentAmount ? "border-red-500" : ""}`}
            />
            {errors.rentAmount && (
              <p className="text-red-500 text-xs mt-1">{errors.rentAmount}</p>
            )}
          </div>

          {/* Bedrooms */}
          <div>
            <Label>Number of Bedrooms</Label>
            <Select
              value={listingData.bedrooms}
              onValueChange={(value) => {
                setListingData((prev) => ({ ...prev, bedrooms: value }));
                if (errors.bedrooms) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.bedrooms;
                    return newErrors;
                  });
                }
              }}
            >
              <SelectTrigger
                className={`w-full mt-2 ${
                  errors.bedrooms ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select bedrooms" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="0">Studio</SelectItem> */}
                <SelectItem value="1">1 Bedroom</SelectItem>
                <SelectItem value="2">2 Bedrooms</SelectItem>
                <SelectItem value="3">3 Bedrooms</SelectItem>
                <SelectItem value="4">4+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>
            {errors.bedrooms && (
              <p className="text-red-500 text-xs mt-1">{errors.bedrooms}</p>
            )}
          </div>

          <div>
            <Label>Amenities</Label>
            <div className="mt-2">
              <div className="flex flex-wrap gap-2">
                {amenitiesOptions.map((amenity) => {
                  // Split and trim the existing amenities, checking if the current amenity is included
                  const isSelected = listingData.amenities
                    .split(",")
                    .map((a) => a.trim())
                    .includes(amenity.id);

                  return (
                    <Button
                      key={amenity.id}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setListingData((prev) => {
                          const currentAmenities = prev.amenities
                            .split(",")
                            .map((a) => a.trim())
                            .filter(Boolean);

                          const updatedAmenities = isSelected
                            ? // If currently selected, remove the amenity
                              currentAmenities.filter((a) => a !== amenity.id)
                            : // If not selected, add the amenity
                              [...currentAmenities, amenity.id];

                          return {
                            ...prev,
                            amenities: updatedAmenities.join(", "),
                          };
                        });

                        // Clear any existing amenities error
                        if (errors.amenities) {
                          setErrors((prev) => {
                            const newErrors = { ...prev };
                            delete newErrors.amenities;
                            return newErrors;
                          });
                        }
                      }}
                    >
                      {amenity.label}
                    </Button>
                  );
                })}
              </div>
            </div>
            {errors.amenities && (
              <p className="text-red-500 text-xs mt-1">{errors.amenities}</p>
            )}
          </div>
          {/* Image Upload */}
          <div>
            <Label>Upload Images</Label>
            <div className="mt-2">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                disabled={isUploading}
                className="hidden"
                id="image-upload"
              />
              <Label
                htmlFor="image-upload"
                className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
              >
                <UploadCloud className="mr-2 h-6 w-6 text-gray-500" />
                <span className="text-gray-500">
                  {isUploading ? "Uploading..." : "Click to upload images"}
                </span>
              </Label>
            </div>
            {errors.images && (
              <p className="text-red-500 text-xs mt-1">{errors.images}</p>
            )}
          </div>

          {/* Image Preview */}
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

          <Button type="submit" disabled={updating} className="w-full mt-4">
            {updating ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              "Update Listing"
            )}
          </Button>
        </form>
      )}
    </div>
  );
};

export default EditListing;
