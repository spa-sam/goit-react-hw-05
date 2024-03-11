import { useState, useEffect, useRef } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  NavLink,
  Outlet,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/tmdb-api";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const backLinkRef = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    const getMovieDetails = async () => {
      const movieDetails = await fetchMovieDetails(movieId);
      setMovie(movieDetails);
    };

    getMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(backLinkRef.current);
  };

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.backButton}>
        ⇽ Go Back
      </button>

      <div>
        {movie && (
          <>
            <div className={styles.movieInfo}>
              <div className={styles.posterWrapper}>
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className={styles.poster}
                  />
                ) : (
                  <div className={styles.noPosterPlaceholder}>No poster</div>
                )}
              </div>
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
              <div className={styles.buttonContainer}>
                <NavLink
                  to="cast"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.button} ${styles.activeButton}`
                      : styles.button
                  }
                >
                  Cast
                </NavLink>
                <NavLink
                  to="reviews"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.button} ${styles.activeButton}`
                      : styles.button
                  }
                >
                  Reviews
                </NavLink>
              </div>

              <Outlet />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
