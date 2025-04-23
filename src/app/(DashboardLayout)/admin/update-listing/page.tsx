"use client";

import { useEffect, useState } from "react";
import { getAllListings } from "@/services/Listings";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Edit, Loader2 } from "lucide-react";
import { TRentalListing } from "@/types";

const DeleteListings = () => {
  const router = useRouter();
  type ListingWithId = TRentalListing & { _id: string };
  const [listings, setListings] = useState<ListingWithId[]>([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [deleting, setDeleting] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedListingId, setSelectedListingId] = useState<string | null>(
    null
  );

  // Use useEffect to fetch data on the client side
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data } = await getAllListings();
        setListings(data || []);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings([]);
      }
      setLoading(false);
    }
    fetchData();
  }, []);
  console.log(listings);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Update/Edit Listings
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 flex items-center justify-center">
          <Loader2 className="animate-spin mr-2" />
          Loading listings...
        </p>
      ) : listings.length === 0 ? (
        <p className="text-center text-gray-500">No listings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Property</TableCell>
                <TableCell>Rent Amount</TableCell>
                <TableCell>Bedrooms</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((listing) => (
                <TableRow key={listing._id}>
                  <TableCell>{listing.location}</TableCell>
                  <TableCell>৳ {listing.rentAmount.toLocaleString()}</TableCell>
                  <TableCell>{listing.bedrooms}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(
                            `/admin/update-listing/edit/${listing._id}`
                          )
                        }
                      >
                        <Edit size={16} className="mr-1" />
                        Edit
                      </Button>
                      {/* <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => confirmDelete(listing._id)}
                      >
                        <Trash2 size={16} className="mr-1" />
                        Delete
                      </Button> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* ✅ Custom Modal for Delete Confirmation */}
      {/* <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <div className="p-6 text-center mx-auto">
          <XCircle className="text-red-500 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-semibold">Confirm Deletion</h3>
          <p className="text-gray-600 mt-2">
            Are you sure you want to delete this listing? This action cannot be
            undone.
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? (
                <Loader2 className="animate-spin mr-2" size={16} />
              ) : null}
              Delete
            </Button>
          </div>
        </div>
      </Modal> */}
    </div>
  );
};

export default DeleteListings;
