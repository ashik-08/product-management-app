const NoResults = ({ searchTerm }) => {
  return (
    <div className="col-span-full text-center py-10">
      <p className="text-xl text-gray-500">
        {searchTerm
          ? `No products found matching "${searchTerm}"`
          : "No products found with the current filters"}
      </p>
      <p className="mt-2 text-gray-400">
        Try adjusting your search or filter to find what you&apos;re looking
        for.
      </p>
    </div>
  );
};

export default NoResults;
