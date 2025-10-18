import { useContext } from "react";
import ProductContext from "../../../context/ProductContext";
import Filter from "../Actions/Filter";
import Search from "../Actions/Search";
import EmptyState from "../States/EmptyState";
import ErrorState from "../States/ErrorState";
import NoResults from "../States/NoResults";
import ProductCard from "./ProductCard";

const ProductBoard = () => {
  const { products, loading, error, debouncedSearchTerm, isSearching } =
    useContext(ProductContext);

  const renderProduct = () => {
    if (loading || isSearching) {
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
      return <ErrorState>{error.message}</ErrorState>;
    }

    if (
      !loading &&
      !isSearching &&
      products?.length === 0 &&
      debouncedSearchTerm
    ) {
      return <NoResults searchTerm={debouncedSearchTerm} />;
    }

    return products?.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  return (
    <div className="pt-16 sm:pt-24 lg:pt-40">
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
            <Filter />
          </div>
          {/* <!-- Search --> */}
          <div className="flex gap-2 items-center">
            <Search />
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
