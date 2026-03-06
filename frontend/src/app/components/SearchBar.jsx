"use client";

export default function SearchBar({ movie, setMovie, search }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center mt-10 gap-4 px-4">
      
      <input
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
        placeholder="Search a movie..."
        className="w-full sm:w-100 px-4 py-3 rounded-lg bg-gray-800 text-white outline-none"
      />

      <button
        onClick={search}
        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white flex items-center justify-center gap-2"
      >
        🔍 Recommend
      </button>

    </div>
  );
}