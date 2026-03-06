"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { getPoster } from "@/utils/tmdb";

export default function MoviePage({ params }) {

  const { title } = use(params);   // unwrap params
  const decodedTitle = decodeURIComponent(title);

  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState([]);

  useEffect(() => {

    const fetchMovieDetails = async () => {

      const apiKey = process.env.NEXT_PUBLIC_TMDB_KEY;

      // Search movie
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${decodedTitle}`
      );

      const data = await res.json();
      const movieData = data.results[0];

      setMovie(movieData);

      // Fetch credits
      const creditRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movieData.id}/credits?api_key=${apiKey}`
      );

      const creditData = await creditRes.json();

      const directorData = creditData.crew.find(
        (c) => c.job === "Director"
      );

      setDirector(directorData?.name || "Unknown");

      setCast(creditData.cast.slice(0, 5));

    };

    fetchMovieDetails();

  }, [decodedTitle]);

  if (!movie) {
    return (
      <div className="text-white p-10">
        Loading movie details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <div className="grid md:grid-cols-2 gap-10">

        <Image
          src={getPoster(movie.poster_path)}
          alt={movie.title}
          className="rounded-xl"
          width={300}
          height={450}
        />

        <div>

          <h1 className="text-4xl font-bold">
            {movie.title}
          </h1>

          <p className="mt-3 text-gray-400">
            Release Date: {movie.release_date}
          </p>

          <p className="mt-3 text-gray-400">
            Director: {director}
          </p>

          <h3 className="mt-6 text-xl font-semibold">
            Overview
          </h3>

          <p className="mt-2 text-gray-300">
            {movie.overview}
          </p>

          <h3 className="mt-6 text-xl font-semibold">
            Cast
          </h3>

          <div className="flex gap-4 mt-3 flex-wrap">

            {cast.map((c) => (
              <div key={c.id} className="text-center">

                {c.profile_path && (
                  <Image
                    src={`https://image.tmdb.org/t/p/w185${c.profile_path}`}
                    alt={c.name}
                    className="w-24 rounded-lg"
                    width={185}
                    height={278}
                  />
                )}

                <p className="text-sm mt-1">{c.name}</p>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}