'use client';

import { useState, useEffect, useRef } from 'react';

export default function PaypalButton() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const cofeeLink = "https://buymeacoffee.com/denverdelamasa";

  const resetTimer = () => {
    setIsVisible(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  useEffect(() => {
    const events = ['mousemove', 'click', 'scroll', 'keydown', 'touchstart'];
    
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-6 right-6 z-101 transition-all duration-500 ease-in-out ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      {/* Tooltip */}
      <div 
        className={`absolute bottom-full right-0 mb-3 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="backdrop-blur-xl p-2 rounded-lg shadow-lg w-32 text-xs text-white border-1 border-accent">
          Like my page? Consider buying me a coffee! ☕
          <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-white/20"></div>
        </div>
      </div>

      {/* Button */}
      <a 
        href={cofeeLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          glass-button btn shadow-lg transition-all duration-300 transform 
          flex items-center text-white hover:text-white
          hover:scale-105 ${isHovered ? 'shadow-xl scale-105' : 'scale-100'}
        `}
        aria-label="Buy me a coffee"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <i className="bi bi-cup-hot text-lg"></i>
      </a>
    </div>
  );
}