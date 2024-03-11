import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

const MovieList = ({ movies, showImages = true }) => {
  const location = useLocation();

  return (
    <ul className={styles.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.movieItem}>
          <Link
            to={`/movies/${movie.id}`}
            className={styles.movieLink}
            state={{ from: location }}
          >
            <div className={styles.movieCard}>
              {showImages && (
                <div className={styles.posterWrapper}>
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      className={styles.moviePoster}
                    />
                  ) : (
                    <div className={styles.noPosterPlaceholder}>No poster</div>
                  )}
                </div>
              )}
              <div className={styles.movieInfo}>
                <h3 className={styles.movieTitle}>{movie.title}</h3>
                <p className={styles.movieYear}>
                  {movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : ""}
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
