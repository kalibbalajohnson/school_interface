import { useEffect, useState } from "react";
import "../../toast.css";

function Toast({ message, color }) {
  const [isVisible, setIsVisible] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    setIsVisible(true);
    setOpacity(1);
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setOpacity(0);
    }, 30000); // 30 seconds in milliseconds
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div
          className={`toast ${isVisible ? "show" : ""}`}
          style={{ backgroundColor: color, opacity: opacity }}
        >
          {message && <p>{message}</p>}
        </div>
      )}
    </>
  );
}

export default Toast;
