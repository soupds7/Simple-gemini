import React, { useState } from 'react';
import axios from 'axios';

const GEMINI_API_URL = process.env.REACT_APP_GEMINI_API_URL;

const Chat = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newMessage = { text: input, sender: 'user' };
        setMessages([...messages, newMessage]);
        setInput('');

        try {
            const response = await axios.post(GEMINI_API_URL, {
                contents: [
                    {
                        parts: [
                            { text: input }
                        ]
                    }
                ]
            });

            const aiText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
            const botMessage = { text: aiText, sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error communicating with the API:', error);
            const botMessage = { text: "Error: " + error.message, sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;