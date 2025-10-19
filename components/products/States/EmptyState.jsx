const EmptyState = () => {
  return (
    <div className="relative flex flex-col h-full transform transition-transform duration-300 hover:scale-105 rounded-lg animate-pulse">
      {/* Image skeleton */}
      <div className="w-full border border-hookers-green/40 h-80 rounded-lg"></div>
      <div className="mt-4 px-3 pb-4 flex-grow flex flex-col">
        {/* Title skeleton */}
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        {/* Category skeleton */}
        <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
        {/* Price skeleton */}
        <div className="h-4 bg-gray-300 rounded w-1/4 mt-2"></div>
      </div>
      {/* View Details Button skeleton */}
      <div className="mx-3 mb-3">
        <div className="h-10 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default EmptyState;
