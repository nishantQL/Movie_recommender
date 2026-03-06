"use client";

import { FaSearch } from "react-icons/fa";

export default function SearchBar({ movie, setMovie, search }) {

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="flex justify-center items-center gap-3 backdrop-blur-md bg-black/40 px-6 py-4 rounded-xl shadow-lg">

      <input
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search a movie..."
        className="w-80 md:w-96 px-4 py-3 rounded-lg bg-gray-900 text-white outline-none border border-gray-700 focus:border-red-500"
      />

      <button
        onClick={search}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg text-white transition"
      >
        <FaSearch />
        Recommend
      </button>

    </div>
  );
}