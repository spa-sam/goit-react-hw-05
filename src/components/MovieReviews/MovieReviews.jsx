import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/tmdb-api";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getMovieReviews = async () => {
      const movieReviews = await fetchMovieReviews(movieId);
      setReviews(movieReviews);
    };

    getMovieReviews();
  }, [movieId]);

  return (
    <div className={styles.reviewsContainer}>
      <h3 className={styles.reviewsTitle}>Reviews</h3>
      {reviews.length > 0 ? (
        <ul className={styles.reviewList}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.reviewItem}>
              <h4 className={styles.reviewAuthor}>Author: {review.author}</h4>
              <p className={styles.reviewContent}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noReviews}>
          We don't have any reviews for this movie.
        </p>
      )}
    </div>
  );
};

export default MovieReviews;
