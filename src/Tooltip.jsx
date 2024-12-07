import React, { useState } from "react";
import questionIcon from "./img/Question Mark.png";

export const Tooltip = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="question-icons-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}

      style={{ display: 'inline-block', position: 'relative' }}
    >
      <img src={questionIcon} alt="Question Icon" style={{ width: '24px', height: '24px' }} />
      {isVisible && <div className="tooltip">{text}</div>}
    </div>
  );
};