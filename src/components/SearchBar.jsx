import React from "react";
import { Search, X } from "lucide-react"; // Import Search & X icons from Lucide

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative w-full max-w-md">
      {/* Search Icon (Left) */}
      <Search className="absolute left-3 top-3 text-gray-400" size={20} />

      {/* Input Field */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by title..."
        className="w-full pl-10 pr-10 py-2 bg-gray-800 text-gray-200 border border-gray-600 rounded-lg shadow-md focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-500 transition"
      />

      {/* Clear (X) Icon (Right) */}
      {searchQuery && (
        <button 
          onClick={() => setSearchQuery("")} 
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200 transition"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
