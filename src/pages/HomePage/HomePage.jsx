import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchPopularMovies } from "../../services/tmdb-api";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getPopularMovies = async () => {
      const popularMovies = await fetchPopularMovies();
      setMovies(popularMovies);
    };

    getPopularMovies();
  }, []);

  return (
    <div>
      <h1>Popular Movies</h1>
      <MovieList movies={movies} showImages={false} />
    </div>
  );
};

export default HomePage;
