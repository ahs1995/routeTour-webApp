import { useEffect, useState } from "react";

function useResize() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 576);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function toggleNav() {
    setShowNav((prevValue) => !prevValue);
  }

  return { isMobile, showNav, toggleNav };
}

export { useResize };
