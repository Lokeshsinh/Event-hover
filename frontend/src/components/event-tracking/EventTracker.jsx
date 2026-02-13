import { useEffect } from 'react';

export function EventTracker({ onEventCapture }) {
  useEffect(() => {
    // Track mouse movements
    const handleMouseMove = (e) => {
      onEventCapture('mousemove', {
        x: e.clientX,
        y: e.clientY,
        target: e.target?.tagName || 'unknown'
      });
    };

    // Track clicks
    const handleClick = (e) => {
      onEventCapture('click', {
        x: e.clientX,
        y: e.clientY,
        button: e.button,
        target: e.target?.tagName || 'unknown'
      });
    };

    // Track scrolling
    const handleScroll = () => {
      onEventCapture('scroll', {
        scrollY: window.scrollY,
        scrollX: window.scrollX,
        documentHeight: document.documentElement.scrollHeight,
        windowHeight: window.innerHeight
      });
    };

    // Track key presses
    const handleKeyPress = (e) => {
      onEventCapture('keypress', {
        key: e.key,
        code: e.code,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey
      });
    };

    // Attach event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [onEventCapture]);

  // Component renders nothing visible
  return null;
}
