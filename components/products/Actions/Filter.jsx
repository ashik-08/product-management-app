import { useState } from "react";
import ArrowIcon from "../../SVG/ArrowIcon";

const Filter = ({ categories, selectedCategoryId, onCategoryChange }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const handleCategoryChange = (categoryId) => {
    onCategoryChange(categoryId);
    setShowFilterModal(false);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/70 px-3 py-2 text-sm text-gray-400 hover:text-gray-500 focus:text-gray-700 transition-all"
        onClick={toggleFilterModal}
      >
        Filter
        <ArrowIcon />
      </button>

      {/* <!-- Filter options --> */}
      {showFilterModal && (
        <div className="absolute z-10 mt-2 left-1 w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-200 ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <label className="inline-flex w-full cursor-pointer hover:bg-gray-50 items-center px-4 py-2 text-sm text-gray-700">
              <input
                type="radio"
                name="category"
                className="form-radio h-4 w-4 text-teal-600"
                onChange={() => handleCategoryChange("")}
                checked={selectedCategoryId === ""}
              />
              <span className="ml-2">All Categories</span>
            </label>
            {categories?.map((category) => (
              <label
                key={category.id}
                className="inline-flex w-full cursor-pointer hover:bg-gray-50 items-center px-4 py-2 text-sm text-gray-700"
              >
                <input
                  type="radio"
                  name="category"
                  className="form-radio h-4 w-4 text-teal-600"
                  onChange={() => handleCategoryChange(category.id)}
                  checked={selectedCategoryId === category.id}
                />
                <span className="ml-2">{category.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
