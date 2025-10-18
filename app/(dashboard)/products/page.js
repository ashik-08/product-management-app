"use client";

import { ProductBoard } from "@/components/products";
import { ProductProvider } from "@/context/ProductContext";

export default function Products() {
  return (
    <ProductProvider>
      <div className="min-h-screen bg-antiFlashWhite">
        <ProductBoard />
      </div>
    </ProductProvider>
  );
}
