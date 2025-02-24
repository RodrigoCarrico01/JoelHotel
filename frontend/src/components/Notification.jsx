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
    <div className={`fixed top-5 right-5 px-4 py-2 rounded-md shadow-md text-white 
      ${type === "error" ? "bg-red-500" : "bg-green-500"} animate-fade-in`}>
      {message}
      <button 
        onClick={onClose} 
        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
      >
        ✖
      </button>
    </div>
  );
}

export default Notification;
