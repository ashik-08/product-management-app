const EmptyState = () => {
  return (
    <div className="relative flex flex-col h-full transform transition-transform duration-300 hover:scale-105 rounded-lg animate-pulse">
      {/* Image skeleton */}
      <div className="w-full border h-80 rounded-lg"></div>
      <div className="mt-4 px-3 pb-4 flex-grow flex flex-col">
        {/* Title skeleton */}
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        {/* Category skeleton */}
        <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
        {/* Rating skeleton */}
        <div className="mt-2 flex items-center">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className="h-4 w-4 bg-gray-300 rounded-full mr-1"
              ></div>
            ))}
          </div>
          <div className="ml-2 h-3 bg-gray-300 rounded w-16"></div>
        </div>
        {/* Price skeleton */}
        <div className="h-4 bg-gray-300 rounded w-1/4 mt-2"></div>
      </div>
      {/* Add To Cart Button skeleton */}
      <div className="mx-3 mb-3">
        <div className="h-10 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default EmptyState;
