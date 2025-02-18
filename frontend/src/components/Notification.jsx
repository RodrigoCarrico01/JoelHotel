import { useState, useEffect } from "react";

function Notification({ message, type, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!visible || !message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        backgroundColor: type === "error" ? "red" : "green",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        zIndex: 1000,
      }}
    >
      {message}
      <button onClick={onClose} style={{ marginLeft: "10px", color: "white", background: "none", border: "none", cursor: "pointer" }}>
        ✖
      </button>
    </div>
  );
}

export default Notification;
