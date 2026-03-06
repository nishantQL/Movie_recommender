"use client";

import Image from "next/image";

export default function MovieModal({ movie, close }) {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center">

      <div className="bg-gray-900 p-6 rounded-xl max-w-lg text-white">

        <button
          onClick={close}
          className="float-right text-red-400"
        >
          Close
        </button>

        <Image
          src={movie.poster}
          alt={`${movie.title} poster`}
          className="rounded-lg mb-4"
          width={300}
          height={450}
        />

        <h2 className="text-2xl font-bold">{movie.title}</h2>

        <p className="mt-2">
          Release Year: {movie.release_date?.split("-")[0]}
        </p>

        <p className="mt-3 text-gray-300">
          {movie.overview}
        </p>

      </div>
    </div>
  );
}