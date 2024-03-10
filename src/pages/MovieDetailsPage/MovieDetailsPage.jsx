import { useState, useEffect } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/tmdb-api";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getMovieDetails = async () => {
      const movieDetails = await fetchMovieDetails(movieId);
      setMovie(movieDetails);
    };

    getMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(location?.state?.from || "/");
  };

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.backButton}>
        Go Back
      </button>

      <div>
        {movie && (
          <>
            <div className={styles.movieInfo}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className={styles.poster}
              />
              <div className={styles.info}>
                <h1 className={styles.title}>
                  {movie.title} ({new Date(movie.release_date).getFullYear()})
                </h1>
                <p className={styles.score}>
                  User Score: {movie.vote_average.toFixed(1)}
                </p>
                <h2 className={styles.overviewTitle}>Overview</h2>
                <p className={styles.overview}>{movie.overview}</p>
                <h3 className={styles.genresTitle}>Genres</h3>
                <ul className={styles.genres}>
                  {movie.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.additionalInfo}>
              <h2>Additional Information</h2>
              <ul>
                <li>
                  <Link to="cast" state={{ from: location.state?.from }}>
                    Cast
                  </Link>
                </li>
                <li>
                  <Link to="reviews" state={{ from: location.state?.from }}>
                    Reviews
                  </Link>
                </li>
              </ul>

              <Routes>
                <Route path="cast" element={<MovieCast />} />
                <Route path="reviews" element={<MovieReviews />} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
