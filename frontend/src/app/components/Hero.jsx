"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getPoster } from "@/utils/tmdb";

export default function Hero() {

  const [movie, setMovie] = useState(null);

  useEffect(() => {

    const loadHeroMovie = async () => {

      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
      );

      const data = await res.json();

      // pick first trending movie
      setMovie(data.results[0]);

    };

    loadHeroMovie();

  }, []);

  if (!movie) return null;

  return (

    <div className="relative h-[80vh] w-full">

      {/* Background Image */}

      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        fill
        className="absolute w-full h-full object-cover"
      />

      {/* Dark Gradient */}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Content */}

      <div className="absolute bottom-20 left-10 max-w-xl text-white">

        <h1 className="text-5xl font-bold">
          {movie.title}
        </h1>

        <p className="mt-4 text-gray-300 line-clamp-3">
          {movie.overview}
        </p>

      </div>

    </div>

  );
}