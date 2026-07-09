import type { Movie } from "../types";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&language=ko-KR`,
  );
  if (!res.ok) throw new Error("영화 검색에 실패했습니다.");
  const data = await res.json();
  return data.results;
};
