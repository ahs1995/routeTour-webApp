import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <div className={styles.logoContainer}>
        <img
          src="/routeTourLogoWhiteFancy2.png"
          alt="routTour logo"
          className={styles.logo}
        />
      </div>
    </Link>
  );
}

export default Logo;
