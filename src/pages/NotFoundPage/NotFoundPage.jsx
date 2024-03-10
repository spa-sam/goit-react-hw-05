import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.text}>
        The page you are looking for does not exist.
      </p>
      <Link to="/" className={styles.link}>
        Go back to the homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
