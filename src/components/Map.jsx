import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import Button from "./Button";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesProvider";
import { useGeolocation } from "../hooks/useGeoLocation";
import useUrlPosition from "../hooks/useUrlPosition";
import { useResize } from "../hooks/useResize";

function Map({ onBtnClick, onRedirectFalse }) {
  const [mapPosition, setMapPosition] = useState([40, 30]);
  const [mapLat, mapLng] = useUrlPosition();

  const { isMobile } = useResize();

  const {
    isLoading: isLoadingMap,
    position: positionLocation,
    getPosition,
  } = useGeolocation();

  const { cities } = useCities();

  useEffect(() => {
    if (!isMobile) return;

    onRedirectFalse(false);
  }, [onRedirectFalse]);

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (positionLocation)
        setMapPosition([positionLocation.lat, positionLocation.lng]);
    },
    [positionLocation]
  );

  const flagemojiToPNG = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  };

  return (
    <div className={styles.mapContainer}>
      {(!mapLat || !mapLng) && !positionLocation && (
        <Button type="position" onClick={getPosition}>
          {isLoadingMap ? "Loading" : "your position"}
        </Button>
      )}
      {(!mapLat || !mapLng) && isMobile && (
        <Button onClick={onBtnClick} type="cityNavigate">
          City list
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{flagemojiToPNG(city.emoji)}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangePosition position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangePosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`Form?lat=${e.latlng.lat}&&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
