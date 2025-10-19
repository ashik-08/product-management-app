import {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useSearchProductsQuery,
} from "@/lib/api/apiSlice";
import { useMemo, useState } from "react";
import Filter from "../Actions/Filter";
import Search from "../Actions/Search";
import EmptyState from "../States/EmptyState";
import ErrorState from "../States/ErrorState";
import NoResults from "../States/NoResults";
import ProductCard from "./ProductCard";

const ProductBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calculate offset for pagination
  const offset = (currentPage - 1) * itemsPerPage;

  // Determine whether to search or fetch regular products
  const shouldSearch = searchTerm.trim().length > 0;

  // API Queries
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
    isError,
  } = useGetProductsQuery(
    {
      offset,
      limit: itemsPerPage,
      categoryId: selectedCategoryId || undefined,
    },
    { skip: shouldSearch }
  );

  const {
    data: searchResults,
    error: searchError,
    isLoading: searchLoading,
  } = useSearchProductsQuery(searchTerm, {
    skip: !shouldSearch,
  });

  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery();

  // Transform data to match the expected format
  const products = useMemo(() => {
    const currentProducts = shouldSearch ? searchResults : productsData;

    if (!currentProducts) return [];

    // Filter search results by category if both search and category are active
    let filteredProducts = currentProducts;
    if (shouldSearch && selectedCategoryId) {
      filteredProducts = currentProducts.filter(
        (product) => product.category?.id === selectedCategoryId
      );
    }

    return filteredProducts.map((product) => ({
      id: product.id,
      title: product.name,
      image: product.images?.[0] || "/placeholder-image.jpg",
      category: product.category?.name || "Uncategorized",
      price: product.price,
      description: product.description,
      slug: product.slug,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));
  }, [searchResults, productsData, shouldSearch, selectedCategoryId]);

  // Loading and error states
  const loading = shouldSearch ? searchLoading : productsLoading;
  const error = shouldSearch ? searchError : productsError;

  const renderProduct = () => {
    if (loading) {
      return (
        <>
          <EmptyState />
          <EmptyState />
          <EmptyState />
          <EmptyState />
        </>
      );
    }

    if (error) {
      return <ErrorState>{error.data.message}</ErrorState>;
    }

    if (!loading && products?.length === 0 && searchTerm) {
      return <NoResults searchTerm={searchTerm} />;
    }

    return products?.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  return (
    <div className="pt-16">
      <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-center">
          Product Catalog
        </h1>
        <p className="mt-4 text-xl text-gray-500 text-center">
          Discover and manage your product inventory with ease.
        </p>
      </div>
      <div className="mt-10">
        <div className="flex justify-between relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          {/* Filter--> */}
          <div className="w-full">
            <Filter
              categories={categoriesData || []}
              selectedCategoryId={selectedCategoryId}
              onCategoryChange={setSelectedCategoryId}
            />
          </div>
          {/* <!-- Search --> */}
          <div className="flex gap-2 items-center">
            <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>
        </div>
      </div>
      <div>
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {renderProduct()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBoard;
