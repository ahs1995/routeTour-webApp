import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import styles from "./AppLayout.module.css";
import { useResize } from "../hooks/useResize";
import useUrlPosition from "../hooks/useUrlPosition";
import { useState } from "react";

function AppLayout() {
  const { isMobile } = useResize();
  const [mapLat, mapLng] = useUrlPosition();
  const [btnClicked, setBtnClicked] = useState(false);
  const [redirectMap, setRedirectMap] = useState(false);

  function handleBtnClick() {
    setBtnClicked(true);
    setRedirectMap(false);
  }

  function handleRedirectMap() {
    setRedirectMap(true);
    setBtnClicked(false);
  }

  function handleRedirectFalse(value) {
    setRedirectMap(value);
  }

  return (
    <div className={styles.app}>
      {!isMobile ? (
        <>
          <Sidebar />
          <Map />
          <User btnClicked={btnClicked} />
        </>
      ) : (
        <>
          {!btnClicked && !redirectMap && !mapLat && !mapLng && (
            <Map
              onBtnClick={handleBtnClick}
              onRedirectFalse={handleRedirectFalse}
            />
          )}
          {btnClicked ? (
            <Sidebar onRedirectMap={handleRedirectMap} />
          ) : redirectMap ? (
            <Map
              onBtnClick={handleBtnClick}
              onRedirectFalse={handleRedirectFalse}
            />
          ) : (
            mapLat && mapLng && <Sidebar onRedirectMap={handleRedirectMap} />
          )}

          <User btnClicked={btnClicked} />
        </>
      )}
    </div>
  );
}

export default AppLayout;
