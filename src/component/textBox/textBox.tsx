// TextBox.tsx
import React, { useState } from 'react';
import './textBox.css';
import * as ABB from '@abb/abb-common-ux-react'
import sendIcon from '../../assets/send.png'

interface Props {
  onMessageSubmit: (message: string) => void;
}

const TextBox: React.FC<Props> = ({onMessageSubmit}) => {

  const [isTextPresent, setIsTextPresent] = useState("");
  const [isMicActive, setIsMicActive] = useState(false);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsTextPresent(event.target.value);

    // Scroll to the bottom of the textarea
    event.target.scrollTop = event.target.scrollHeight;
  };

  const handleMicClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsMicActive(!isMicActive);
  };

  const handleSubmit = () => {
    if (isTextPresent.trim() !== "") { 
      // Check if the message is not empty
      onMessageSubmit(isTextPresent); 
      // Call the parent component's function
      setIsTextPresent(""); // Clear the input field
    }
  };

  const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if Enter key is pressed
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent default behavior of Enter key (new line)
      handleSubmit(); // Submit the message
    }
  };

  return (
    <div>
      <div className="textBox">
        <textarea 
          placeholder="Message ABBoT..." 
          value={isTextPresent}
          onChange={handleTextChange}
          onKeyDown={handleEnterKeyPress} // Call handleEnterKeyPress on key down event
        /> 

        <button className="iconButton" onClick={handleMicClick}>
          <ABB.Icon 
            className={`micIcon ${isMicActive ? "active" : ""}`}
            name={`abb/microphone${isMicActive ? "" : "-off"}`} 
            sizeClass="medium"
          /> 
        </button>

        <button className="iconButton" onClick={handleSubmit}>
          <img 
            className={`sendIcon ${isTextPresent ? "active" : ""}`} 
            src={sendIcon} 
            alt="Send" 
          />
        </button>
      </div>
      
      <div className="textBoxBorder" />

    </div>
  );
}

export default TextBox;
