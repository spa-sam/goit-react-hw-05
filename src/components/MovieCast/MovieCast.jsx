import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/tmdb-api";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getMovieCast = async () => {
      const movieCast = await fetchMovieCast(movieId);
      setCast(movieCast);
    };

    getMovieCast();
  }, [movieId]);

  return (
    <div className={styles.castContainer}>
      <h3 className={styles.castTitle}>Cast</h3>
      <ul className={styles.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={styles.castItem}>
            <div className={styles.profileImageWrapper}>
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className={styles.profileImage}
                />
              ) : (
                <div className={styles.noPhotoPlaceholder}>No photo</div>
              )}
            </div>
            <div className={styles.actorInfo}>
              <p className={styles.actorName}>{actor.name}</p>
              <p className={styles.character}>Character: {actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
