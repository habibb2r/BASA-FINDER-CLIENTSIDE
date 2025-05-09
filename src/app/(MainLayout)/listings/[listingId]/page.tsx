import ListingDetails from "@/components/modules/listings/listingDetails";
import NMContainer from "@/components/ui/core/NMContainer";
import { getSingleListing } from "@/services/Listings";

const ListingDetailsPage = async ({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) => {
  const { listingId } = await params;
  const { data: listing } = await getSingleListing(listingId);

  return (
    <NMContainer>
      <ListingDetails listing={listing} />
    </NMContainer>
  );
};

export default ListingDetailsPage;
