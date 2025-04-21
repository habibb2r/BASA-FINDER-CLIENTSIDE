import ManageCategories from "@/components/modules/shop/category";
import { getAllCategories } from "@/services/Category";

const ProductCategoryPage = async () => {
  const { data } = await getAllCategories();

  console.log("Fetched categories:", data); // Debugging

  if (!data || !Array.isArray(data)) {
    return <p className="text-red-500">Failed to load categories.</p>;
  }

  return (
    <div>
      <ManageCategories categories={data} />
    </div>
  );
};


export default ProductCategoryPage;
