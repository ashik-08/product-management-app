"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useSearchProductsQuery,
} from "../lib/api/apiSlice";

const ProductContext = createContext();

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page when search changes
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Calculate offset for pagination
  const offset = (currentPage - 1) * itemsPerPage;

  // Determine which query to use based on search term
  const shouldSearch = debouncedSearchTerm.trim().length > 0;

  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
    refetch: refetchProducts,
  } = useGetProductsQuery(
    {
      offset,
      limit: itemsPerPage,
      categoryId: selectedCategoryId,
    },
    { skip: shouldSearch }
  );

  const {
    data: searchResults,
    error: searchError,
    isLoading: searchLoading,
    refetch: refetchSearch,
  } = useSearchProductsQuery(debouncedSearchTerm, {
    skip: !shouldSearch,
  });

  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery();

  // Process categories to get both names and IDs for the filter
  const categories = useMemo(() => {
    if (!categoriesData) return [];
    return categoriesData.map((cat) => ({
      id: cat.id,
      name: cat.name
    }));
  }, [categoriesData]);

  // Get the category ID from name for API calls
  const getCategoryId = (categoryName) => {
    if (!categoriesData || !categoryName) return null;
    const category = categoriesData.find((cat) => cat.name === categoryName);
    return category?.id || null;
  };

  // Get the selected category ID for API calls
  const selectedCategoryId = useMemo(() => {
    return getCategoryId(selectedCategory);
  }, [selectedCategory, categoriesData]);

  // Determine which data to use
  const currentProducts = shouldSearch ? searchResults : productsData;
  const currentError = shouldSearch ? searchError : productsError;
  const currentLoading = shouldSearch ? searchLoading : productsLoading;

  // Filter search results by category if both search and category are active
  const filteredProducts = useMemo(() => {
    if (!currentProducts) return [];

    if (shouldSearch && selectedCategory) {
      return currentProducts.filter(
        (product) => product.category?.name === selectedCategory
      );
    }

    return currentProducts;
  }, [currentProducts, shouldSearch, selectedCategory]);

  // Transform products to match the original component's expected format
  const products = useMemo(() => {
    return (
      filteredProducts?.map((product) => ({
        id: product.id,
        title: product.name,
        image: product.images?.[0] || "/placeholder-image.jpg",
        category: product.category?.name || "Uncategorized",
        price: product.price,
        description: product.description,
        slug: product.slug,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      })) || []
    );
  }, [filteredProducts]);

  // Handler functions
  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const changeCategory = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }
    setCurrentPage(1);
    setShowFilterModal(false);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Context value
  const contextValue = {
    // Products data
    products,
    loading: currentLoading,
    error: currentError || categoriesError,

    // Search
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    isSearching: searchLoading,

    // Categories and filtering
    categories,
    selectedCategory,
    changeCategory,
    showFilterModal,
    toggleFilterModal,

    // Pagination
    currentPage,
    itemsPerPage,
    handlePageChange,

    // Utility functions
    clearFilters,
    refetch: shouldSearch ? refetchSearch : refetchProducts,

    // Additional data for pagination
    totalItems: shouldSearch ? filteredProducts.length : 1000, // Estimate for server-side pagination
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
