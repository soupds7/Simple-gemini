import React, { useState } from 'react';
import Chat from './components/Chat';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className="App">
      <h1>AI Chat Application</h1>
      <Chat messages={messages} addMessage={addMessage} />
    </div>
  );
}

export default App;