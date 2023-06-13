"use client";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ChatModal } from "./Components/ChatModal";

export function ChatButton() {
  const [chatModal, setChatModal] = useState<boolean>(false);
  const handleChat = () => {
    setChatModal(!chatModal);
  };
  console.log(chatModal);
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <button
        id="chat_button"
        className="chat_button"
        data-aos="fade-left"
        data-aos-anchor-placement="top"
        type="button"
        onClick={handleChat}
      >
        Chat
      </button>
      {chatModal && <ChatModal isOpen={setChatModal} />}
    </>
  );
}
