import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Try smooth scroll first, fallback to instant scroll for older browsers
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    } catch {
      // Fallback for older browsers that don't support smooth scrolling
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
