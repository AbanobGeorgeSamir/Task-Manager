import { useEffect } from "react";

export default function Toast({ message, tone, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${tone}`}>
      {message}
    </div>
  );
}