import { useState } from "react";
import type { Movie } from "../types";
import { searchMovies } from "../api/movie";

const MovieSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch {
      setError("에러가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4">
      {/* 검색창 */}
      <div className="flex gap-2 mb-6">
        <input
          className="border border-gray-300 rounded-lg flex-1 px-4 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="영화 제목을 검색하세요 (예: spider man)"
        />
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition"
          onClick={handleSearch}
        >
          검색
        </button>
      </div>

      {/* 상태 메시지 */}
      {loading && (
        <p className="text-center text-gray-400 text-sm py-8">로딩 중...</p>
      )}
      {error && (
        <p className="text-center text-red-500 text-sm bg-red-50 py-3 rounded-lg">
          {error}
        </p>
      )}
      {!loading && !error && movies.length === 0 && (
        <p className="text-center text-gray-300 text-sm py-8">
          영화를 검색해보세요
        </p>
      )}

      {/* 영화 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200"
          >
            {movie.poster_path ? (
              <img
                className="w-full aspect-[2/3] object-cover"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="w-full aspect-[2/3] bg-gray-100 flex items-center justify-center text-gray-300 text-sm">
                이미지 없음
              </div>
            )}

            <div className="p-3 space-y-1">
              <h3 className="font-bold text-gray-800 text-sm leading-snug line-clamp-2">
                {movie.title}
              </h3>
              <p className="text-gray-400 text-xs">{movie.release_date}</p>
              <p className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded">
                ⭐ {movie.vote_average.toFixed(1)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
