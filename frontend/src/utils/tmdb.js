const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY;

export const fetchMovie = async (name) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${name}`
  );
  const data = await res.json();
  return data.results[0];
};

export const getPoster = (path) => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};