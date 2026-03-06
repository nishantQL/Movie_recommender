"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function MovieCard({ movie }) {

  const router = useRouter();

  const openMovie = () => {

    const encoded = encodeURIComponent(movie.title);

    router.push(`/movie/${encoded}`);

  };

  return (

    <div
      onClick={openMovie}
      className="cursor-pointer hover:scale-105 transition"
    >

      <Image
        src={movie.poster}
        alt={movie.title}
        className="rounded-xl"
        width={300}
        height={450}
      />

      <h3 className="text-white text-center mt-2">
        {movie.title}
      </h3>

    </div>

  );
}