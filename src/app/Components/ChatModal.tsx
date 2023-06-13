"use client";
import { useEffect, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import "../Styles/chat_modal.scss";
interface Props {
  isOpen: (value: boolean) => void;
}
export const ChatModal = ({ isOpen }: Props) => {
  const handleChatModalClose = () => {
    isOpen(false);
  };
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="chat_modal" data-aos="fade-up-left">
      <div className="chat_modal_content">
        <div className="chat_modal_header">
          <h2>Chat</h2>
          <button onClick={handleChatModalClose}>X</button>
        </div>
        <div className="chat_modal_body">
          <p>Chat with us!</p>
        </div>
        <div className="chat_modal_footer">
          <form>
            <input type="text" placeholder="Type your message here..." />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};
