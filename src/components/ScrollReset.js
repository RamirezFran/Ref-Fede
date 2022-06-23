import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollReset(props) {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>
};