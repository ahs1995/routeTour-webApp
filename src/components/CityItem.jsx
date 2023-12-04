import { useCities } from "../contexts/CitiesProvider";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useResize } from "../hooks/useResize";

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();

  const { isMobile } = useResize();

  const formatDate = (date) => {
    const options = isMobile
      ? { day: "numeric", month: "numeric", year: "numeric" }
      : { day: "numeric", month: "long", year: "numeric", weekday: "long" };

    return new Intl.DateTimeFormat("en", options).format(new Date(date));
  };

  const flagemojiToPNG = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  };

  const { cityName, emoji, date, id, position } = city;

  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>
          {emoji ? flagemojiToPNG(emoji) : ""}
        </span>
        <h4 className={styles.name}>{cityName}</h4>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
