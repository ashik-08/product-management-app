import {
  useCreateProductMutation,
  useGetCategoriesQuery,
} from "@/lib/api/apiSlice";
import { useState } from "react";

const CreateProductForm = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    images: [""],
    categoryId: "",
  });

  const [createProduct, { isLoading, error }] = useCreateProductMutation();
  const { data: categories = [] } = useGetCategoriesQuery();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const removeImageField = (index) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        images: newImages,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Filter out empty image URLs
      const validImages = formData.images.filter((img) => img.trim() !== "");

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        images: validImages,
        categoryId: formData.categoryId,
      };

      await createProduct(productData).unwrap();

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        images: [""],
        categoryId: "",
      });

      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Failed to create product:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 px-4 sm:px-0">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-richBlack">
              Add New Product
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-rich-black mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hookers-green focus:border-transparent"
                placeholder="Enter product name"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-rich-black mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hookers-green focus:border-transparent"
                placeholder="Enter product description"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-rich-black mb-2">
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hookers-green focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-rich-black mb-2">
                Category *
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hookers-green focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-rich-black mb-2">
                Product Images
              </label>
              {formData.images.map((image, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hookers-green focus:border-transparent"
                    placeholder="Enter image URL"
                  />
                  {formData.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="px-3 py-2 bg-chestnut text-white rounded-md hover:bg-chestnut/90"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="text-hookers-green hover:text-hookers-green/80 text-sm"
              >
                + Add another image
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-chestnut text-sm">
                {error.data?.message ||
                  "Failed to create product. Please try again."}
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-hookers-green text-white rounded-md hover:bg-hookers-green/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductForm;
