
"use client";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function MobileBottom() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 1500); // Wait for 1.5 seconds
    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, []);

  return (
    <div
      style={{
        backgroundColor: "black",
        transition: "transform 3s ease-in-out",
        transform: isVisible ? "translateY(0)" : "translateY(100%)",
      }}
      onClick={() => window.location.replace("/")}
      className="w-full h-12 flex items-center px-4 fixed bottom-0"
    >
      <FaArrowLeft color="white" size={24} className="cursor-pointer" />
    </div>
  );
}

