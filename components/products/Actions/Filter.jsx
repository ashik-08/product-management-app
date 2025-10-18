import { useContext } from "react";
import ProductContext from "../../../context/ProductContext";
import ArrowIcon from "../../SVG/ArrowIcon";

const Filter = () => {
  const {
    showFilterModal,
    toggleFilterModal,
    error,
    categories,
    selectedCategory,
    changeCategory,
  } = useContext(ProductContext);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-400 hover:text-gray-500 focus:text-gray-700 transition-all"
        onClick={toggleFilterModal}
      >
        Filter
        <ArrowIcon />
      </button>

      {/* <!-- Filter options --> */}
      {showFilterModal && (
        <div className="absolute z-10 mt-2 left-3 w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {error ? (
              <span className="block px-4 py-2 text-sm text-red-500">
                Unable to fetch categories. Please try again later.
              </span>
            ) : (
              <>
                <label className="inline-flex w-full cursor-pointer hover:bg-gray-50 items-center px-4 py-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="category"
                    className="form-radio h-4 w-4 text-teal-600"
                    onChange={() => changeCategory("")}
                    checked={selectedCategory === ""}
                  />
                  <span className="ml-2">All Categories</span>
                </label>
                {categories &&
                  categories?.map((category) => (
                    <label
                      key={category.id}
                      className="inline-flex w-full cursor-pointer hover:bg-gray-50 items-center px-4 py-2 text-sm text-gray-700"
                    >
                      <input
                        type="radio"
                        name="category"
                        className="form-radio h-4 w-4 text-teal-600"
                        onChange={() => changeCategory(category.name)}
                        checked={selectedCategory === category.name}
                      />
                      <span className="ml-2">{category.name}</span>
                    </label>
                  ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
