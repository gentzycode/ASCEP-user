import { ReactNode, useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
interface SmoothScrollPProps {
  children: ReactNode;
}

const ScrollToTop: React.FC<SmoothScrollPProps> = ({ children }) => {
  const location = useLocation();
  const navType = useNavigationType();
  useEffect(() => {
    if (navType !== "POP") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location]);
  return <>{children}</>;
};

export default ScrollToTop;
