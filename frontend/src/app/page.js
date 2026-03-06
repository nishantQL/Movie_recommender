"use client";

import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import Hero from "./components/Hero";
import { fetchMovie, getPoster } from "@/utils/tmdb";

export default function Home() {

  const [movie, setMovie] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [trending, setTrending] = useState([]);
  const [searched, setSearched] = useState(false);

  const search = async () => {

    if (!movie) return;

    const res = await fetch(
      `https://movie-recommender-1-qo0e.onrender.com/recommend/${movie}`
    );

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    const movies = await Promise.all(
      data.recommendations.map(async (name) => {

        const m = await fetchMovie(name);

        return {
          title: m.title,
          poster: getPoster(m.poster_path),
        };

      })
    );

    setRecommendations(movies);
    setSearched(true);

  };

  useEffect(() => {

    const loadTrending = async () => {

      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
      );

      const data = await res.json();

      const movies = data.results.slice(0, 10).map((m) => ({
        title: m.title,
        poster: getPoster(m.poster_path),
      }));

      setTrending(movies);

    };

    loadTrending();

  }, []);

  return (

    <div className="min-h-screen bg-black">

      {/* Netflix Style Hero */}
      <Hero />

      {/* Floating Search Bar */}
      <div className="flex justify-center -mt-16 relative z-10">
        <SearchBar
          movie={movie}
          setMovie={setMovie}
          search={search}
        />
      </div>

      {/* Trending Section */}

      {!searched && (

        <>
          <h2 className="text-white text-2xl mt-16 ml-6">
               Trending Movies
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 p-6">

            {trending.map((m, i) => (
              <MovieCard key={i} movie={m} />
            ))}

          </div>
        </>

      )}

      {/* Recommended Movies */}

      {searched && (

        <>
          <h2 className="text-white text-2xl mt-20 ml-10">
            Recommended Movies
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 p-10">

            {recommendations.map((m, i) => (
              <MovieCard key={i} movie={m} />
            ))}

          </div>
        </>

      )}

    </div>

  );
}