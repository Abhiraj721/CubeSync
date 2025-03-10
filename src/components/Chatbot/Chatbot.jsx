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

const Chatbot = ({sessions}) => {
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
      console.log(response);
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
        { role: "system", content: "I'm a Student using Cubixi for learning speedcubing only answer question related to speedcubing and if suer ask for his insights or feedback of his solve on cubesync analyze this data which is"+JSON.stringify(sessions)+"and give hum insights all in deailed" },
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
            
                return <div >
                    <p className='senderType'>{message.sender}</p>
                    <Message  key={i} model={message} />
                    </div>
              })}
            </MessageList>
            <MessageInput style={{backgroundColor:"#13131f"}} placeholder="Send a Message" onSend={handleSendRequest} />        
          </ChatContainer>
        </MainContainer>
        </div>
      </div>
    </div>
  )
}

export default Chatbot;
