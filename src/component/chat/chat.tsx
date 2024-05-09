// Chat.tsx
import React from 'react';
import './chat.css'; // Create a corresponding CSS file for styling

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface Props {
  messages: Message[];
}

const Chat: React.ForwardRefRenderFunction<HTMLDivElement, Props> = ({ messages }, ref) => {
  
  // Sample user and bot messages
  // const messages: Message[] = [
  //   { text: "Hello, how can I help you?", sender: "bot" },
  //   { text: "Hi there! I'm looking for some information.", sender: "user" },
  //   { text: "Sure, what information do you need?", sender: "bot" },
  //   { text: "Hi there! I'm looking for some information.", sender: "user" },
  //   { text: "Sure, what information do you need?", sender: "bot" },
  //   { text: "Hi there! I'm looking for some information.", sender: "user" },
  //   { text: "Sure, what information do you need?", sender: "bot" },

  // ];

  return (
    <div ref={ref} className="chatBox">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`chatMessage ${message.sender === 'user' ? 'userMessage' : 'botMessage'}`}
        >
          {message.text}
          
        </div>
      ))}
    </div>
  );
}

export default React.forwardRef(Chat);
