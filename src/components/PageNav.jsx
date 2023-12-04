import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import styles from "./PageNav.module.css";
import { useResize } from "../hooks/useResize";

export default function PageNav() {
  const { isMobile, showNav, toggleNav } = useResize();

  return (
    <nav className={styles.nav}>
      {isMobile ? (
        <>
          <Logo />
          {showNav && (
            <div className={styles.mobileNav}>
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/pricing">Pricing</NavLink>
                </li>
                <li>
                  <NavLink to="/Product">Product</NavLink>
                </li>
                <li>
                  <NavLink to="/login" className={styles.ctaLink}>
                    login
                  </NavLink>
                </li>
              </ul>
              <span>
                <CancelIcon
                  onClick={toggleNav}
                  className={styles.closeIcon}
                  sx={{ fontSize: 25 }}
                />
              </span>
            </div>
          )}
          {!showNav && (
            <MenuIcon
              className={styles.menuHamburger}
              onClick={toggleNav}
              sx={{ fontSize: 30 }}
            />
          )}
        </>
      ) : (
        <>
          <Logo />
          <ul className={styles.desktopNav}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/pricing">Pricing</NavLink>
            </li>
            <li>
              <NavLink to="/Product">Product</NavLink>
            </li>
            <li>
              <NavLink to="/login" className={styles.ctaLink}>
                login
              </NavLink>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
}
