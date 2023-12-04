import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";
import { useResize } from "../hooks/useResize";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";

function Sidebar({ onRedirectMap }) {
  const { isMobile } = useResize();
  const [mapLat, mapLng] = useUrlPosition();

  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      {isMobile && !mapLng && !mapLng && (
        <Button type="primary-gtm" onClick={onRedirectMap}>
          Go to map
        </Button>
      )}
      <footer className={styles.copyright}>
        <p> &copy; Copyright {new Date().getFullYear()} by routeTour inc.</p>
      </footer>
    </div>
  );
}

export default Sidebar;
