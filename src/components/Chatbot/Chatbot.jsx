import { useState, useEffect }  from 'react';
import './Chatbot.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';

const API_KEY ="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"

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello! I'm the Cubixi, your personal assistant for all things speedcubing. Ask me anything related to speedcubing and I'll do my best to assist you.",
      sentTime: "just now",
      sender: "Cubixi",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendRequest = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "You",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);

    try {
      const response = await processMessageToCubixi([...messages, newMessage]);
      const content = response.choices[0]?.message?.content;
      if (content) {
        const CubixiResponse = {
          message: content,
          sender: "Cubixi",
        };
        setMessages((prevMessages) => [...prevMessages, CubixiResponse]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  async function processMessageToCubixi(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "Cubixi" ? "assistant" : "user";
      return { role, content: messageObject.message };
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        { role: "system", content: "I'm a Student using Cubixi for learning speedcubing only answer question related to speedcubing" },
        ...apiMessages,
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    return response.json();
  }

  return (
    <div className="col col-lg-10 col-md-11 col-12">
        <div className='assistantPanel'>
            <h1>Cubixi</h1>
            <h5>AI SpeedCubing Assistant</h5>
        </div>
        <div className='chatbot'>
      <div className='chatbotContainer' >
        <MainContainer >
          <ChatContainer>       
            <MessageList 
            className='boardContainer'
              scrollBehavior="smooth" 
              style={{backgroundColor:"#13131f",fontFamily:"arial"}}
              typingIndicator={isTyping ? <TypingIndicator content="Cubixi is typing" /> : null}
            >
              {messages.map((message, i) => {
            
                return <div>
                    <p className='senderType'>{message.sender}</p>
                    <Message   key={i} model={message} />
                    </div>
              })}
            </MessageList>
            <MessageInput style={{backgroundColor:"#000b1c"}} placeholder="Send a Message" onSend={handleSendRequest} />        
          </ChatContainer>
        </MainContainer>
        </div>
      </div>
    </div>
  )
}

export default Chatbot;