const ProductCard = ({ product }) => {
  const { id, image, title, category, price } = product;

  const handleViewDetails = () => {
    // TODO: Implement view details functionality
    console.log("View details for product:", id);
  };

  return (
    <div className="relative flex flex-col h-full transform transition-transform duration-300 hover:scale-105 rounded-lg">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none lg:h-80">
        <img
          src={image}
          alt={id}
          className="h-full w-full object-contain lg:h-full lg:w-full p-4 border rounded-lg"
        />
      </div>
      <div className="mt-4 px-3 pb-4 flex-grow flex flex-col">
        <div className="flex-grow">
          <h3 className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 capitalize">{category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900 mt-2">${price}</p>
      </div>
      {/* View Button */}
      <div className="mx-3 mb-3">
        <button
          onClick={handleViewDetails}
          className="w-full group cursor-pointer rounded-md text-[0.8125rem] font-medium leading-5 text-slate-700 ring-1 ring-slate-700/10 hover:bg-slate-900 hover:text-white transition-all duration-300 items-center text-center"
        >
          <div className="flex px-3 py-2 justify-center items-center">
            View Details
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
