import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { request } from "../../utils/request";
import Input from "../Input";
import SendButton from "../SendButton";
import Layout from "../Layout";

import "./Messages.scss";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const fetchMessages = async () => {
    const messages = await request.messages();
    setMessages(messages);
  };

  const handleSendMessage = async () => {
    if (text.trim()) {
      const messages = await request.sendMessage(text, "mx20=-234xmx237");
      setMessages(messages);
      setText("");
    }
  };

  const handleRefreshMessage = () => {
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      <Layout>
        <div className="message-container">
          <div className="message-messages">
            <div>
              <span>Сообщения:</span>
              {messages.map((item, index) => {
                return (
                  <div key={index} className="message-item">
                    <span>{item.message}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="message-controls">
            <div className="message-send">
              <Input
                setState={setText}
                state={text}
                name="message"
                isInteractsWithTheField
              />
              <SendButton text="Отправить" onClick={handleSendMessage} />
            </div>
            <SendButton text="Обновить" onClick={handleRefreshMessage} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Messages;
