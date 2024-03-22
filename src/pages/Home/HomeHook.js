import React, { useState, useEffect } from 'react';
const TypingText = ({ text, speed }) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let currentIdx = 0;
    const timerId = setInterval(() => {
      setDisplayText((prevText) => {
        if (currentIdx === text.length) {
          clearInterval(timerId);
          return prevText;
        }
        currentIdx++;
        return text.slice(0, currentIdx);
      });
    }, speed);
    return () => clearInterval(timerId);
  }, [text, speed]);
  return <div>{displayText}</div>;
}
export default TypingText;