import ListingBanner from "@/components/modules/listings/banner";

import ListingDetails from "@/components/modules/listings/listingDetails";
import NMContainer from "@/components/ui/core/NMContainer";

import { getSingleListing } from "@/services/Listings";

const ListingDetailsPage = async ({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) => {
  const { listingId } = await params;

  // const { data: product } = await getSingleProduct(productId);
  const { data: listing } = await getSingleListing(listingId);

  return (
    <NMContainer>
      <ListingBanner
        // title="Listing Details"
        // path="Home - Listings - Listing Details"
        title=""
        path=""
      />
      {/* <ProductDetails product={product} /> */}
      <ListingDetails listing={listing} />
    </NMContainer>
  );
};

export default ListingDetailsPage;
