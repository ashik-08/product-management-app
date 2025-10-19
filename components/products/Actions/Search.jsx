import { useEffect, useState } from "react";
import SearchIcon from "../../SVG/SearchIcon";

const Search = ({ searchTerm, onSearchChange }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearchTerm, onSearchChange]);

  const handleSearch = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  return (
    <div className="relative px-3.5 py-2 text-gray-400 group hover:ring-1 hover:ring-gray-300 focus-within:!ring-2 ring-inset focus-within:!ring-hookers-green rounded-md">
      <SearchIcon />
      <input
        className="pl-5 appearance-none bg-transparent text-base text-gray-700 placeholder:text-gray-400 focus:outline-none placeholder:text-sm sm:text-sm sm:leading-6"
        placeholder="Find anything..."
        type="text"
        value={localSearchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
